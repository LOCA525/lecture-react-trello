import "./style.css";
import { useSelector } from "react-redux";

const Nav = ({ boardData }) => {
  let userEmail = useSelector((state) => {
    return state.email;
  });
  return (
    <div className="Nav">
      <div className="title">
        Trello
        <div className="userName">{userEmail}</div>
      </div>
      <div className="mainBoard">MainBoard</div>
    </div>
  );
};

export default Nav;
