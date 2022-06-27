import Logo from "../../img/logo.svg";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import BoardItem from "./Components/BoardItem";
import axios from "axios";
import { useState, useEffect } from "react";
import { changeBoardData } from "../../store";

const BoardPage = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [boardTitle, setBoardTitle] = useState({ title: "" });
  let boardData = useSelector((state) => {
    return state.boardData;
  });
  let userEmail = useSelector((state) => {
    return state.email;
  });
  let accessToken = useSelector((state) => {
    return state.token;
  });
  const handleAddClick = (e) => {
    setToggle(!toggle);
  };
  const onChange = (e) => {
    setBoardTitle({ ...boardTitle, [e.target.name]: e.target.value });
    console.log(boardTitle);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(boardTitle);
    console.log(accessToken);
    axios
      .post("http://localhost:3010/boards", { headers: { Authorization: `Bearer ${accessToken}` }, boardTitle })
      .then((res) => {
        console.log("포스트성공", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3010/boards", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("가져오기성공", res);
        if (res.status === 200) {
          const data = res.data;
          const dataList = data.list;
          dispatch(changeBoardData(dataList));
          console.log("보드데이터", boardData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <img className="logo" src={Logo} alt="logo!" />
        <div>
          <h2 className="title">{userEmail}'s WORKSPACES</h2>
        </div>
        <div className="boardBox">
          {boardData.map((item) => {
            console.log("보드데이터", boardData);
            return <BoardItem item={item} key={item.id} />;
          })}

          {toggle === true ? (
            <button className="addBoardBtn" onClick={handleAddClick}>
              <div>⊕</div>
            </button>
          ) : (
            <div className="boardItem">
              <div className="navyLine"></div>
              <form typeof="submit" className="boardAddSubmit" onSubmit={onSubmit}>
                <input className="boardAddInput" onChange={onChange} name="title" value={boardTitle.title}></input>
                <button type="submit" className="enterBtn">
                  Enter!
                </button>
              </form>
              <div className="boardTitle"></div>
            </div>
          )}
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
