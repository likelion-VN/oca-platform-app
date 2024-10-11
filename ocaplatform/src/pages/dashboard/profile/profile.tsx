
import './profile.s.scss';

interface IPropsProfile {
    isActive: boolean
}

const Profile: React.FC<IPropsProfile> = ({ isActive }) => {
  return (
    <div>test{isActive}</div>
  )
}

export default Profile;
