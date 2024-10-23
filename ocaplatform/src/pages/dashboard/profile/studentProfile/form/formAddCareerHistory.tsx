import InputPrefix from "../../../../../components/input/inputPrefix/inputPrefix";
import { Checkbox } from "antd";

const FormAddCareerHistory = () => {
  return (
    <div>
      <div className="field">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="Company name"
        />
      </div>
      <div className="field">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="Position"
        />
      </div>
      <div className="field">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="Employment type"
        />
      </div>
      <div className="double-field-with-check">
        <InputPrefix
          type="date-pick-month"
          placeholder="Ex. Boston University"
          title="Start date"
        />
        <InputPrefix
          type="date-pick-month"
          placeholder="Ex. Boston University"
          title="End date"
        />
        <Checkbox>I am currently working in this role</Checkbox>
      </div>
      <div className="field-optional">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="Location (Optional)"
        />
      </div>
      <div className="field-optional">
        <InputPrefix
          type="text-area"
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Ex. Boston University"
          title="Description (Optional)"
        />
      </div>
    </div>
  );
};

export default FormAddCareerHistory;
