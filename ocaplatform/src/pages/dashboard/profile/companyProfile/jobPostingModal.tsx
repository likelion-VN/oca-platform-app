import React from "react";
import InputPrefix from "../../../../components/input/inputPrefix/inputPrefix";
import "./jobPostingModal.scss";
import { Checkbox } from "antd";
type Props = {};

const JobPostingModal = (props: Props) => {
  return (
    <div className="form-create-job-posting">
      <form>
        <InputPrefix
          type="input"
          title="Job Title"
          placeholder="Enter job title"
          subTitle={<Checkbox>Negotiable</Checkbox>}
        />
        <InputPrefix
          type="input"
          title="Job Title"
          placeholder="Enter job title"
        />
        <div className="double-input">
          <InputPrefix
            title="Start working date"
            type="date"
            subTitle={<Checkbox>Negotiable</Checkbox>}
          />
          <InputPrefix
            title="End working date"
            type="date"
            subTitle={<Checkbox>Negotiable</Checkbox>}
          />
        </div>
        <div className="double-input">
          <InputPrefix
            title="Workplace type"
            type="date"
            subTitle={<Checkbox>Negotiable</Checkbox>}
          />
          <InputPrefix
            title="Hours per week"
            type="date"
            subTitle={<Checkbox>Negotiable</Checkbox>}
          />
        </div>
        <InputPrefix
          title="Task"
          type="text-area-input"
          subTitle={<Checkbox>Negotiable</Checkbox>}
        />
        <InputPrefix title="About the job" type="text-area-input" />
      </form>
    </div>
  );
};

export default JobPostingModal;
