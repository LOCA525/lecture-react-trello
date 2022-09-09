import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { changeBoardData, RootState } from "../../store";
import { GoPerson } from "react-icons/go";
import BoardItem from "../../components/BoardItem";
import { HexColorPicker } from "react-colorful";
import { getBoardsApi, postBoardsApi } from "../../api/board";

const BoardsPage = () => {
  const dispatch = useDispatch();
  const boardData = useSelector((state: RootState) => {
    return state.boardData;
  });
  const userEmail = useSelector((state: RootState) => {
    return state.email;
  });

  const [toggle, setToggle] = useState(true);
  const [boardTitle, setBoardTitle] = useState<string>("");

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    const res = await getBoardsApi();
    dispatch(changeBoardData(res.data.list));
  };

  const handleAddClick = (e: any) => {
    setToggle(!toggle);
  };

  const onChange = (e: any) => {
    setBoardTitle(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setToggle(!toggle);
    try {
      if (boardTitle && boardTitle !== "") {
        const res = await postBoardsApi(boardTitle);
        if (res.status === 201) {
          getBoards();
          setBoardTitle("");
        }
      } else {
        alert("내용을 입력하세요.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div>
          <h2 className="title">
            <GoPerson />
            {userEmail}'s WORKSPACES
          </h2>
        </div>
        <div className="boardBox">
          <HexColorPicker />;
          {boardData.map((item: any) => {
            return <BoardItem item={item} key={item.id} />;
          })}
          {toggle ? (
            <button className="addBoardBtn" onClick={handleAddClick}>
              <div>Create new board</div>
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
                    setBoardTitle("");
                  }}
                  name="title"
                  value={boardTitle}
                  autoFocus
                />
                <button
                  type="submit"
                  className="enterBtn"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  Enter
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
