import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const location = useLocation();

  const getUrlParameter = (name: string): string | null => {
    let search = location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  const token = getUrlParameter("token");

  const navigate = useNavigate();


  if (token) {
    localStorage.setItem("ACCESS_TOKEN", token);
    navigate("/");
  } else {
    navigate("/login");
  }
  return <></>;
};

export default SocialLogin;
