import iconEditCircle from "./../../../../assets/demoStatic/editCircle.png";
import "./studentProfileDetails.scss";
interface IProps<T> {
  title: string;
  handleAddNew: () => void;
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
}

const StudentProfileDetails = <T,>({
  handleAddNew,

  items,
  renderItem,
  title,
}: IProps<T>) => {
  return (
    <div className="student-profile-detail student-wrapper-more-info">
      <div className="student-profile-detail-title">
        <h3>{title}</h3>
        <button onClick={handleAddNew} className="btn-student-detail-edit">
          <img src={iconEditCircle} alt="" />
        </button>
      </div>
      <div className="student-profile-detail-content">
        {items.map((item, index: number) => {
          return renderItem(item, index);
        })}
      </div>
    </div>
  );
};

export default StudentProfileDetails;
