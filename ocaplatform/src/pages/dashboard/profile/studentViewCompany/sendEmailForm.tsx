import { Button, Tooltip, Upload } from "antd";
import iconQuestionCircle from "./../../../../assets/demoStatic/iconQuestionCircle.png";
import InputPrefix from "../../../../components/input/inputPrefix/inputPrefix";
import { UploadOutlined } from "@ant-design/icons";
import "./sendEmailForm.scss";
type Props = {};

const SendEmailForm = (props: Props) => {
  return (
    <div>
      <p className="sumary">
        Use this form to send a direct inquiry to [Company Name].
        <Tooltip
          placement="bottom"
          title="You can choose a subject like 'Job Inquiry' or 'Interested in a Coffee Chat,' customize your message, and optionally attach your resume. Press 'Send Email' to complete your submission."
        >
          <img width={18} src={iconQuestionCircle} alt="" />
        </Tooltip>
      </p>
      <div>
        <div className="field">
          <InputPrefix
            title="Subject"
            type="input"
            placeholder="Job Inquiry from [Your Name] or Interested in a Coffee C"
          />
        </div>
        <div className="field">
          <InputPrefix
            autoSize={{ minRows: 14, maxRows: 20 }}
            title="Message"
            type="text-area"
          />
        </div>
        <div className="field-upload">
          <p>File attachment</p>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload file</Button>
          </Upload>
        </div>
        <div className="field">
          <InputPrefix
            title="Reply-to email address"
            type="input"
            value="Jacodjone@gmail.com"
          />
          <p className="infor-reply">
            The company will send replies to the email address you provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendEmailForm;
