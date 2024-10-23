import { Collapse, CollapseProps, Dropdown, MenuProps, Tag } from "antd";
import ButtonComponent from "../../../../components/button/button";
import avatarStudent from "./../../../../assets/demoStatic/avatar.png";
import bannerStudentHeader from "./../../../../assets/demoStatic/banner.png";
import bellCompany from "./../../../../assets/demoStatic/BellRinging.png";
import iconEdit from "./../../../../assets/demoStatic/edit.png";
import iconEditCircle from "./../../../../assets/demoStatic/editCircle.png";
import iconDelete from "./../../../../assets/demoStatic/delete.png";
import iconCloseJob from "./../../../../assets/demoStatic/closeJob.png";
import iconSetting from "./../../../../assets/demoStatic/setting.png";

import "./studentProfile.scss";
import StudentProfileDetails from "./studentProfileDetails";
import ModalComponent from "../../../../components/modal/modal";
import useMergeState from "../../../../utils/customHook/useMergeState";
import FormAddEducation from "./form/formAddEducation";
import FormAddCareerHistory from "./form/formAddCareerHistory";
import FormAddCertificate from "./form/formAddCertificate";
import FormAddClubAndOrgani from "./form/formAddClubAndOrgani";
import FormAddVolunteerWork from "./form/formAddVolunteerWork";

const itemsDropdown: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className="user-profile-detail-setting-action">
        <button className="btn-student-detail-edit">
          <img src={iconCloseJob} alt="" />
          <span>Edit</span>
        </button>
        <button className="btn-delete-student-detail">
          <img src={iconDelete} alt="" />
          <span>Delete</span>
        </button>
      </div>
    ),
  },
];

const itemsMockup = [
  { label: "Product Knowledge", value: "product_knowledge" },
  { label: "Lorem ipsum", value: "lorem_ipsum_1" },
  { label: "Lorem ipsum", value: "lorem_ipsum_2" },
  { label: "Lorem ipsum", value: "lorem_ipsum_3" },
  { label: "Lorem ipsum", value: "lorem_ipsum_4" },
  { label: "Lorem ipsum", value: "lorem_ipsum_5" },
  { label: "Lorem ipsum", value: "lorem_ipsum_6" },
  {
    label: "Consectetu Lorem ipsumr adipis",
    value: "consectetu_lorem_ipsumr_adipis",
  },
];

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <div>
        <div className="title-collapse">
          <p>Company Culture</p>
          <button
            // onClick={() => {
            //   handleShowModalAddTag("company-culture");
            // }}
            className="btn-open-add-tag"
          >
            <img src={iconEditCircle} />
          </button>
        </div>
        <div className="list-tag-render-collapse">
          {itemsMockup.map((item: any, index: number) => {
            return (
              <Tag className="tag-render-collapse" key={index}>
                {item.label}
              </Tag>
            );
          })}
        </div>
      </div>
    ),
    children: <p>abc</p>,
  },
  {
    key: "2",
    label: (
      <div>
        <div className="title-collapse">
          <p>Languages</p>
          <button
            // onClick={() => {
            //   handleShowModalAddTag("languages");
            // }}
            className="btn-open-add-tag"
          >
            <img src={iconEditCircle} />
          </button>
        </div>
        <div className="list-tag-render-collapse">
          {itemsMockup.map((item: any, index: number) => {
            return (
              <Tag className="tag-render-collapse" key={index}>
                {item.label}
              </Tag>
            );
          })}
        </div>
      </div>
    ),
    children: <p>abc</p>,
  },
  {
    key: "3",
    label: (
      <div>
        <div className="title-collapse">
          <p>Focus Areas</p>
          <button
            // onClick={() => {
            //   handleShowModalAddTag("focus-area");
            // }}
            className="btn-open-add-tag"
          >
            <img src={iconEditCircle} />
          </button>
        </div>
        <div className="list-tag-render-collapse">
          {itemsMockup.map((item: any, index: number) => {
            return (
              <Tag className="tag-render-collapse" key={index}>
                {item.label}
              </Tag>
            );
          })}
        </div>
      </div>
    ),
    children: <p>abc</p>,
  },
];

