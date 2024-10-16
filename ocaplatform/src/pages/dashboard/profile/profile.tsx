import "./profile.s.scss";
import bannerCompanyHeader from "./../../../assets/demoStatic/banner.png";
import avatarCompany from "./../../../assets/demoStatic/avatar.png";
import bellCompany from "./../../../assets/demoStatic/BellRinging.png";
import ButtonComponent from "../../../components/button/button";
import iconPlus from "./../../../assets/demoStatic/plus.png";
import iconEdit from "./../../../assets/demoStatic/edit.png";
interface IPropsProfile {
  isActive: boolean;
}

const Profile: React.FC<IPropsProfile> = () => {
  return (
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                voluptatum.
              </p>
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
        <div className="company-detail"></div>
      </div>
      {/* JobPostings */}
      <div className="company-job-posting"></div>
    </div>
  );
};

export default Profile;
