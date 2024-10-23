import InputPrefix from "../../../../components/input/inputPrefix/inputPrefix";
import "./modalAddTagCompany.scss";
// import { SelectProps, Tag } from "antd";
// import { OptionProps } from "antd/es/select";
import { Option } from "../../../../interfaces";

type Props = {
  listOption: Option[] | [];
  handleSelectCompanyCulture: (value: string[]) => void;
  titleMultipleSelect: string;
  placeholder: string;
  onChange: () => void;
  tagRender: (props: any) => React.ReactElement;
};

const ModalAddTagCompany = ({
  listOption,
  // handleSelectCompanyCulture,
  titleMultipleSelect,
  onChange,
  placeholder,
  tagRender,
}: Props) => {
  return (
    <div>
      <p>These tags will help showcase your company's culture.</p>
      <InputPrefix
        tagRender={tagRender}
        classNameCustom="select-add-tag-company-culture"
        options={listOption}
        filterOption={(inputValue, option) =>
          (option?.label ?? "").toLowerCase().includes(inputValue.toLowerCase())
        }
        onChange={onChange}
        type="select-multiple"
        title={titleMultipleSelect}
        placeholder={placeholder}
      />
      <p>Use hashtags (#) for specific roles.(e.g., #Product Manager)</p>
    </div>
  );
};

export default ModalAddTagCompany;