const educationList = [
  {
    institution: "Massachusetts Institute of Technology",
    degree: "Electrical Engineering and Premedical Bachelor of Science (S.B.)",
    startDate: "Sep 2021",
    endDate: "Jan 2023",
  },
  {
    institution: "Massachusetts Institute of Technology",
    degree: "Electrical Engineering and Premedical Bachelor of Science (S.B.)",
    startDate: "Sep 2021",
    endDate: "Jan 2023",
  },
];

const careerHistory = [
  {
    position: "Project Lead",
    company: "Purposeful Finance (SOF)",
    location: "Remote",
    startDate: "Sep 2021",
    endDate: "Jan 2023",
    logo: "GoPro",
  },
  {
    position: "Innovative Finance Intern",
    company: "Purposeful Finance (SOF)",
    location: "Remote",
    startDate: "Sep 2021",
    endDate: "Jan 2023",
    logo: "Dyson",
  },
  {
    position: "Investment Banking Intern",
    company: "Purposeful Finance (SOF)",
    location: "Remote",
    startDate: "Sep 2021",
    endDate: "Jan 2023",
    logo: "Belle",
  },
];

const certificates = [
  {
    title: "Introduction to Python (Data Science)",
    provider: "DataCamp",
    publishedDate: "Sep 2021",
    logo: "DataCamp",
  },
  {
    title: "Innovative Finance Intern",
    provider: "DataCamp",
    publishedDate: "Sep 2021",
    logo: "DataCamp",
  },
];

const clubsAndOrganizations = [
  {
    clubName: "Debate Club",
    position: "President",
    startDate: "Sep 2022",
    endDate: "Present",
    logo: "Generic Club Logo",
  },
  {
    clubName: "Business and Entrepreneurship Club",
    position: "President",
    startDate: "Sep 2022",
    endDate: "Present",
    logo: "Generic Club Logo",
  },
  {
    clubName: "Finance and Investment Club",
    position: "President",
    startDate: "Sep 2022",
    endDate: "Present",
    logo: "Generic Club Logo",
  },
];

const volunteerWork = [
  {
    organization: "Green Earth Volunteers",
    role: "Volunteer",
    startDate: "Sep 2022",
    endDate: "Present",
    frequency: "Every Saturday",
    logo: "Generic Volunteer Logo",
  },
  {
    organization: "Nature Conservation Volunteers",
    role: "Volunteer",
    startDate: "Sep 2022",
    endDate: "Present",
    frequency: "Every Saturday",
    logo: "Generic Volunteer Logo",
  },
  {
    organization: "Mental Health Awareness Volunteers",
    role: "Volunteer",
    startDate: "Sep 2022",
    endDate: "Present",
    frequency: "Every Saturday",
    logo: "Generic Volunteer Logo",
  },
];

