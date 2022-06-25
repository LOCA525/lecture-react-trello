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

// [{
//   >>>>trelloPage/1
//   boardId: 1,
//   boardTitle: firstBoard ,
//   todoData: [id : 1
//             todoTitle:안녕하세요!
//             todoCard:{id:1 , 할일첫번째 },{id:1, 또다른 할일},{id:1, 세번째할일}

//   ,         id :2
//             TodoTitle:반갑다!
//             todoCard:{id2, 할일이에요}]
//   },

//   {
//     >>>>trelloPage/2
//     boardId: 2,
//     boardTitle: 두번째Board ,
//     todoData: [id : 1
//               todoTitle:오늘뭐할까요!
//               todoCard:{id:1 , 밥먹기 },{id:1, 공부하기},{id:1, 자기}

//     ,         id :2
//               TodoTitle:낼은요!
//               todoCard:{id2, 이거할거임ㅋ}]
//     }

// ];
