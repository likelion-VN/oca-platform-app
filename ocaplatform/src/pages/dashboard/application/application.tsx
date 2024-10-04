/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EnvironmentOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { message, Skeleton, Tooltip } from "antd";

import classNames from "classnames";
import _ from "lodash";
import {
  BookmarkSimple,
  Clock,
  Laptop,
  MapPin,
  UsersFour,
} from "phosphor-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDotIcon } from "../../../assets/svg";
import Badge from "../../../components/badge/badge";
import ButtonComponent from "../../../components/button/button";
import EmptyComponent from "../../../components/empty/empty";
import { ApplicationTab } from "../../../constants/selectOptions";
import { RequestHomePageBody } from "../../../interfaces/home";
import { fetchDetailJob } from "../../../services/fetchDetailJob";
import { fetchListJob } from "../../../services/fetchListJob";
import useMergeState from "../../../utils/customHook/useMergeState";
import { calculateDaysDiff, formatDate } from "../../../utils/formatter";
import "./application.s.scss";

interface IPropsApplication {
  isActive: boolean;
}

const ApplicationPage: React.FC<IPropsApplication> = ({ isActive }) => {
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);
  const topButtonRef = useRef<HTMLDivElement>(null);
  const jobDetailRef = useRef<HTMLDivElement>(null);
  const pageCurrent = useRef(1);
  const totalElements = useRef(20);
  const filter = useRef<RequestHomePageBody>({
    jobTitle: "",
    jobTypeId: 0,
    negotiable: null,
    workplaceTypeIds: [],
    cityId: 0,
    stateId: 0,
    countryId: 1,
    searchOptionId: 0,
  });

  const [state, setState] = useMergeState({
    listJob: [],
    listState: [],
    markSave: false,
    jobs: undefined,
    indexActive: 0,
    jobDetail: undefined,
    showBottomButton: false,
    hasShadowTop: false,
    hasShadowBottom: true,
    isLoadingList: false,
    isLoadingDetail: false,
    visible: false,
    selectTab: "all",
  });

  const renderStatus = (status: string) => {
    switch (status) {
      case "applied":
        return <div className="status-tag applied">Applied</div>;
      case "declined":
        return <div className="status-tag declined">Declined</div>;
      case "inProgress":
        return <div className="status-tag in-progress">In Progress</div>;
      case "accepted":
        return <div className="status-tag accepted">Accepted</div>;
      default:
        return <div className="status-tag canceled">Canceled</div>;
    }
  };

  const getListJob = async (isLoadMore: boolean = false) => {
    try {
      const page = pageCurrent.current;
      const newPage = isLoadMore ? page + 1 : page;
      if (newPage * 10 <= totalElements.current) {
        const data = await fetchListJob(0, 10 * newPage, filter.current);
        const newState = {};
        if (data && !_.isEmpty(data.content)) {
          if (isLoadMore) {
            _.assign(newState, { listJob: data.content });
          } else {
            const dataDetail = await fetchDetailJob(data.content[0].jobId);
            _.assign(newState, {
              listJob: data.content,
              jobs: data,
              jobDetail: dataDetail,
              isLoadingList: false,
              isLoadingDetail: false,
            });
            totalElements.current = data.totalElements;
          }
        } else {
          _.assign(newState, {
            listJob: [],
            jobDetail: {},
            isLoadingList: false,
            isLoadingDetail: false,
          });
        }
        pageCurrent.current = newPage;
        setState(newState);
      } else {
        message.warning("Work is over!");
      }
    } catch (error) {
      console.log("error", { error });
      setState({
        listJob: [],
        jobDetail: {},
        isLoadingList: false,
        isLoadingDetail: false,
      });
    }
  };

  const handleMarkSave = () => {
    setState({ markSave: !state.markSave });
  };

  const handleOnclick = () => {
    const { jobDetail } = state;
    navigate("/application-form", { state: { jobDetail } });
  };

  const scrollToTop = () => {
    if (jobDetailRef.current) {
      jobDetailRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleActiveCard = async (index: string, jobId: number) => {
    setState({ isLoadingDetail: true });
    scrollToTop();
    const dataDetail = await fetchDetailJob(jobId);
    setState({
      indexActive: index,
      jobDetail: dataDetail,
      isLoadingDetail: false,
    });
  };

  const handleViewCompany = () => {
    console.log("You are click View Company");
  };

  const handleSelectTab = (selectTab: string) => {
    setState({ selectTab });
  };

  useEffect(() => {
    setState({ isLoadingList: true, isLoadingDetail: true });
    getListJob();
  }, [isActive]);

  useEffect(() => {
    const handleScroll = () => {
      const element = divRef.current;
      if (element) {
        if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
          getListJob(true);
        }
        const isAtTop = element.scrollTop === 0;
        const isAtBottom =
          element.scrollHeight - element.scrollTop <= element.clientHeight;
        setState({
          hasShadowTop: !isAtTop && element.scrollTop > 0,
          hasShadowBottom:
            !isAtBottom && element.scrollHeight > element.clientHeight,
        });
      }
    };

    const element = divRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const { jobDetail } = state || {};

  return (
    <div className="application-page">
      <div className="filter-tab">
        {_.map(ApplicationTab, (tab) => (
          <div
            className={classNames(
              "tab",
              state.selectTab === tab.value && "tab-active"
            )}
            onClick={() => handleSelectTab(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="count-jobs">
        <strong>50</strong> application statuses were updated.
      </div>
      <div className="application-jobs">
        <div
          ref={divRef}
          className={classNames(
            "job-list",
            !_.isEmpty(state.listJob) && state.listJob.length > 4
              ? state.hasShadowTop && state.hasShadowBottom
                ? "shadow-top-bottom"
                : state.hasShadowTop
                ? "shadow-top"
                : "shadow-bottom"
              : ""
          )}
        >
          {state.isLoadingList ? (
            _.map(new Array(5), (_item, index) => (
              <div className="job-card" key={index}>
                <Skeleton active title={false} paragraph={{ rows: 3 }} />
              </div>
            ))
          ) : _.isEmpty(state.listJob) ? (
            <EmptyComponent className="empty-layout" />
          ) : (
            _.map(state.listJob, (job, index) => (
              <div
                className={classNames(
                  "job-card",
                  index === state.indexActive && "job-card-active"
                )}
                key={index}
                onClick={() => handleActiveCard(index, job.jobId)}
              >
                <div className="job-card-left">
                  <div className="red-dot"></div>
                </div>
                <div className="job-card-mid">
                  <div className="job-title">
                    <div className="title">
                      {job.jobTitle}
                      {job.negotiable && (
                        <span className="title-sub">(Negotiable)</span>
                      )}
                    </div>
                  </div>
                  <div className="company">
                    <img
                      src={job.companyAvatarUrl}
                      alt="notification-icon"
                      className="company-logo"
                      width={40}
                      height={40}
                    />
                    <div className="company-info">
                      <div className="company-info-name">{job.companyName}</div>
                      <div className="company-info-state">
                        {_.compact([job.cityName, job.countryName]).join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="job-status">{renderStatus("applied")}</div>
                </div>
                <div className="job-card-right">
                  <div className="update-time">
                    {calculateDaysDiff(job.postDateTime)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div ref={jobDetailRef} className="job-detail">
          {state.isLoadingDetail ? (
            <Skeleton active paragraph={{ rows: 13 }} />
          ) : _.isEmpty(jobDetail) ? (
            <EmptyComponent className="empty-layout" />
          ) : (
            <>
              <div className="job-detail-name">
                <img
                  src={jobDetail.company.companyAvatarUrl}
                  alt="notification-icon"
                  className="company-logo"
                  width={84}
                  height={84}
                />
                <div className="job-title">
                  <div className="title">
                    {jobDetail.title}
                    {jobDetail.negotiable && (
                      <>
                        <span className="title-sub">(Negotiable)</span>
                        <Tooltip
                          className="tooltip"
                          placement="bottom"
                          title="This indicates that the company is willing to negotiate and adjust the job duties, working hours, duration, and location through discussion"
                        >
                          <QuestionCircleOutlined
                            style={{ fontSize: 16, color: "#0A5CD8" }}
                          />
                        </Tooltip>
                      </>
                    )}
                  </div>
                  <div className="company-info">
                    <div className="company-info-name">
                      {jobDetail.company.name}
                    </div>
                    <div className="company-info-state">
                      <EnvironmentOutlined className="icon" />
                      {_.compact([
                        jobDetail.location.city,
                        // jobDetail.location.state,
                        jobDetail.location.country,
                      ]).join(", ")}
                    </div>
                  </div>
                </div>
              </div>
              <div ref={topButtonRef} className="job-detail-action">
                <ButtonComponent
                  className="application-btn"
                  title="View your application"
                  onClick={handleOnclick}
                />
                <ButtonComponent
                  className="save-btn"
                  icon={
                    state.markSave ? (
                      <BookmarkSimple size={24} weight="fill" color="#FF7710" />
                    ) : (
                      <BookmarkSimple size={24} />
                    )
                  }
                  onClick={handleMarkSave}
                />
              </div>
              <div className="job-detail-keys">
                {_.map(jobDetail.keywords, (keyword) => (
                  <Badge title={keyword.name} />
                ))}
              </div>
              <div className="job-detail-update">
                <div className="job-detail-title">The latest updated</div>
                <div className="job-detail-content">
                  <div className="application-status-card">
                    <div className="status-left">
                      <div className="circle">
                        <div className="inner-circle"></div>
                      </div>
                      <div className="dashed-line"></div>
                    </div>
                    <div className="status-right">
                      <div className="status-tag">
                        {renderStatus("applied")}
                      </div>
                      <h3>Submitted application</h3>
                      <p>
                        You submitted application successfully. The company is
                        starting reviewing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-detail-about">
                <div className="job-detail-title">About the job</div>
                <div className="job-detail-content">
                  {jobDetail.description}
                </div>
                <div className="job-detail-duration">
                  <div className="apply-duration">
                    <div className="apply-duration-icon">
                      <img src={CalendarDotIcon} alt="calendar-icon" />
                    </div>
                    <div className="apply-duration-detail">
                      <div className="apply-duration-detail-title">
                        Working period
                      </div>
                      <div className="apply-duration-detail-time">
                        {`${formatDate(jobDetail.workStart)} - ${formatDate(
                          jobDetail.workEnd
                        )}`}
                      </div>
                    </div>
                  </div>
                  <div className="apply-duration">
                    <div className="apply-duration-icon">
                      <Laptop size={24} />
                    </div>
                    <div className="apply-duration-detail">
                      <div className="apply-duration-detail-title">
                        Work Type
                      </div>
                      <div className="apply-duration-detail-time">
                        {jobDetail.workplaceType.name}
                      </div>
                    </div>
                  </div>
                  <div className="apply-duration">
                    <div className="apply-duration-icon">
                      <Clock size={24} />
                    </div>
                    <div className="apply-duration-detail">
                      <div className="apply-duration-detail-title">
                        Hours per week
                      </div>
                      <div className="apply-duration-detail-time">
                        {`${jobDetail.hoursPerWeek} hours`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-detail-tasks">
                <div className="job-detail-title">Tasks</div>
                <div className="job-detail-content">
                  <ul>
                    {!_.isEmpty(jobDetail.tasks) ? (
                      _.map(jobDetail.tasks, (task) => (
                        <li>{task.description}</li>
                      ))
                    ) : (
                      <li>No description</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="job-detail-qualify">
                <div className="job-detail-title">Minimum Qualifications</div>
                <div className="job-detail-content">
                  <ul>
                    {!_.isEmpty(jobDetail.qualifications) ? (
                      _.map(jobDetail.qualifications, (qualification) => (
                        <li>{qualification.description}</li>
                      ))
                    ) : (
                      <li>No description</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="job-detail-company">
                <div className="job-detail-company-intro">
                  <div className="job-detail-company-intro-left">
                    <img
                      src={jobDetail.company.companyAvatarUrl}
                      alt="notification-icon"
                      className="company-logo-intro"
                      height={64}
                      width={64}
                    />
                    <div className="company-info">
                      <div className="company-info-name">
                        {jobDetail.company.name}
                      </div>
                      <div className="company-info-detail">
                        <div className="company-info-detail-state">
                          <MapPin className="icon" size={18} />
                          <span>
                            {_.compact([
                              jobDetail.location.city,
                              // jobDetail.location.state,
                              jobDetail.location.country,
                            ]).join(", ")}
                          </span>
                        </div>
                        <div className="company-info-detail-employ">
                          <UsersFour className="icon" size={18} />
                          {jobDetail.company.companySize}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job-detail-company-intro-right">
                    <ButtonComponent
                      title="View company"
                      icon={<ExportOutlined />}
                      className="view-btn"
                      iconPosition="end"
                      type="link"
                      onClick={handleViewCompany}
                    />
                  </div>
                </div>
                <div className="job-detail-company-overview">
                  <div className="job-detail-title">Company overview</div>
                  <div className="job-detail-content">
                    {jobDetail.company.companyOverview}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
