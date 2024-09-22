/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  EnvironmentOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Select, Space, Tooltip } from "antd";

import { CalendarDotIcon, NotificationIcon } from "@/app/assets/svg";
import Badge from "@/app/components/badge/badge";
import ButtonComponent from "@/app/components/button/button";
import SelectOption from "@/app/components/selectOption/selectOption";
import {
  ocaProgramOptions,
  salaryOptions,
  workingOptions,
} from "@/app/constants/selectOptions";
import useMergeState from "@/app/utils/customHook/useMergeState";
import useUpdateEffect from "@/app/utils/customHook/useUpdateEffect";
import {
  calculateDaysDiff,
  formatDate,
  keyFormatter,
} from "@/app/utils/formatter";
import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import _ from "lodash";
import Image from "next/image";
import {
  BookmarkSimple,
  Clock,
  MapPin,
  SlidersHorizontal,
  UsersFour,
} from "phosphor-react";
import React, { useEffect, useRef } from "react";
import { ApiState, JobBody, JobDetail, RequestBody, StateOption } from "./home.d";
import "./home.s.scss";

const HomePage: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const topButtonRef = useRef<HTMLDivElement>(null);
  const jobDetailRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useMergeState({
    searchState: "",
    searchJob: "",
    program: "O-CA Program",
    salary: "nonnegotiable",
    working: "remote",
    listJob: [],
    listState: [],
    markSave: false,
    onClickApply: false,
    page: 1,
    pageSize: 10,
    jobs: undefined,
    indexActive: 0,
    jobDetail: undefined,
    showBottomButton: false,
  });

  const handleChangeProgram = (value: string) => {
    setState({ program: value });
  };
  const handleChangeSalary = (value: string) => {
    setState({ salary: value });
  };
  const handleChangeWorking = (value: string) => {
    setState({ working: value });
  };
  const handleMarkSave = () => {
    setState({ markSave: !state.markSave });
  };
  const handleOnclick = () => {
    setState({ onClickApply: !state.onClickApply });
  };
  const onChangeJob = (value: string) => {
    setState({ searchJob: value });
  };
  const onChangeState = (value: string) => {
    setState({ searchState: value });
  };
  const onSearch = () => {
    console.log('test search');
  }

  const scrollToTop = () => {
    if (jobDetailRef.current) {
      jobDetailRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const url = "https://be.oca.classlionvn.net/";

  // const fetchAvatarImage = async (avatarUrl: string) => {
  //   try {
  //     const avatarId = _.last(_.split(avatarUrl, '/'));
  //     const response = await axios.get(url + 'avatars/' + avatarId,
  //       {
  //         headers: {
  //           'accept': 'image/png',
  //         },
  //         responseType: 'blob',
  //       }
  //     );
  //     const imageBlobUrl = URL.createObjectURL(response.data);
  //     return imageBlobUrl;
  //   } catch (error) {
  //     console.error('Error fetching image:', error);
  //     return null;
  //   }
  // };

  const fetchListJob = async (
    page: number,
    pageSize: number,
    requestBody: RequestBody
  ): Promise<JobBody | void> => {
    try {
      const response: AxiosResponse<JobBody> = await axios.post(
        url + "jobs?page=" + page + "&size=" + pageSize,
        {
          ...requestBody,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const fetchListStates = async (): Promise<StateOption[]> => {
    try {
      const response = await axios.get<ApiState[]>(url + "countries/1/states");
      const mappedStates = _.map(response.data, (state) => ({
        label: state.name,
        value: state.name,
      }));
      return mappedStates;
    } catch (error) {
      console.error("Error fetching", error);
      return [];
    }
  };

  const fetchDetailJob = async (jobId: number): Promise<JobDetail | void> => {
    try {
      const response = await axios.get<JobDetail>(url + "jobs/" + jobId);
      return response.data;
    } catch (error) {
      console.log("error", { error });
    }
  };

  const handleActiveCard = async (index: string, jobId: number) => {
    scrollToTop();
    const dataDetail = await fetchDetailJob(jobId);
    setState({ indexActive: index, jobDetail: dataDetail });
  };

  const getListState = async () => {
    try {
      const states = await fetchListStates();
      if (!_.isEmpty(states)) {
        setState({ listState: states });
      }
    } catch (error) {
      console.error("error");
    }
  };

  const getListJob = async (isLoadMore: boolean = false) => {
    try {
      const filter: RequestBody = {
        jobTitle: "",
        jobTypeId: 1,
        negotiable: true,
        workplaceTypeId: 1,
        countryId: 1,
        searchOptionId: 0,
      };
      const { page, pageSize } = state;
      const newPage = isLoadMore ? page + 1 : page;
      const data = await fetchListJob(0, pageSize * newPage, filter);
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
      }
      setState(newState);
    } catch (error) {
      console.log("error", { error });
      setState({ listJob: [] });
    }
  };

  useEffect(() => {
    getListState();
    getListJob();
  }, []);

  useUpdateEffect(() => {
    const handleScroll = () => {
      const div = divRef.current;
      if (div) {
        if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
          getListJob(true);
        }
      }
    };

    const div = divRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (div) {
        div.removeEventListener("scroll", handleScroll);
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

  const { jobDetail } = state || {};

  return (
    <div className="home-page">
      <div className="search">
        <Select
          showSearch
          allowClear
          className="select-custom"
          style={{ width: 350, fontWeight: 400 }}
          suffixIcon={null}
          onChange={onChangeJob}
          size="large"
          placeholder={
            <>
              <SearchOutlined
                style={{ marginRight: 6, color: "#0F172A" }}
              />
              Find your perfect experience
            </>
          }
        >
          {_.map(state.listState, (state) => (
            <Select.Option value={state.value}>
              <SearchOutlined style={{ marginRight: 6 }} /> {state.label}
            </Select.Option>
          ))}
        </Select>
        <Select
          showSearch
          allowClear
          className="select-custom"
          style={{ width: 350, fontWeight: 400 }}
          suffixIcon={null}
          onChange={onChangeState}
          size="large"
          placeholder={
            <>
              <EnvironmentOutlined
                style={{ marginRight: 6, color: "#0F172A" }}
              />
              City, state
            </>
          }
        >
          {_.map(state.listState, (state) => (
            <Select.Option value={state.value}>
              <EnvironmentOutlined style={{ marginRight: 6 }} /> {state.label}
            </Select.Option>
          ))}
        </Select>
        <ButtonComponent className="search-btn" title="Search" type="primary" size="large" onClick={onSearch} />
      </div>
      <div className="filter">
        <div className="filter-left">
          <Space wrap>
            {/* <SelectOption
              defaultValue={position}
              options={positionOptions}
              onChange={handleChangePosition}
              minWidth={105}
            /> */}
            <SelectOption
              defaultValue={state.program}
              options={ocaProgramOptions}
              onChange={handleChangeProgram}
              minWidth={150}
            />
            <SelectOption
              defaultValue={state.salary}
              options={salaryOptions}
              onChange={handleChangeSalary}
              minWidth={150}
            />
            <SelectOption
              defaultValue={state.working}
              options={workingOptions}
              onChange={handleChangeWorking}
              minWidth={100}
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
        <div ref={divRef} className="job-list">
          {_.map(state.listJob, (job, index) => (
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
                  />
                  <div className="company-info">
                    <div className="company-info-name">{job.companyName}</div>
                    <div className="company-info-state">{job.countryName}</div>
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
                    <BookmarkSimple size={20} />
                  ) : (
                    <BookmarkSimple size={20} color="#FF7710" weight="fill" />
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
          {!_.isEmpty(jobDetail) && (
            <>
              <div className="job-detail-name">
                <Image
                  src={NotificationIcon}
                  alt="notification-icon"
                  className="company-logo"
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
                      _.map(jobDetail.tasks, (task) => <li>{task}</li>)
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
                        <li>{qualification}</li>
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
                      src={NotificationIcon}
                      alt="notification-icon"
                      className="company-logo-intro"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
