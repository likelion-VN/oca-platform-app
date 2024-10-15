import { useEffect } from "react";

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");

    const allCookies: { [key: string]: string } = {};

    const cookies = document.cookie.split("; ");
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      allCookies[name] = decodeURIComponent(value);
    });

    if (token) {
      window.opener?.postMessage({ token, cookies: allCookies }, window.location.origin);
    }
    window.close();
  }, []);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
