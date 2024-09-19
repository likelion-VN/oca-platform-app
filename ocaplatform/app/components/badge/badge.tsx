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
    <span className="badge">
        {title}
    </span>
  );
};

export default Badge;
