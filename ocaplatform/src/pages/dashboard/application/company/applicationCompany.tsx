/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { ExportOutlined } from "@ant-design/icons";
import { message, Skeleton } from "antd";

import classNames from "classnames";
import _ from "lodash";
import {
  Clock,
  GraduationCap,
  Laptop,
  MapPin,
  UsersFour,
} from "phosphor-react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDotIcon } from "../../../../assets/svg";
import Badge from "../../../../components/badge/badge";
import ButtonComponent from "../../../../components/button/button";
import EmptyComponent from "../../../../components/empty/empty";
import ModalComponent from "../../../../components/modal/modal";
import { LOADING_TYPES } from "../../../../constants/loadingTypes";
import { ApplicationTab } from "../../../../constants/selectOptions";
import { fetchApplicationDetailJob } from "../../../../services/fetchDetailApplicationJob";
import { fetchListApplicationJob } from "../../../../services/fetchListApplicationJob";
import { handleCancelApplication } from "../../../../services/handleCancelApplication";
import updateGotoData from "../../../../store/actions/goto";
import loadingPage from "../../../../store/actions/loading";
import { calculateDaysDiff } from "../../../../utils";
import useActions from "../../../../utils/customHook/useActions";
import useMergeState from "../../../../utils/customHook/useMergeState";
import { formatDate } from "../../../../utils/formatter";
import { safeNavigate } from "../../../../utils/helper";
import { renderStatus } from "../../dashboard.h";
import "./applicationCompany.s.scss";

interface IPropsApplicationCompany {
  // isActive: boolean;
}

