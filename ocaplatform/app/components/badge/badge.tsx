import classNames from "classnames";
import React from "react";
import "./badge.s.scss";

interface IPropsBadge {
  className?: string;
  title: string;
}

const Badge: React.FC<IPropsBadge> = ({
  className,
  title,
}) => {
  return (
    <span className={classNames("badge", className)}>
        {title}
    </span>
  );
};

export default Badge;
