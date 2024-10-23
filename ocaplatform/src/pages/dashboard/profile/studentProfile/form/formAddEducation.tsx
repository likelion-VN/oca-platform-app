import InputPrefix from "../../../../../components/input/inputPrefix/inputPrefix";

const FormAddEducation = () => {
  return (
    <div>
      <div className="field">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="School name"
        />
      </div>
      <div className="field">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="School name"
        />
      </div>
      <div className="field">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="School name"
        />
      </div>
      <div className="double-field">
        <InputPrefix
          type="date-pick-month"
          placeholder="Ex. Boston University"
          title="Start date"
        />
        <InputPrefix
          type="date-pick-month"
          placeholder="Ex. Boston University"
          title="End date(or expected)"
        />
      </div>
      <div className="field-optional">
        <InputPrefix
          type="input"
          placeholder="Ex. Boston University"
          title="School name"
        />
      </div>
      <div className="field-optional">
        <InputPrefix
          type="text-area"
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Ex. Boston University"
          title="School name"
        />
      </div>
    </div>
  );
};

export default FormAddEducation;
