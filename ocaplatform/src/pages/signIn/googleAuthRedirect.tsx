import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./GoogleAuthRedirect.s.scss";

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.slice(1));
      const accessToken = params.get('access_token');
      console.log('test', accessToken)

      if (accessToken) {
        document.cookie = `j_user_token=${accessToken}; path=/; secure; SameSite=Strict`;

        // fetch('https://www.googleapis.com/userinfo/v2/me', {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // })
        // .then(response => response.json())
        // .then(user => {
        //   // Handle user data
        // });

        navigate("/");
      } else {
        console.error('Access token not found');
      }
    }
  }, [navigate]);

  return (
    <div>
      <h2>Redirecting...</h2>
      <p>Please wait while we log you in.</p>
    </div>
  );
};

export default GoogleAuthRedirect;
