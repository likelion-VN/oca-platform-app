import CheckBoxTooltip from "../../../../components/checkbox/checkBox";
import InputPrefix from "../../../../components/input/inputPrefix/inputPrefix";
import "./jobPostingModal.scss";

const JobPostingModal = () => {
  return (
    <div className="form-create-job-posting">
      <InputPrefix
        type="input"
        title="Job Title"
        placeholder="Enter job title"
        subTitle={
          <CheckBoxTooltip
            tooltipContent="If selected, candidates can make adjustments and submit a revised offer."
            checkBoxContent="Negotiable"
          />
        }
      />
      <InputPrefix
        title="Job Type"
        type="select-normal"
        placeholder="Select job type"
        subTitle={
          <CheckBoxTooltip
            tooltipContent="If selected, candidates can make adjustments and submit a revised offer."
            checkBoxContent="Negotiable"
          />
        }
      />
      <div className="double-input">
        <InputPrefix
          title="Start working date"
          type="date"
          placeholder="MM/DD/YYYY"
          subTitle={
            <CheckBoxTooltip
              tooltipContent="If selected, candidates can make adjustments and submit a revised offer."
              checkBoxContent="Negotiable"
            />
          }
        />
        <InputPrefix
          title="End working date"
          type="date"
          placeholder="MM/DD/YYYY"
          subTitle={
            <CheckBoxTooltip
              tooltipContent="If selected, candidates can make adjustments and submit a revised offer."
              checkBoxContent="Negotiable"
            />
          }
        />
      </div>
      <div className="double-input">
        <InputPrefix
          title="Workplace type"
          type="select-normal"
          placeholder="Select workplace type"
          subTitle={
            <CheckBoxTooltip
              tooltipContent="If selected, candidates can make adjustments and submit a revised offer."
              checkBoxContent="Negotiable"
            />
          }
        />
        <InputPrefix
          title="Hours per week"
          type="input"
          placeholder="Enter number of hours (e.g., 40)"
          subTitle={
            <CheckBoxTooltip
              tooltipContent="If selected, candidates can make adjustments and submit a revised offer."
              checkBoxContent="Negotiable"
            />
          }
        />
      </div>
      <InputPrefix
        title="Task"
        type="text-area"
        value={""}
        placeholder="Enter task details here..."
        autoSize={{ minRows: 5, maxRows: 8 }}
        subTitle={
          <CheckBoxTooltip
            tooltipContent="If selected, candidates can make adjustments and submit a revised offer."
            checkBoxContent="Negotiable"
          />
        }
      />

      <InputPrefix
        title="About the job"
        placeholder="Enter a description..."
        autoSize={{ minRows: 5, maxRows: 8 }}
        type="text-area"
      />
    </div>
  );
};

export default JobPostingModal;
