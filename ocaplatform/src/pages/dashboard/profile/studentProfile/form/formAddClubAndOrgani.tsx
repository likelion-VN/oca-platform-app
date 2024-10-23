import InputPrefix from "../../../../../components/input/inputPrefix/inputPrefix";

const FormAddClubAndOrgani = () => {
  return (
    <div>
      <div className="field">
        <InputPrefix
          title="Club name"
          placeholder="Enter club/organization name"
          type="input"
        />
      </div>
      <div className="field-optional">
        <InputPrefix
          title="Role (Optional)"
          placeholder="Enter your role"
          type="input"
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
          type="text-area"
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Ex. Boston University"
          title="Description (Optional)"
        />
      </div>
    </div>
  );
};

export default FormAddClubAndOrgani;
