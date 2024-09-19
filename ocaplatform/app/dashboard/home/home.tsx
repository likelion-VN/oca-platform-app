/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  EnvironmentOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Tooltip } from "antd";

import { CalendarDotIcon, notificationIcon } from "@/app/assets/svg";
import Badge from "@/app/components/badge/badge";
import ButtonComponent from "@/app/components/button/button";
import SelectOption from "@/app/components/selectOption/selectOption";
import {
  ocaProgramOptions,
  salaryOptions,
  workingOptions,
} from "@/app/constants/selectOptions";
import useMergeState from "@/app/utils/customHook/useMergeState";
import { calculateDaysDiff, keyFormatter } from "@/app/utils/formatter";
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
import "./home.s.scss";

interface RequestBody {
  jobTitle?: string;
  jobTypeId: number;
  negotiable: boolean;
  workplaceTypeId: number;
  countryId: number;
  searchOptionId: number;
}

interface Job {
  jobId: number;
  jobTitle: string;
  companyName: string;
  countryName: string;
  stateName: string;
  keywords: string;
  negotiable: string;
  postDateTime: string;
  marked: boolean;
  companyAvatarUrl: string;
}

interface JobBody {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Job[];
  number: number;
  sort: {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }[];
  pageable: {
    offset: number;
    sort: {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    }[];
    unpaged: boolean;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface ApiState {
  id: number;
  name: string;
}

interface StateOption {
  label: string;
  value: string;
}

const HomePage: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useMergeState({
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
  const handleActiveCard = (index: number) => {
    setState({ indexActive: index})
  }

  const url = "https://be.oca.classlionvn.net/";

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
          _.assign(newState, { listJob: data.content, jobs: data });
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

  useEffect(() => {
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

  return (
    <div className="home-page">
      <div className="search">
        <Space.Compact>
          <Input
            className="input-experience"
            style={{ width: "50%" }}
            placeholder="Find your perfect experience"
            prefix={<SearchOutlined />}
          />
          <SelectOption
            allowClear
            minWidth={350}
            options={state.listState}
            suffixIcon={null}
          />
          {/* <Input
            className="input-state"
            style={{ width: "50%" }}
            placeholder="City, state"
            prefix={<EnvironmentOutlined />}
            addonAfter={<SelectOption options={listState} />}
          /> */}
          <ButtonComponent title="Search" type="primary" />
        </Space.Compact>
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
      <div className="count-jobs">
        <strong>50 Product intern</strong> jobs in United State
      </div>
      <div className="jobs">
        <div ref={divRef} className="job-list">
          {_.map(state.listJob, (job, index) => (
            <div
              className={classNames(
                "job-card",
                index === state.indexActive && "job-card-active"
              )}
              key={index}
              onClick={() => handleActiveCard(index)}
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
                    // src={job.companyAvatarUrl}
                    src={notificationIcon}
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
        <div className="job-detail">
          <div className="job-detail-name">
            <Image
              src={notificationIcon}
              alt="notification-icon"
              className="company-logo"
            />
            <div className="job-title">
              <div className="title">
                E-Commerce Fraud Prevention Internship – Summer 2025
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
              </div>
              <div className="company-info">
                <div className="company-info-name">LIKELION US</div>
                <div className="company-info-state">
                  <EnvironmentOutlined className="icon" />
                  San Jose, CA
                </div>
              </div>
            </div>
          </div>
          <div className="job-detail-action">
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
            <Badge title="Product intern" />
            <Badge title="Industry" />
            <Badge title="English" />
            <Badge title="Remote" />
            <Badge title="Negotiable" />
            <Badge title="Test" />
          </div>
          <div className="job-detail-about">
            <div className="job-detail-title">About the job</div>
            <div className="job-detail-content">
              We are user-oriented and dedicated to technical excellence. We aim
              to drive and lead the technology renovation in the ads tech and
              creative industry, powering products and driving values for our
              clients, creators, and the whole ecosystem. We are looking for
              experienced product managers to continually push the innovation
              bar and make our product the best place to get inspired and
              express creativity.
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
                    07/01/2024 - 08/31/2024
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
                  <div className="apply-duration-detail-time">10 hours</div>
                </div>
              </div>
            </div>
          </div>
          <div className="job-detail-tasks">
            <div className="job-detail-title">Tasks</div>
            <div className="job-detail-content">
              <ul>
                <li>Basic Data Extraction and Organization</li>
                <li>Meeting Minutes Compilation and Sharing</li>
                <li>Training: Backend coding practise, review and revision</li>
              </ul>
            </div>
          </div>
          <div className="job-detail-qualify">
            <div className="job-detail-title">Minimum Qualifications</div>
            <div className="job-detail-content">
              <ul>
                <li>Basic Data Extraction and Organization</li>
                <li>Meeting Minutes Compilation and Sharing</li>
                <li>Training: Backend coding practise, review and revision</li>
              </ul>
            </div>
          </div>
          <div className="job-detail-company">
            <div className="job-detail-company-intro">
              <div className="job-detail-company-intro-left">
                <Image
                  src={notificationIcon}
                  alt="notification-icon"
                  className="company-logo-intro"
                />
                <div className="company-info">
                  <div className="company-info-name">LIKELION US</div>
                  <div className="company-info-detail">
                    <div className="company-info-detail-state">
                      <MapPin className="icon" size={18} />
                      <span>San Jose, CA</span>
                    </div>
                    <div className="company-info-detail-employ">
                      <UsersFour className="icon" size={18} />
                      10-50 employees
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
                />
              </div>
            </div>
            <div className="job-detail-company-overview">
              <div className="job-detail-title">Company overview</div>
              <div className="job-detail-content">
                LIKELION is a student-run Tech Entrepreneurship Community that
                helps students solve real-world problems and develop their ideas
                into competitive products using programming. With our
                beginner-friendly program, learn to code, build experiences, and
                connect with a network of diverse individuals to achieve your
                goals.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
