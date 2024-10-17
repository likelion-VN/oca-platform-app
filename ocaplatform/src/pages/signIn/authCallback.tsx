import { useEffect } from "react";

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));

    const allParams: { [key: string]: string | null } = {};
    
    params.forEach((value, key) => {
      allParams[key] = decodeURIComponent(value);
    });

    console.log('test', allParams)

    if (allParams.access_token) {
      window.opener?.postMessage(
        { params: allParams },
        window.location.origin
      );
    }
    // window.close();
  }, []);

  return <div>Processing authentication...</div>;
};

export default AuthCallback; 
