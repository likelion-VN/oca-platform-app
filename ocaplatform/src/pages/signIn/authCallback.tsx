import _ from "lodash";
import { useEffect } from "react";

interface ParsedUrlParams {
  [key: string]: string | null;
}

const AuthCallback: React.FC = () => {
  const parseUrl = (url: string): ParsedUrlParams => {
    const urlObj = new URL(url);

    const params: ParsedUrlParams = {};

    urlObj.searchParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value);
    });

    return params;
  };

  useEffect(() => {
    const allParams = parseUrl(window.location.href);

    if (!_.isEmpty(allParams)) {
      window.opener?.postMessage({ params: allParams }, window.location.origin);
    }
    window.close();
  }, []);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
