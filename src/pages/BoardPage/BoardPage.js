import Logo from "../../img/logo.svg";
import "./style.css";
import { useSelector } from "react-redux";
const BoardPage = () => {
  let userEmail = useSelector((state) => {
    return state.email;
  });
  return (
    <div>
      <div className="container">
        <img className="logo" src={Logo} alt="logo!" />
        <div>
          <h2 className="title">{userEmail}'s WORKSPACES</h2>
        </div>
        <div className="boardBox">
          <div className="boardItem">
            <div className="navyLine"></div>
            <div className="boardTitle">예시를 든 보드의 제목 입니다.</div>
          </div>
          <button className="addBoardBtn">
            <div>⊕</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
