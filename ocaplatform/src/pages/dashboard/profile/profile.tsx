import "./profile.s.scss";

import ProfileCompanyView from "./companyProfile/profileCompanyView";
interface IPropsProfile {
  // isActive: boolean;
}

const Profile: React.FC<IPropsProfile> = () => {
  return <ProfileCompanyView />;
};

export default Profile;
