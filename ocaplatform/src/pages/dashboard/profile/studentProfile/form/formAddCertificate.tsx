import InputPrefix from "../../../../../components/input/inputPrefix/inputPrefix";

const FormAddCertificate = () => {
  return (
    <div>
      <div className="field">
        <InputPrefix
          title="Certificate Name"
          placeholder="Enter certificate name"
          type="input"
        />
      </div>
      <div className="field-optional">
        <InputPrefix
          title="Issuing organization (Optional)"
          placeholder="Enter issued by"
          type="input"
        />
      </div>
      <div className="double-field">
        <InputPrefix
          type="date-pick-month"
          placeholder="Ex. Boston University"
          title="Issue date"
        />
        <InputPrefix
          classNameTitle="optional"
          type="date-pick-month"
          placeholder="Ex. Boston University"
          title="Expiration date (Optional)"
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

export default FormAddCertificate;
