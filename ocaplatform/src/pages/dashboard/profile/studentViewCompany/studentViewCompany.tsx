import { useState } from "react";
import { Link } from "react-router-dom";
import arrowLeft from "./../../../../assets/demoStatic/arrowLeft.png";
import "./studentViewCompany.scss";
import { Collapse, CollapseProps } from "antd";
import ButtonComponent from "../../../../components/button/button";
import bannerCompanyHeader from "./../../../../assets/demoStatic/banner.png";
import avatarCompany from "./../../../../assets/demoStatic/avatar.png";
import bellCompany from "./../../../../assets/demoStatic/BellRinging.png";
import iconOpenLink from "./../../../../assets/demoStatic/iconOpenLink.png";
import iconEdit from "./../../../../assets/demoStatic/edit.png";
import iconSendEmail from "./../../../../assets/demoStatic/iconSendEmail.png";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Company Culture",
    children: <p>abc</p>,
  },
  {
    key: "2",
    label: "Languages",
    children: <p>abc</p>,
  },
  {
    key: "3",
    label: "Focus Areas",
    children: <p>abc</p>,
  },
];

const StudentViewCompany = () => {
  const [state, setState] = useState({});
  return (
    <div className="student-view-company-profile">
      <div className="back-to-profile-company">
        <Link to="/">
          <img src={arrowLeft} width={24} alt="" />
          <span>Company profile</span>
        </Link>
      </div>
      <div className="company-profile-view-user">
        <div className="company-information">
          {/* company header */}
          <div className="company-header">
            <div className="company-header-banner">
              <img className="img-banner" src={bannerCompanyHeader} alt="" />
            </div>
            <div className="company-header-text">
              <div className="company-header-avatar">
                <img src={avatarCompany} alt="" />
              </div>
              <div className="company-header-name">
                <h4>likelion us</h4>
                <button className="company-header-status">
                  <img src={bellCompany} alt="" />
                  <span>Now hiring</span>
                </button>
              </div>
              <div className="company-header-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="company-header-meta-info">
                <span>Information Technology & Services</span>
                <ul>
                  <li>Berkeley City</li>
                  <li>51-200 employees</li>
                </ul>
              </div>
              <div className="company-header-action-button">
                <ButtonComponent
                  className="btn-send-email"
                  // onClick={handleShowModalCreateJob}
                  title="Send email"
                  iconPosition="end"
                  icon={<img width={20} src={iconSendEmail} />}
                />
                <ButtonComponent
                  className="btn-open-link"
                  title="Visit website"
                  iconPosition="end"
                  icon={<img width={20} src={iconOpenLink} />}
                />
              </div>
            </div>
          </div>
          {/* CompanyDetails  */}
          <div className="company-detail">
            <div className="company-detail-about">
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
            <div className="company-detail-website">
              <h5>Website</h5>
              <p>
                <a href="#">https://www.companyname.co</a>
              </p>
            </div>
            <div className="company-detail-size">
              <h5>Company size</h5>
              <p>150-200 employees</p>
            </div>
            <div className="company-detail-address">
              <h5>Address</h5>
              <p>Berkeley City</p>
            </div>
          </div>
          <Collapse
            className="company-detail-collapse"
            expandIcon={() => {
              return null;
            }}
            expandIconPosition="end"
            accordion
            items={items}
          />
        </div>
        <div className="company-job-posting">
          <div className="company-job-posting-title">
            <h3>Recent Job Openings</h3>
          </div>
          <div className="company-job-posting-content">
            <div className="company-job-posting-content-item">
              <div className="content-item-logo">
                <img src={avatarCompany} width={56} height={56} alt="" />
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
              </div>
            </div>
            <div className="company-job-posting-content-item">
              <div className="content-item-logo">
                <img src={avatarCompany} width={56} height={56} alt="" />
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
              </div>
            </div>
            <div className="company-job-posting-content-item">
              <div className="content-item-logo">
                <img src={avatarCompany} width={56} height={56} alt="" />
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
              </div>
            </div>
            <div className="company-job-posting-content-item">
              <div className="content-item-logo">
                <img src={avatarCompany} width={56} height={56} alt="" />
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
              </div>
            </div>
            <div className="company-job-posting-content-item">
              <div className="content-item-logo">
                <img src={avatarCompany} width={56} height={56} alt="" />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewCompany;
