import { Tabs, Upload, type TabsProps } from "antd";
import "./editProfileView.scss";
import ButtonComponent from "../../../../components/button/button";
import iconLinkedin from "./../../../../assets/demoStatic/iconLinkedin.png";
import avatarUpload from "./../../../../assets/demoStatic/Avatars.png";
import demoBackgroundPhoto from "./../../../../assets/demoStatic/demoBackground.png";
import InputPrefix from "../../../../components/input/inputPrefix/inputPrefix";
import avatarCompany from "./../../../../assets/demoStatic/avatar.png";
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Company profile",
    children: (
      <div className="edit-company-profile-content">
        <div>
          <h4>Sync your Linkedin</h4>
          <ButtonComponent
            title="Continue with Linkedin"
            icon={<img src={iconLinkedin} />}
            className="btn-continue-linkedin"
          />
          <p>Sync with Linkedln to automatically autofill your information.</p>
        </div>
        <div>
          <h4>Profile photo</h4>
          <Upload name="profile" className="profile-photo-upload">
            <img src={avatarUpload} alt="" width={80} height={80} />
          </Upload>
          <b>Upload photo</b>
          <p>JPG, GIF or PNG. Max size of 800K</p>
        </div>
        <div>
          <h4>Background photo</h4>
          <Upload name="profile" className="profile-photo-upload">
            <img src={demoBackgroundPhoto} alt="" width={200} />
          </Upload>
          <b>Upload photo</b>
          <p>JPG, GIF or PNG. Max size of 800K</p>
        </div>
        <div>
          <InputPrefix
            type="input"
            placeholder="Enter your company name"
            title="Company name"
          />
        </div>
        <div className="field-description">
          <InputPrefix
            type="input"
            placeholder="Type a industry and press Enter to create a tag. "
            title="Industry"
          />
          <p>Use hashtags (#) for specific industries (e.g., #Banking).</p>
        </div>
        <div>
          <InputPrefix
            type="input"
            title="One line profile"
            placeholder="Enter a brief description or tagline..."
          />
        </div>
        <div>
          <InputPrefix
            title="About the job"
            placeholder="Enter a description..."
            autoSize={{ minRows: 5, maxRows: 8 }}
            type="text-area"
          />
        </div>
        <InputPrefix
          title="Status"
          type="select-normal"
          placeholder="Select your status"
        />
        <InputPrefix
          title="Company size"
          type="select-normal"
          placeholder="Select the number of employees"
        />
        <InputPrefix
          title="Address (city name)"
          type="select-normal"
          placeholder="Enter your company's address"
        />
        <InputPrefix
          type="input"
          title="Website"
          placeholder="www.example.com"
        />
        <p className="noticed">*This info will be visible on your profile</p>
      </div>
    ),
  },
  {
    key: "2",
    label: "Customize tags",
    children: (
      <div className="edit-company-profile-content">
        <div className="field-description">
          <InputPrefix type="select-mutiple" title="Company Culture" />
          <p>Use hashtags (#) for specific roles.(e.g., #Product Manager)</p>
        </div>
        <div className="field-description">
          <InputPrefix type="select-mutiple" title="Languages" />
          <p>Use hashtags (#) for specific roles.(e.g., #Product Manager)</p>
        </div>
        <div className="field-description">
          <InputPrefix type="select-mutiple" title="Focus Areas" />
          <p>Use hashtags (#) for specific topics.(e.g., #Cybersecurity)</p>
        </div>
      </div>
    ),
  },
  {
    key: "3",
    label: "Job posting",
    children: (
      <div className="edit-company-profile-content">
        <p className="total-job-posting">34 Job posting</p>
        <div className="list-job-posting">
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
                  <ButtonComponent
                    className="btn-delete-action"
                    title="Delete"
                  />
                  <ButtonComponent
                    className="btn-reopen-action"
                    title="Reopen"
                  />
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
                  <ButtonComponent
                    className="btn-delete-action"
                    title="Delete"
                  />
                  <ButtonComponent
                    className="btn-reopen-action"
                    title="Reopen"
                  />
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
                  <ButtonComponent
                    className="btn-delete-action"
                    title="Delete"
                  />
                  <ButtonComponent
                    className="btn-reopen-action"
                    title="Reopen"
                  />
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
                  <ButtonComponent
                    className="btn-delete-action"
                    title="Delete"
                  />
                  <ButtonComponent
                    className="btn-reopen-action"
                    title="Reopen"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const EditProfileView = () => {
  return (
    <div>
      <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
    </div>
  );
};

export default EditProfileView;
