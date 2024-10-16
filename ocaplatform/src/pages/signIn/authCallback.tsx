import _ from "lodash";
import { useEffect } from "react";

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const allCookies: { [key: string]: string } = {};

    const cookies = document.cookie.split("; ");
    _.forEach(cookies, (cookie) => {
      const [name, value] = cookie.split("=");
      allCookies[name] = decodeURIComponent(value);
    });

    if (!_.isNil(allCookies.j_user_token)) {
      window.opener?.postMessage(
        { cookies: allCookies },
        window.location.origin
      );
    }
    window.close();
  }, []);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
