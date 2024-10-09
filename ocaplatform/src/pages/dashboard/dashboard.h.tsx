export const renderStatus = (status: number) => {
  switch (status) {
    case 1:
      return <div className="status-tag applied">Applied</div>;
    case 2:
      return <div className="status-tag in-progress">In Progress</div>;
    case 3:
      return <div className="status-tag accepted">Accepted</div>;
    case 4:
      return <div className="status-tag declined">Declined</div>;
    default:
      return <div className="status-tag canceled">Canceled</div>;
  }
};

export const renderStatusDetail = (status: number) => {
  switch (status) {
    case 1:
      return <div className="status-tag applied-border">Applied</div>;
    case 2:
      return <div className="status-tag in-progress-border">In Progress</div>;
    case 3:
      return <div className="status-tag accepted-border">Accepted</div>;
    case 4:
      return <div className="status-tag declined-border">Declined</div>;
    default:
      return <div className="status-tag canceled-border">Canceled</div>;
  }
};

export const renderStatusTitle = (status: number) => {
  switch (status) {
    case 1:
      return "Submitted application";
    case 2:
      return "Check the Email";
    case 3:
      return "Congratulation!";
    case 4:
      return "Let’s find other opportunities!";
    default:
      return "Position no longer available";
  }
};

export const renderStatusDescription = (status: number) => {
  switch (status) {
    case 1:
      return "You submitted application successfully. Now we are waiting for the company starting reviewing.";
    case 2:
      return "The company has sent you a message. Please check your registered email.";
    case 3:
      return "The company has accepted your application. You will receive an email with details, including the offer letter, the process of the O-CA Program, and more.";
    case 4:
      return "Don't be upset that things didn't work out this time. It’s not because you weren’t good enough, but simply because it wasn’t the right fit. Shall we try again?";
    default:
      return "The company has closed this position, so your application is no longer being considered. We appreciate your interest!";
  }
};
