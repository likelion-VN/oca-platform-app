/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EnvironmentOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Input,
  message,
  Skeleton,
  Space,
  Tooltip,
} from "antd";

import classNames from "classnames";
import _ from "lodash";
import {
  BookmarkSimple,
  Clock,
  FileX,
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
import ModalComponent from "../../../components/modal/modal";
import SelectCustom from "../../../components/selectCustom/selectCustom";
import {
  ApplicationTermsOptions,
  JobTypeOptions,
  WorkTypeOptions,
} from "../../../constants/selectOptions";
import { RequestHomePageBody } from "../../../interfaces/home";
import { fetchDetailJob } from "../../../services/fetchDetailJob";
import { fetchListJob } from "../../../services/fetchListJob";
import { fetchListLocation } from "../../../services/fetchListLocation";
import { fetchSearchComplete } from "../../../services/fetchSearchComplete";
import { handleSaveJob } from "../../../services/handleSaveJob";
import loadingPage from "../../../store/actions/loading";
import { calculateDaysDiff } from "../../../utils";
import useActions from "../../../utils/customHook/useActions";
import useMergeState from "../../../utils/customHook/useMergeState";
import { formatDate, keyFormatter } from "../../../utils/formatter";
import {
  renderStatus,
  renderStatusDescription,
  renderStatusDetail,
  renderStatusTitle,
} from "../dashboard.h";
import "./home.s.scss";

interface IPropsHome {
  isActive: boolean;
}

const HomePage: React.FC<IPropsHome> = ({ isActive }) => {
  const loadingPageAction = useActions(loadingPage);
  const navigate = useNavigate();
  const isFirstRender = useRef<boolean>(true);
  const divRef = useRef<HTMLDivElement>(null);
  const topButtonRef = useRef<HTMLDivElement>(null);
  const jobDetailRef = useRef<HTMLDivElement>(null);
  const pageCurrent = useRef(1);
  const totalElements = useRef(10);
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
    indexActive: 0,
    jobDetail: undefined,
    showBottomButton: false,
    hasShadowTop: false,
    hasShadowBottom: true,
    isLoadingList: false,
    isLoadingDetail: false,
    visible: false,
    isOpenCancelModal: false,
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
      const autoCompletes = await fetchSearchComplete(text, 0, 6);
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
      console.error("Error:", error);
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
              jobDetail: dataDetail,
              markSave: dataDetail?.marked,
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

  // const menu = (
  //   <Menu className="menu-filter">
  //     <Menu.Item className="menu-filter-header">Filter</Menu.Item>
  //     <Menu.Item className="menu-filter-jobType">
  //       <div className="menu-title">
  //         <div className="title-filter">O-CA Program</div>
  //         <ButtonComponent
  //           type="link"
  //           size="small"
  //           title="Clear"
  //           // onClick={clearPrograms}
  //         />
  //       </div>
  //       <div className="menu-options">
  //         <Checkbox.Group
  //           options={JobTypeOptions}
  //           // value={checkedPrograms}
  //           // onChange={handleProgramChange}
  //         />
  //       </div>
  //     </Menu.Item>

  //     <Menu.Item className="menu-filter-application">
  //       <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
  //         <Col>
  //           <div style={{ fontWeight: 500 }}>Application Terms</div>
  //         </Col>
  //         <Col>
  //           <Button
  //             type="link"
  //             size="small"
  //             // onClick={clearTerms}
  //           >
  //             Clear
  //           </Button>
  //         </Col>
  //       </Row>
  //       <Radio.Group
  //       // onChange={handleTermsChange}
  //       // value={applicationTerms}
  //       >
  //         <Space direction="vertical">
  //           <Radio className="radio-custom" value="Non-negotiable">
  //             Non-negotiable
  //           </Radio>
  //           <Radio className="radio-custom" value="Negotiable">
  //             Negotiable
  //           </Radio>
  //         </Space>
  //       </Radio.Group>
  //     </Menu.Item>

  //     <Menu.Item className="menu-filter-workplace">
  //       <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
  //         <Col>
  //           <div style={{ fontWeight: 500 }}>Work Type</div>
  //         </Col>
  //         <Col>
  //           <Button
  //             type="link"
  //             size="small"
  //             // onClick={clearWorkType}
  //           >
  //             Clear
  //           </Button>
  //         </Col>
  //       </Row>
  //       <Checkbox.Group
  //         options={WorkTypeOptions}
  //         // value={workType}
  //         // onChange={handleWorkTypeChange}
  //       />
  //     </Menu.Item>

  //     <Menu.Item key="footer">
  //       <div style={{ textAlign: "center" }}>
  //         <Button
  //           type="primary"
  //           // onClick={handleApplyFilters}
  //           style={{ width: "80%", marginBottom: 10 }}
  //         >
  //           Apply filters
  //         </Button>
  //         <Button
  //           // onClick={handleReset}
  //           style={{ width: "80%" }}
  //         >
  //           Reset
  //         </Button>
  //       </div>
  //     </Menu.Item>
  //   </Menu>
  // );

  // const handleVisibleChange = (flag: boolean) => {
  //   setState({ visible: flag });
  // };

  const handleChangeJobType = (values: string[]) => {
    const isModified = !_.isEqual(_.sortBy(state.jobType), _.sortBy(values));
    if (isModified) {
      setState({
        jobType: values,
        valueJobType: renderValue(values, JobTypeOptions),
      });
    }
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
    const isModified = !_.isEqual(_.sortBy(state.workType), _.sortBy(values));
    if (isModified) {
      setState({
        workType: values,
        valueWorkType: renderValue(values, WorkTypeOptions),
      });
    }
  };

  const handleMarkSave = async (id: number) => {
    const { listJob } = state;
    const listJobCloned = _.map(listJob, (job) => {
      if (job.jobId === id) {
        return { ...job, marked: !state.markSave };
      }
      return job;
    });

    await handleSaveJob(id);
    setState({ markSave: !state.markSave, listJob: listJobCloned });
  };

  const handleApply = () => {
    const { jobDetail } = state;
    navigate("/application-form", { state: { jobDetail } });
  };

  // const handleReview = () => {

  // }

  const onChangeJob = (value: string) => {
    setState({ searchJob: value });
  };

  const onChangeLocation = (_value: string, option: any) => {
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
      markSave: dataDetail?.marked,
      isLoadingDetail: false,
    });
  };

  const handleViewCompany = () => {
    console.log("You are clicking View Company");
  };

  const handleOpenCancelModal = (isOpenCancelModal: boolean) => {
    setState({ isOpenCancelModal });
  };

  useEffect(() => {
    if (isActive) {
      setState({
        isLoadingList: true,
        isLoadingDetail: true,
      });
      getListJob();
      loadingPageAction();
    }
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

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
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
      pageCurrent.current = 1;
      totalElements.current = 10;
      setState({ isLoadingList: true, isLoadingDetail: true });
      getListJob();
    } else {
      isFirstRender.current = false;
    }
  }, [state.jobType, state.application, state.workType]);

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
              // onClick={handleRemoveResume}
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
            className="auto-completed-custom auto-completed-city-state"
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
                placeholder="Job Type"
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
            {/* <Dropdown
            overlay={menu}
            trigger={["click"]}
            visible={state.visible}
            onVisibleChange={handleVisibleChange}
            placement="bottomRight"
          >
            <Button
              className="filter-btn"
              icon={<SlidersHorizontal size={20} />}
            >
              All filter
            </Button>
          </Dropdown> */}
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
                        <div className="company-info-name">
                          {job.companyName}
                        </div>
                        <div className="company-info-state">
                          {_.compact([job.cityName, job.countryName]).join(
                            ", "
                          )}
                        </div>
                      </div>
                    </div>
                    {job.applicationId ? (
                      <div className="job-status">
                        {renderStatus(job.statusId)}
                      </div>
                    ) : (
                      <div className="job-keys">
                        {_.map(keyFormatter(job.keywords), (keyword) => (
                          <Badge title={keyword} />
                        ))}
                      </div>
                    )}
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
                    title={
                      jobDetail.applied ? "View your application" : "Apply now"
                    }
                    onClick={handleApply}
                  />
                  {(jobDetail.statusId === 1 || jobDetail.statusId === 2) && (
                    <Tooltip
                      className="tooltip"
                      title="Cancel your application"
                      placement="bottom"
                    >
                      <Button
                        className="cancel-btn"
                        icon={<FileX size={24} />}
                        onClick={() => handleOpenCancelModal(true)}
                      />
                    </Tooltip>
                  )}
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
                    onClick={() => handleMarkSave(jobDetail.id)}
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
                        <div className="status-action">
                          {renderStatusDetail(jobDetail.statusId)}
                          <div className="status-action-date">
                            {calculateDaysDiff(jobDetail.lastUpdateDate, true)}
                          </div>
                        </div>
                        <div className="status-title">
                          {renderStatusTitle(jobDetail.statusId)}
                        </div>
                        <div className="status-description">
                          {renderStatusDescription(jobDetail.statusId)}
                        </div>
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
    </>
  );
};

export default HomePage;
