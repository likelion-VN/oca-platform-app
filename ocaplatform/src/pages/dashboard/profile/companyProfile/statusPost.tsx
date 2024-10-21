import React from "react";
import imgStatusSuccess from "./../../../../assets/demoStatic/iconStatusSuccess.png";
import "./statusPost.scss";
type Props = {};

const StatusPost = (props: Props) => {
  return (
    <div>
      <img width={80} height={80} src={imgStatusSuccess} alt="" />
      <h3>Opened!</h3>
      <p>
        The job posting has been successfully opened. This position is now
        accepting applications.
      </p>
    </div>
  );
};

export default StatusPost;
