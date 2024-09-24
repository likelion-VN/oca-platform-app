/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  EnvironmentOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AutoComplete, Button, Input, Skeleton, Space, Tooltip } from "antd";

import { CalendarDotIcon } from "@/app/assets/svg";
import Badge from "@/app/components/badge/badge";
import ButtonComponent from "@/app/components/button/button";
import SelectCustom from "@/app/components/selectCustom/selectCustom";
import {
  ApplicationTermsOptions,
  JobTypeOptions,
  WorkTypeOptions,
} from "@/app/constants/selectOptions";
import {
  fetchAutoComplete,
  fetchDetailJob,
  fetchListJob,
  fetchListLocation,
} from "@/app/services/home";
import useMergeState from "@/app/utils/customHook/useMergeState";
import useUpdateEffect from "@/app/utils/customHook/useUpdateEffect";
import {
  calculateDaysDiff,
  formatDate,
  keyFormatter,
} from "@/app/utils/formatter";
import classNames from "classnames";
import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookmarkSimple,
  Clock,
  MapPin,
  SlidersHorizontal,
  UsersFour,
} from "phosphor-react";
import React, { useEffect, useRef } from "react";
import { RequestHomePageBody } from "../../interface/home";
import "./home.s.scss";

const HomePage: React.FC = () => {
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
  const topButtonRef = useRef<HTMLDivElement>(null);
  const jobDetailRef = useRef<HTMLDivElement>(null);
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
    searchJob: "",
    listAutoComplete: [],
    searchLocation: [],
    listLocation: [],
    jobType: [],
    valueJobType: null,
    application: null,
    valueApplication: null,
    workType: [],
    valueWorkType: null,
    listJob: [],
    listState: [],
    markSave: false,
    page: 1,
    pageSize: 10,
    jobs: undefined,
    indexActive: 0,
    jobDetail: undefined,
    showBottomButton: false,
    hasShadowTop: false,
    hasShadowBottom: true,
    isLoadingList: false,
    isLoadingDetail: false,
  });

  const renderValue = (
    values: (string | number)[],
    options: { value: string | number; label: string }[]
  ) => {
    const selectedOptions = !_.isEmpty(values)
      ? options.filter((option) => values.includes(option.value))
      : [];

    if (selectedOptions.length === 0) return;

    if (selectedOptions.length === 1) return selectedOptions[0].label;

    const firstOption = selectedOptions[0].label;
    const moreCount = selectedOptions.length - 1;

    return `${firstOption} + ${moreCount} more`;
  };

  const getListAutoComplete = async (text: string) => {
    try {
      const autoCompletes = await fetchAutoComplete(text, 0, 6);
      if (!_.isEmpty(autoCompletes)) {
        const listAutoComplete = _.map(autoCompletes, (item) => ({
          value: item.value,
          label: (
            <>
              <SearchOutlined style={{ marginRight: 6 }} /> {item.label}
            </>
          ),
        }));
        setState({ listAutoComplete });
      }
    } catch (error) {
      console.error("error");
    }
  };

  const getListLocation = async (text: string) => {
    try {
      const locations = await fetchListLocation(text, 0, 6);
      if (!_.isEmpty(locations)) {
        const listLocation = _.map(locations, (item) => ({
          id: item.id,
          value: item.value,
          label: (
            <>
              <EnvironmentOutlined style={{ marginRight: 6 }} /> {item.label}
            </>
          ),
        }));
        setState({ listLocation });
      }
    } catch (error) {
      console.error("error");
    }
  };

  const getListJob = async (isLoadMore: boolean = false) => {
    setState({ isLoadingList: true, isLoadingDetail: true });
    try {
      const { page, pageSize } = state;
      const newPage = isLoadMore ? page + 1 : page;
      const data = await fetchListJob(0, pageSize * newPage, filter.current);
      const newState = { page: newPage };
      if (data && !_.isEmpty(data.content)) {
        if (isLoadMore) {
          _.assign(newState, { listJob: data.content });
        } else {
          const dataDetail = await fetchDetailJob(data.content[0].jobId);
          _.assign(newState, {
            listJob: data.content,
            jobs: data,
            jobDetail: dataDetail,
          });
        }
      } else {
        _.assign(newState, { listJob: [], jobDetail: {} });
      }
      _.assign(newState, { isLoadingList: false, isLoadingDetail: false });
      setState(newState);
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

  const handleChangeJobType = (values: string[]) => {
    setState({
      jobType: values,
      valueJobType: renderValue(values, JobTypeOptions),
    });
  };

  const handleChangeApplication = (value: string | null) => {
    setState({
      application: value,
      valueApplication:
        ApplicationTermsOptions.find((option) => option.value === value)
          ?.label || "Application Terms",
    });
  };

  const handleChangeWorkType = (values: string[]) => {
    setState({
      workType: values,
      valueWorkType: renderValue(values, WorkTypeOptions),
    });
  };

  const handleMarkSave = () => {
    setState({ markSave: !state.markSave });
  };

  const handleOnclick = () => {
    router.push("./application-form");
  };

  const onChangeJob = (value: string) => {
    setState({ searchJob: value });
  };

  const onChangeLocation = (value: string, option: any) => {
    setState({ searchLocation: option.id });
  };

  const onSearch = () => {
    const { searchJob, searchLocation } = state;
    const cityId = searchLocation?.[0] | 0;
    const stateId = searchLocation?.[1] | 0;
    const clonedFilter = _.cloneDeep(filter.current);
    const newFilter = {
      ...clonedFilter,
      jobTitle: searchJob,
      cityId,
      stateId,
    };
    filter.current = newFilter;
    getListJob();
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

  useEffect(() => {
    getListJob();
  }, []);

  useUpdateEffect(() => {
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

  useUpdateEffect(() => {
    const handleScroll = () => {
      if (topButtonRef.current) {
        const rect = topButtonRef.current.getBoundingClientRect();
        if (rect.top < 0) {
          setState({ showBottomButton: true });
        } else {
          setState({ showBottomButton: false });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useUpdateEffect(() => {
    const { jobType, application, workType } = state;
    const clonedFilter = _.cloneDeep(filter.current);
    const jobTypeId = !_.isEmpty(jobType) ? 1 : 0;
    const negotiable = !!application ? application === "negotiable" : null;
    const workplaceTypeIds = !_.isEmpty(workType) ? workType : [];
    const newFilter = {
      ...clonedFilter,
      jobTypeId,
      negotiable,
      workplaceTypeIds,
    };
    filter.current = newFilter;
    getListJob();
  }, [state.jobType, state.application, state.workType]);

  const { jobDetail } = state || {};

  return (
    <div className="home-page">
      <div className="search">
        <AutoComplete
          className="auto-completed-custom"
          style={{ width: 350, fontWeight: 400 }}
          onSearch={(text) => getListAutoComplete(text)}
          onChange={onChangeJob}
          options={state.listAutoComplete}
        >
          <Input
            allowClear
            size="large"
            placeholder="Find your perfect experience"
            prefix={
              <SearchOutlined style={{ marginRight: 6, color: "#0F172A" }} />
            }
          />
        </AutoComplete>
        <AutoComplete
          className="auto-completed-custom"
          style={{ width: 350, fontWeight: 400 }}
          onSearch={(text) => getListLocation(text)}
          onChange={onChangeLocation}
          options={state.listLocation}
        >
          <Input
            allowClear
            size="large"
            placeholder="City, state"
            prefix={
              <EnvironmentOutlined
                style={{ marginRight: 6, color: "#0F172A" }}
              />
            }
          />
        </AutoComplete>
        <ButtonComponent
          className="search-btn"
          title="Search"
          type="primary"
          size="large"
          onClick={onSearch}
        />
      </div>
      <div className="filter">
        <div className="filter-left">
          <Space wrap>
            <SelectCustom
              value={state.valueJobType}
              placeholder="O-CA Program"
              options={JobTypeOptions}
              onChange={handleChangeJobType}
              type="checkbox"
            />
            <SelectCustom
              value={state.valueApplication}
              placeholder="Application Terms"
              options={ApplicationTermsOptions}
              onChangeRadio={handleChangeApplication}
              type="radio"
            />
            <SelectCustom
              value={state.valueWorkType}
              placeholder="Work Type"
              options={WorkTypeOptions}
              onChange={handleChangeWorkType}
              type="checkbox"
            />
          </Space>
        </div>
        <div className="filter-right">
          <Button className="filter-btn" icon={<SlidersHorizontal size={20} />}>
            All filter
          </Button>
        </div>
      </div>
      {/* <div className="count-jobs">
        <strong>50 Product intern</strong> jobs in United State
      </div> */}
      <div className="jobs">
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
          {state.isLoadingList
            ? _.map(new Array(5), (item, index) => (
                <div className="job-card" key={index}>
                  <Skeleton active title={false} paragraph={{ rows: 3 }} />
                </div>
              ))
            : _.map(state.listJob, (job, index) => (
                <div
                  className={classNames(
                    "job-card",
                    index === state.indexActive && "job-card-active"
                  )}
                  key={index}
                  onClick={() => handleActiveCard(index, job.jobId)}
                >
                  <div className="job-card-left">
                    <div className="job-title">
                      <div className="title">
                        {job.jobTitle}
                        {job.negotiable && (
                          <span className="title-sub">(Negotiable)</span>
                        )}
                      </div>
                    </div>
                    <div className="company">
                      <Image
                        src={job.companyAvatarUrl}
                        alt="notification-icon"
                        className="company-logo"
                        width={40}
                        height={40}
                      />
                      <div className="company-info">
                        <div className="company-info-name">
                          {job.companyName}
                        </div>
                        <div className="company-info-state">
                          {job.countryName}
                        </div>
                      </div>
                    </div>
                    <div className="job-keys">
                      {_.map(keyFormatter(job.keywords), (keyword) => (
                        <Badge title={keyword} />
                      ))}
                    </div>
                  </div>
                  <div className="job-card-right">
                    <div className="job-mark">
                      {job.marked ? (
                        <BookmarkSimple
                          size={20}
                          color="#FF7710"
                          weight="fill"
                        />
                      ) : (
                        <BookmarkSimple size={20} />
                      )}
                    </div>
                    <div className="update-time">
                      {calculateDaysDiff(job.postDateTime)}
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div ref={jobDetailRef} className="job-detail">
          {state.isLoadingDetail ? (
            <Skeleton active paragraph={{ rows: 13 }} />
          ) : (
            !_.isEmpty(jobDetail) && (
              <>
                <div className="job-detail-name">
                  <Image
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
                        <span className="title-sub">(Negotiable)</span>
                      )}
                      <Tooltip
                        className="tooltip"
                        placement="bottom"
                        title="This indicates that the company is willing to negotiate and adjust the job duties, working hours, duration, and location through discussion"
                      >
                        <QuestionCircleOutlined
                          style={{ fontSize: 16, color: "#0A5CD8" }}
                        />
                      </Tooltip>
                    </div>
                    <div className="company-info">
                      <div className="company-info-name">
                        {jobDetail.company.name}
                      </div>
                      <div className="company-info-state">
                        <EnvironmentOutlined className="icon" />
                        {_.compact([
                          jobDetail.location.country,
                          jobDetail.location.state,
                        ]).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={topButtonRef} className="job-detail-action">
                  <ButtonComponent
                    className="application-btn"
                    title="Apply now"
                    onClick={handleOnclick}
                  />
                  <ButtonComponent
                    className="save-btn"
                    icon={
                      state.markSave ? (
                        <BookmarkSimple
                          size={24}
                          weight="fill"
                          color="#FF7710"
                        />
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
                <div className="job-detail-about">
                  <div className="job-detail-title">About the job</div>
                  <div className="job-detail-content">
                    {jobDetail.description}
                  </div>
                  <div className="job-detail-duration">
                    <div className="apply-duration">
                      <div className="apply-duration-icon">
                        <Image src={CalendarDotIcon} alt="calendar-icon" />
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
                      <Image
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
                                jobDetail.location.country,
                                jobDetail.location.state,
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
                        onClick={onSearch}
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
