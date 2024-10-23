import InputPrefix from "../../../../../components/input/inputPrefix/inputPrefix";

const FormAddVolunteerWork = () => {
  return (
    <div>
      <div className="field">
        <InputPrefix
          title="Volunteer organization name"
          placeholder="Ex. Animal Shelter Los Angeles"
          type="input"
        />
      </div>
      <div className="field">
        <InputPrefix
          title="Role (Optional)"
          placeholder="Ex. Volunteer Coordinator"
          type="input"
        />
      </div>
      <div className="double-field">
        <InputPrefix
          type="date-pick-month"
          placeholder="MM/YYYY"
          title="Start date"
        />
        <InputPrefix
          type="date-pick-month"
          placeholder="MM/YYYY"
          title="End date(or expected)"
        />
      </div>
      <div className="field-optional">
        <InputPrefix
          title="Frequency (Optional)"
          placeholder="Ex. 10"
          type="input"
        />
      </div>
      <div className="field-optional">
        <InputPrefix
          type="text-area"
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Describe your volunteer work (e.g., activities, impact, number of people helped)"
          title="Description (Optional)"
        />
      </div>
    </div>
  );
};

export default FormAddVolunteerWork;
