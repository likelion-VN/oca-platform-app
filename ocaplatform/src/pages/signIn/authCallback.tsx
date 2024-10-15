import { useEffect } from "react";

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const allCookies: { [key: string]: string } = {};

    const cookies = document.cookie.split("; ");
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      allCookies[name] = decodeURIComponent(value);
    });
    console.log('test', allCookies)

    // if (token) {
      window.opener?.postMessage({ cookies: allCookies }, window.location.origin);
    // }
    // window.close();
  }, []);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
