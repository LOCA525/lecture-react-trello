import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DefaultHeader = () => {
  const navigate = useNavigate();
  let userEmail = useSelector((state) => {
    return state.email;
  });
  return (
    <div className="Nav">
      <img
        src="	https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif"
        alt="logo"
        className="navLogo"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default DefaultHeader;