const StudentProfile = () => {
  const [state, setState] = useMergeState({
    openModalAddProfileDetail: false,
    titleModal: "",
    typeModal: "",
  });

  const handleRenderFormModal = () => {
    switch (state.typeModal) {
      case "add-education":
        return <FormAddEducation />;
      case "add-career-history":
        return <FormAddCareerHistory />;
      case "add-volunteer-work":
        return <FormAddVolunteerWork />;
      case "add-clubs-and-organizations":
        return <FormAddClubAndOrgani />;
      case "add-certificates":
        return <FormAddCertificate />;
    }
  };
  return (
    <>
      <div className="content-detail">
        <div className="student-profile">
          <div className="student-information">
            {/* student header */}
            <div className="student-header">
              <div className="student-header-banner">
                <img className="img-banner" src={bannerStudentHeader} alt="" />
              </div>
              <div className="student-header-text">
                <div className="student-header-avatar">
                  <img src={avatarStudent} alt="" />
                </div>
                <div className="student-header-name">
                  <h4>likelion us</h4>
                  <button className="student-header-status">
                    <img src={bellCompany} alt="" />
                    <span>Now hiring</span>
                  </button>
                </div>
                <div className="student-header-description">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="student-header-meta-info">
                  <span>Information Technology & Services</span>
                </div>
                <div className="student-header-action-button">
                  <ButtonComponent
                    className="btn-edit-profile"
                    title="Edit profile"
                    iconPosition="end"
                    icon={<img src={iconEdit} />}
                  />
                </div>
              </div>
            </div>
            {/* studentDetails  */}
            <div className="student-detail">
              <div className="student-detail-about">
                <h5>About</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irureng ikim dolor in sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
              </div>
              <div className="student-detail-email">
                <h5>Email</h5>
                <p>
                  <a href="#">consectetur@gmail.com</a>
                </p>
              </div>
              <div className="student-detail-website">
                <h5>Website</h5>
                <p>
                  <a href="#">www.facebook.com/nnn</a>
                </p>
              </div>
              <div className="student-detail-location">
                <h5>Location</h5>
                <p>Berkeley City</p>
              </div>
            </div>
            <Collapse
              className="student-detail-collapse"
              expandIcon={() => {
                return null;
              }}
              expandIconPosition="end"
              accordion
              items={items}
            />
          </div>
          <div className="list-student-profile-detail">
            <StudentProfileDetails
              handleAddNew={() => {
                setState({
                  typeModal: "add-education",
                  openModalAddProfileDetail: true,
                  titleModal: "Add education",
                });
              }}
              items={educationList}
              renderItem={(item, index) => {
                return (
                  <div
                    className="student-profile-detail-content-item"
                    key={index}
                  >
                    <div className="content-item-logo">
                      <img src={avatarStudent} width={56} height={56} alt="" />
                    </div>
                    <div className="content-item-text">
                      <div>
                        <h4>{item.institution}</h4>
                        <p className="content-item-text-location">
                          {item.degree}
                        </p>
                        {/* <p className="content-item-text-created-at">
                      <div className="created-at-status">
                        <div className="status-shape"></div>
                        <span>Open</span>
                      </div>
                      <span>1d ago</span>
                    </p> */}
                        {/* <p className="content-item-text-applicant">
                      <span>{item.startDate}</span>
                      <span>-</span>
                      <span>{item.endDate}</span>
                    </p> */}
                        <p className="content-item-time-start-end">
                          <span>{item.startDate}</span>
                          <span>-</span>
                          <span>{item.endDate}</span>
                        </p>
                      </div>
                      <div className="content-item-action">
                        <Dropdown
                          trigger={["click"]}
                          menu={{ items: itemsDropdown }}
                        >
                          <button>
                            <img src={iconSetting} alt="" />
                          </button>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                );
              }}
              title="Education"
            />
            <StudentProfileDetails
              handleAddNew={() => {
                setState({
                  typeModal: "add-career-history",
                  openModalAddProfileDetail: true,
                  titleModal: "Add career history",
                });
              }}
              items={careerHistory}
              renderItem={(item, index) => {
                return (
                  <div
                    className="student-profile-detail-content-item"
                    key={index}
                  >
                    <div className="content-item-logo">
                      <img src={avatarStudent} width={56} height={56} alt="" />
                    </div>
                    <div className="content-item-text">
                      <div>
                        <h4>{item.position}</h4>
                        <p className="content-item-text-location">
                          {item.company}
                        </p>
                        {/* <p className="content-item-text-applicant">
                      <span>{item.startDate}</span>
                      <span>-</span>
                      <span>{item.endDate}</span>
                    </p> */}
                        <p className="content-item-time-start-end">
                          <span>{item.startDate}</span>
                          <span>-</span>
                          <span>{item.endDate}</span>
                        </p>
                      </div>
                      <div className="content-item-action">
                        <Dropdown
                          trigger={["click"]}
                          menu={{ items: itemsDropdown }}
                        >
                          <button>
                            <img src={iconSetting} alt="" />
                          </button>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                );
              }}
              title="Career history"
            />
            <StudentProfileDetails
              handleAddNew={() => {
                setState({
                  typeModal: "add-certificates",
                  openModalAddProfileDetail: true,
                  titleModal: "Add Certificates",
                });
              }}
              items={certificates}
              renderItem={(item, index) => {
                return (
                  <div
                    className="student-profile-detail-content-item"
                    key={index}
                  >
                    <div className="content-item-logo">
                      <img src={avatarStudent} width={56} height={56} alt="" />
                    </div>
                    <div className="content-item-text">
                      <div>
                        <h4>{item.title}</h4>
                        <p className="content-item-text-location">
                          {item.provider}
                        </p>
                        {/* <p className="content-item-text-created-at">
                      <div className="created-at-status">
                        <div className="status-shape"></div>
                        <span>Open</span>
                      </div>
                      <span>1d ago</span>
                    </p> */}
                        {/* <p className="content-item-text-applicant">
                      <span>{item.startDate}</span>
                      <span>-</span>
                      <span>{item.endDate}</span>
                    </p> */}
                        <p className="content-item-time-start-end">
                          <span>Published: {item.publishedDate}</span>
                        </p>
                      </div>
                      <div className="content-item-action">
                        <Dropdown
                          trigger={["click"]}
                          menu={{ items: itemsDropdown }}
                        >
                          <button>
                            <img src={iconSetting} alt="" />
                          </button>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                );
              }}
              title="Certificate"
            />
            <StudentProfileDetails
              handleAddNew={() => {
                setState({
                  typeModal: "add-clubs-and-organizations",
                  openModalAddProfileDetail: true,
                  titleModal: "Add Clubs & Organizations",
                });
              }}
              items={clubsAndOrganizations}
              renderItem={(item, index) => {
                return (
                  <div
                    className="student-profile-detail-content-item"
                    key={index}
                  >
                    <div className="content-item-logo">
                      <img src={avatarStudent} width={56} height={56} alt="" />
                    </div>
                    <div className="content-item-text">
                      <div>
                        <h4>{item.clubName}</h4>
                        <p className="content-item-text-location">
                          {item.position}
                        </p>
                        {/* <p className="content-item-text-created-at">
                      <div className="created-at-status">
                        <div className="status-shape"></div>
                        <span>Open</span>
                      </div>
                      <span>1d ago</span>
                    </p> */}
                        {/* <p className="content-item-text-applicant">
                      <span>{item.startDate}</span>
                      <span>-</span>
                      <span>{item.endDate}</span>
                    </p> */}
                        <p className="content-item-time-start-end">
                          <span>{item.startDate}</span>
                          <span> - </span>
                          <span>{item.endDate}</span>
                        </p>
                      </div>
                      <div className="content-item-action">
                        <Dropdown
                          trigger={["click"]}
                          menu={{ items: itemsDropdown }}
                        >
                          <button>
                            <img src={iconSetting} alt="" />
                          </button>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                );
              }}
              title="Club & Organization"
            />
            <StudentProfileDetails
              handleAddNew={() => {
                setState({
                  typeModal: "add-volunteer-work",
                  openModalAddProfileDetail: true,
                  titleModal: "Add Volunteer Work",
                });
              }}
              items={volunteerWork}
              renderItem={(item, index) => {
                return (
                  <div
                    className="student-profile-detail-content-item"
                    key={index}
                  >
                    <div className="content-item-logo">
                      <img src={avatarStudent} width={56} height={56} alt="" />
                    </div>
                    <div className="content-item-text">
                      <div>
                        <h4>{item.organization}</h4>
                        <p className="content-item-text-location">
                          {item.role}
                        </p>

                        <p className="content-item-time-start-end">
                          <span>{item.startDate}</span>
                          <span> - </span>
                          <span>{item.endDate}</span>
                          <span>({item.frequency})</span>
                        </p>
                      </div>
                      <div className="content-item-action">
                        <Dropdown
                          trigger={["click"]}
                          menu={{ items: itemsDropdown }}
                        >
                          <button>
                            <img src={iconSetting} alt="" />
                          </button>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                );
              }}
              title="Volunteer Work"
            />
          </div>
        </div>
      </div>
      <ModalComponent
        onCancel={() => {
          setState({ openModalAddProfileDetail: false });
        }}
        footer={
          <div className="footer-status-post">
            <ButtonComponent
              onClick={() => {
                setState({ openModalAddProfileDetail: false });
              }}
              className="btn-edit-cancel"
              title="Cancel"
            />
            <ButtonComponent className="btn-edit-save" title="Save" />
          </div>
        }
        title={state.titleModal}
        className="modal-add-profile-detail"
        children={handleRenderFormModal()}
        open={state.openModalAddProfileDetail}
      />
    </>
  );
};

export default StudentProfile;
