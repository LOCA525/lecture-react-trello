import Logo from "../../img/logo.svg";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { changeBoardData, RootState } from "../../store";
import { GoPerson } from "react-icons/go";

import { useNavigate } from "react-router-dom";
import BoardItem from "../../components/BoardItem/BoardItem";
const BoardsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [render, setRender] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [boardTitle, setBoardTitle] = useState({ title: "" });
  let boardData = useSelector((state: RootState) => {
    return state.boardData;
  });
  let userEmail = useSelector((state: RootState) => {
    return state.email;
  });

  const handleAddClick = (e: any) => {
    setToggle(!toggle);
  };
  const onChange = (e: any) => {
    setBoardTitle({ title: e.target.value });
  };
  const onSubmit = (e: any) => {
    const titleValue = boardTitle.title;
    console.log("밸류값", boardTitle);
    if (titleValue !== null && titleValue !== "" && boardTitle !== null) {
      console.log(titleValue);
      const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);

      e.preventDefault();
      setToggle(!toggle);
      axios
        .post("http://localhost:3010/boards", boardTitle, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log("포스트성공", res);
          const data = res.data;
          const NewBoardData = data.item;

          console.log("새보드데이터", NewBoardData);
          setBoardTitle({ title: "" });
        })
        .catch((err) => {
          console.log(err);
        });

      console.log("보드타이틀!!!!!", boardTitle);
    } else {
      alert("내용을 입력하세요.");
    }
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);

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
        if (err.response.status) {
          navigate("/login");
        }
      });
  }, [toggle, render]);

  return (
    <div>
      <div className="container">
        <img className="logo" src={Logo} alt="logo!" />
        <div>
          <h2 className="title">
            <GoPerson />
            {userEmail}'s WORKSPACES
          </h2>
        </div>
        <div className="boardBox">
          {boardData.map((item: any) => {
            return (
              <BoardItem
                item={item}
                key={item.id}
                render={render}
                setRender={setRender}
                onChange={onChange}
                boardTitle={boardTitle}
                setBoardTitle={setBoardTitle}
              />
            );
          })}

          {toggle === true ? (
            <button className="addBoardBtn" onClick={handleAddClick}>
              <div>⊕</div>
            </button>
          ) : (
            <div className="boardItem">
              <div className="navyLine"></div>
              <form typeof="submit" className="boardAddSubmit" onSubmit={onSubmit}>
                <input
                  className="boardAddInput"
                  onChange={onChange}
                  onBlur={() => {
                    setToggle(true);
                    setBoardTitle({ title: "" });
                  }}
                  name="title"
                  value={boardTitle.title}
                  autoFocus
                />
                <button
                  type="submit"
                  className="enterBtn"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
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

export default BoardsPage;
