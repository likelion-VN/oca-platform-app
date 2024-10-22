import { Collapse, CollapseProps, Dropdown, MenuProps, Tag } from "antd";
import ButtonComponent from "../../../../components/button/button";
import avatarStudent from "./../../../../assets/demoStatic/avatar.png";
import bannerStudentHeader from "./../../../../assets/demoStatic/banner.png";
import bellCompany from "./../../../../assets/demoStatic/BellRinging.png";
import iconCloseJob from "./../../../../assets/demoStatic/closeJob.png";
import iconDelete from "./../../../../assets/demoStatic/delete.png";
import iconEdit from "./../../../../assets/demoStatic/edit.png";
import iconEditCircle from "./../../../../assets/demoStatic/editCircle.png";
import iconSetting from "./../../../../assets/demoStatic/setting.png";
import "./studentProfile.scss";

const itemsDropdown: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className="job-posting-setting-action">
        <button>
          <img src={iconCloseJob} alt="" />
          <span>Close job</span>
        </button>
        <button className="btn-delete-job-posting">
          <img src={iconDelete} alt="" />
          <span>Delete job</span>
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

const StudentProfile = () => {
  return (
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irureng ikim
                dolor in sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
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
        <div className="student-education student-wrapper-more-info">
          <div className="student-education-title">
            <h3>Education</h3>
            <button className="btn-posting-edit">
              <img src={iconEditCircle} alt="" />
            </button>
          </div>
          <div className="student-education-content">
            <div className="student-education-content-item">
              <div className="content-item-logo">
                <img src={avatarStudent} width={56} height={56} alt="" />
              </div>
              <div className="content-item-text">
                <div>
                  <h4>Full Stack Software Development Internship</h4>
                  <p className="content-item-text-location">San Jose, CA</p>
                  <p className="content-item-text-created-at">
                    <div className="created-at-status">
                      <div className="status-shape"></div>
                      <span>Open</span>
                    </div>
                    <span>1d ago</span>
                  </p>
                  <p className="content-item-text-applicant">0 applicants</p>
                </div>
                <div className="content-item-action">
                  <Dropdown trigger={["click"]} menu={{ items: itemsDropdown }}>
                    <button>
                      <img src={iconSetting} alt="" />
                    </button>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
