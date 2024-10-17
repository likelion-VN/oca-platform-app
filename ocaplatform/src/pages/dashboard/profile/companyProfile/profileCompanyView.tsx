import bannerCompanyHeader from "./../../../../assets/demoStatic/banner.png";
import avatarCompany from "./../../../../assets/demoStatic/avatar.png";
import bellCompany from "./../../../../assets/demoStatic/BellRinging.png";
import ButtonComponent from "../../../../components/button/button";
import iconPlus from "./../../../../assets/demoStatic/plus.png";
import iconEdit from "./../../../../assets/demoStatic/edit.png";
import iconPlusCircle from "./../../../../assets/demoStatic/plusCircle.png";
import iconEditCircle from "./../../../../assets/demoStatic/editCircle.png";
import iconSetting from "./../../../../assets/demoStatic/setting.png";
import arrowRight from "./../../../../assets/demoStatic/ArrowRight.png";
import iconCloseJob from "./../../../../assets/demoStatic/closeJob.png";
import iconDelete from "./../../../../assets/demoStatic/delete.png";
import { Collapse, CollapseProps, Dropdown, MenuProps } from "antd";
import ModalComponent from "../../../../components/modal/modal";
import JobPostingModal from "./jobPostingModal";
import useMergeState from "../../../../utils/customHook/useMergeState";

type Props = {};

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

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Company Culture",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "Languages",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "Focus Areas",
    children: <p>{text}</p>,
  },
];

const ProfileCompanyView = (props: Props) => {
  const [state, setState] = useMergeState({
    openCreateJobModal: true,
  });
  return (
    <>
      <div className="company-profile">
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
                  className="btn-post-job"
                  title="Post a job"
                  iconPosition="end"
                  icon={<img src={iconPlus} />}
                />
                <ButtonComponent
                  className="btn-edit-profile"
                  title="Edit profile"
                  iconPosition="end"
                  icon={<img src={iconEdit} />}
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
            expandIcon={({ isActive }) => {
              return <img src={iconPlusCircle} />;
            }}
            expandIconPosition="end"
            accordion
            items={items}
          />
        </div>
        {/* JobPostings */}
        <div className="company-job-posting">
          <div className="company-job-posting-title">
            <h3>Job postings</h3>
            <button className="btn-posting-edit">
              <img src={iconEditCircle} alt="" />
            </button>
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
                <div className="content-item-action">
                  <Dropdown trigger={["click"]} menu={{ items: itemsDropdown }}>
                    <button>
                      <img src={iconSetting} alt="" />
                    </button>
                  </Dropdown>
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
                <div className="content-item-action">
                  <Dropdown trigger={["click"]} menu={{ items: itemsDropdown }}>
                    <button>
                      <img src={iconSetting} alt="" />
                    </button>
                  </Dropdown>
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
                <div className="content-item-action">
                  <Dropdown trigger={["click"]} menu={{ items: itemsDropdown }}>
                    <button>
                      <img src={iconSetting} alt="" />
                    </button>
                  </Dropdown>
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
                <div className="content-item-action">
                  <Dropdown trigger={["click"]} menu={{ items: itemsDropdown }}>
                    <button>
                      <img src={iconSetting} alt="" />
                    </button>
                  </Dropdown>
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
          <div className="company-job-posting-show-all">
            <button>
              Show all job{" "}
              <span>
                <img src={arrowRight} alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <ModalComponent
        title={
          <div
            style={{ textAlign: "center", fontSize: "20px", fontWeight: 600 }}
          >
            Create a job posting
          </div>
        }
        centered
        footer={
          <div>
            <ButtonComponent
              className="btn-create-posting-cancel"
              title="Cancel"
            />
            <ButtonComponent className="btn-create-posting-send" title="Send" />
          </div>
        }
        className="modal-form-create-job-posting"
        open={state.openCreateJobModal}
        children={<JobPostingModal />}
      />
    </>
  );
};

export default ProfileCompanyView;