const ApplicationCompanyPage: React.FC<IPropsApplicationCompany> = () => {
  const dispatch = useDispatch();
  const applicationGotoRedux = useSelector(
    (state: any) => state.goto.application
  );
  const loadingPageAction = useActions(loadingPage);

  const divRef = useRef<HTMLDivElement>(null);
  const topButtonRef = useRef<HTMLDivElement>(null);
  const jobDetailRef = useRef<HTMLDivElement>(null);
  const pageCurrent = useRef(1);
  const totalElements = useRef(10);
  const filter = useRef<any>({
    statusId: applicationGotoRedux.statusId,
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
    selectTab: applicationGotoRedux.statusId,
    isOpenCancelModal: false,
  });

  const getListApplicationJob = async (isLoadMore: boolean = false) => {
    try {
      const page = pageCurrent.current;
      const newPage = isLoadMore ? page + 1 : page;
      if (newPage * 10 <= totalElements.current) {
        const data = await fetchListApplicationJob(
          0,
          10 * newPage,
          filter.current
        );
        const newState = {};
        const updateApplicationGoto = { ...filter.current };
        if (data && !_.isEmpty(data.content)) {
          if (isLoadMore) {
            _.assign(newState, { listJob: data.content });
            _.assign(updateApplicationGoto, { listJob: data.content });
          } else {
            const dataDetail = await fetchApplicationDetailJob(
              data.content[0].applicationId
            );
            _.assign(newState, {
              listJob: data.content,
              jobDetail: dataDetail,
              isLoadingList: false,
              isLoadingDetail: false,
              indexActive: 0,
            });
            _.assign(updateApplicationGoto, {
              listJob: data.content,
              jobDetail: dataDetail,
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
          _.assign(updateApplicationGoto, {
            listJob: [],
            jobDetail: {},
          });
          totalElements.current = 0;
        }
        dispatch(updateGotoData("application", updateApplicationGoto));
        pageCurrent.current = newPage;
        setState(newState);
      } else {
        message.warning("Work is over!");
      }
    } catch (error) {
      setState({
        jobCount: 0,
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
    safeNavigate("/application-form-revise", {
      state: { jobDetailReview: jobDetail },
    });
  };

  const scrollToTop = () => {
    if (jobDetailRef.current) {
      jobDetailRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleActiveCard = async (index: string, jobId: number) => {
    setState({ isLoadingDetail: true });
    scrollToTop();
    const dataDetail = await fetchApplicationDetailJob(jobId);
    setState({
      indexActive: index,
      jobDetail: dataDetail,
      isLoadingDetail: false,
    });
  };

  const handleViewCompany = () => {
    // console.log("You are click View Company");
  };

  const handleSelectTab = (selectTab: number) => {
    const isModified = !_.isEqual(state.selectTab, selectTab);
    if (isModified) {
      setState({ selectTab });
      const newFilter = { statusId: selectTab };
      filter.current = newFilter;
      pageCurrent.current = 1;
      totalElements.current = 10;
      setState({ isLoadingList: true, isLoadingDetail: true });
      getListApplicationJob();
    }
  };

  const handleOpenCancelModal = (isOpenCancelModal: boolean) => {
    setState({ isOpenCancelModal });
  };

  const handleCancel = async (applicationId: number) => {
    handleOpenCancelModal(false);
    loadingPageAction(LOADING_TYPES.CANCELING);
    const isSucces = await handleCancelApplication(applicationId);
    if (isSucces) {
      const { jobDetail, listJob } = state;
      const listJobCloned = _.map(listJob, (job) => {
        if (job.jobId === jobDetail.job.id) {
          return { ...job, statusId: 5 };
        }
        return job;
      });
      setState({
        jobDetail: {
          ...jobDetail,
          statusId: 5,
        },
        listJob: listJobCloned,
      });
    }
    loadingPageAction();
  };

  useEffect(() => {
    if (
      applicationGotoRedux.statusId === -1 &&
      _.isEmpty(applicationGotoRedux.listJob)
    ) {
      setState({ isLoadingList: true, isLoadingDetail: true });
      getListApplicationJob();
    } else {
      setState({
        listJob: applicationGotoRedux.listJob,
        jobDetail: applicationGotoRedux.jobDetail,
        selectTab: applicationGotoRedux.statusId,
      });
      totalElements.current = applicationGotoRedux.listJob.length;
    }
    loadingPageAction();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = divRef.current;
      if (element) {
        if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
          getListApplicationJob(true);
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

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const { jobDetail } = state || {};

  return (
    <>
      <ModalComponent
        className="modal-cancel"
        open={state.isOpenCancelModal}
        onCancel={() => handleOpenCancelModal(false)}
        centered
        footer={
          <div className="modal-footer-custom">
            <ButtonComponent
              className="confirm-btn"
              title="Confirm"
              size="large"
              type="primary"
              onClick={() => handleCancel(jobDetail.applicationId)}
            />
            <ButtonComponent
              className="cancel-btn"
              title="Cancel"
              size="large"
              type="default"
              onClick={() => handleOpenCancelModal(false)}
            />
          </div>
        }
      >
        <div className="modal-content-custom">
          <div className="title">Cancel this application</div>
          <div className="title-content">
            Are you sure you want to cancel? Once confirmed, your application
            will be withdrawn from the process.
          </div>
        </div>
      </ModalComponent>
      <div className="application-company-page">
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
          {state.isLoadingList ? (
            <Skeleton active title={false} paragraph={{ rows: 1 }} />
          ) : (
            <>
              <strong>{totalElements.current}</strong> application{" "}
              {totalElements.current < 2 ? "status" : "statuses"} were updated.
            </>
          )}
        </div>
        <div className="application-candidate">
          <div
            ref={divRef}
            className={classNames(
              "candidate-list",
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
                <div className="candidate-card" key={index}>
                  <Skeleton active title={false} paragraph={{ rows: 3 }} />
                </div>
              ))
            ) : _.isEmpty(state.listJob) ? (
              <EmptyComponent className="empty-layout" />
            ) : (
              _.map(state.listJob, (job, index) => (
                <div
                  className={classNames(
                    "candidate-card",
                    index === state.indexActive && "candidate-card-active"
                  )}
                  key={index}
                  onClick={() => handleActiveCard(index, job.applicationId)}
                >
                  <div className="candidate-card-left">
                    <div className="red-dot"></div>
                  </div>
                  <div className="candidate-card-mid">
                    <div className="candidate-title">
                      <div className="title">
                        {job.jobTitle}
                        {job.negotiable && (
                          <span className="title-sub">(Negotiable)</span>
                        )}
                      </div>
                    </div>
                    <div className="candidate">
                      <img
                        src={job.companyAvatarUrl}
                        alt="notification-icon"
                        className="candidate-logo"
                        width={40}
                        height={40}
                      />
                      <div className="candidate-info">
                        <div className="candidate-info-name">
                          {job.companyName}
                        </div>
                        <div className="candidate-info-state">
                          Stanford University
                        </div>
                      </div>
                    </div>
                    <div className="job-status">
                      {renderStatus(job.statusId)}
                    </div>
                  </div>
                  <div className="candidate-card-right">
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
                <div className="job-detail-candidate-name">
                  <img
                    src={jobDetail.job.company.companyAvatarUrl}
                    alt="notification-icon"
                    className="candidate-avatar"
                    width={84}
                    height={84}
                  />
                  <div className="candidate-description">
                    <div className="title">{jobDetail.job.title}</div>
                    <div className="candidate-info-education">
                      <GraduationCap size={16} color="#FF7710" />
                      Stanford University - Humanities and Art
                    </div>
                    <div className="candidate-info-detail">
                      Design enthusiast from Stanford, ready to innovate in
                      product design
                    </div>
                  </div>
                </div>
                <div ref={topButtonRef} className="job-detail-action">
                  <ButtonComponent
                    className="application-btn"
                    title="Review application"
                    onClick={handleOnclick}
                  />
                  <ButtonComponent
                    className="view-btn"
                    title="View profile"
                    icon={<ExportOutlined />}
                    iconPosition="end"
                    onClick={handleMarkSave}
                  />
                </div>
                <div className="job-detail-keys">
                  {_.map(jobDetail.job.keywords, (keyword) => (
                    <Badge title={keyword.name} />
                  ))}
                </div>
                <div className="job-detail-status">
                  {renderStatus(jobDetail.statusId)}
                </div>
                <div className="job-detail-title">
                  {jobDetail.job.title}
                  {jobDetail.job.negotiable && (
                    <span className="title-sub">(Negotiable)</span>
                  )}
                </div>
                <div className="job-detail-about">
                  <div className="job-detail-title">About the job</div>
                  <div className="job-detail-content">
                    {jobDetail.job.description}
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
                          {`${formatDate(
                            jobDetail.job.workStart
                          )} - ${formatDate(jobDetail.job.workEnd)}`}
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
                          {jobDetail.job.workplaceType.name}
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
                          {jobDetail.job.hoursPerWeek &&
                            `${jobDetail.job.hoursPerWeek} hours`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="job-detail-tasks">
                  <div className="job-detail-title">Tasks</div>
                  <div className="job-detail-content">
                    <ul>
                      {!_.isEmpty(jobDetail.job.tasks) ? (
                        _.map(jobDetail.job.tasks, (task) => (
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
                      {!_.isEmpty(jobDetail.job.qualifications) ? (
                        _.map(jobDetail.job.qualifications, (qualification) => (
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
                        src={jobDetail.job.company.companyAvatarUrl}
                        alt="notification-icon"
                        className="company-logo-intro"
                        height={64}
                        width={64}
                      />
                      <div className="company-info">
                        <div className="company-info-name">
                          {jobDetail.job.company.name}
                        </div>
                        <div className="company-info-detail">
                          <div className="company-info-detail-state">
                            <MapPin className="icon" size={18} />
                            <span>
                              {_.compact([
                                jobDetail.job.location.city,
                                // jobDetail.job.location.state,
                                jobDetail.job.location.country,
                              ]).join(", ")}
                            </span>
                          </div>
                          <div className="company-info-detail-employ">
                            <UsersFour className="icon" size={18} />
                            {jobDetail.job.company.companySize}
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
                      {jobDetail.job.company.companyOverview}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationCompanyPage;
