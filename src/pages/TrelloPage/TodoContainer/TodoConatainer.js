import { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeBoardData } from "../../../store";
import TodoBox from "../TodoBox/TodoBox";
import dragula from "dragula";

const TodoContainer = ({
  render,
  setRender,
  rendering,
  boardData,
  id,
  TitleValue,
  setTitleValue,
  TitleData,
  setTitleData,
}) => {
  function init() {
    dragula([document.querySelector(".todos"), document.querySelector(".todos")]);
  }
  init();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const [toggle, setToggle] = useState(true);

  console.log("보드데이터", boardData);
  useEffect(() => {
    axios
      .get(`http://localhost:3010/boards/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("리스트가져오기성공", res);
        if (res.status === 200) {
          const data = res.data;
          const dataItem = data.item;
          const dataList = dataItem.lists;
          dispatch(changeBoardData(dataList));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const handleAddSubmit = (e) => {
    if (TitleValue !== "") {
      e.preventDefault();
      setTitleValue(TitleValue);
      const data = {
        title: TitleValue,
        boardId: id,
        pos: id * 24444,
      };
      setTitleData([...TitleData, data]);

      axios
        .post("http://localhost:3010/lists", data, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log("포스트성공!", res);
        })
        .catch((err) => {
          console.log(err);
        });
      setTitleValue("");
      setToggle(!toggle);
      setRender(!render);
    }
  };

  const handleChange = (e) => {
    setTitleValue(e.target.value);
  };

  return (
    <>
      <div className="TodoContainer">
        {boardData.map((item) => {
          return (
            <TodoBox
              item={item}
              key={item.id}
              rendering={rendering}
              TitleValue={TitleValue}
              handleChange={handleChange}
              TitleData={TitleData}
              setTitleValue={setTitleValue}
              setTitleData={setTitleData}
              id={id}
              boardData={boardData}
            />
          );
        })}

        {toggle === true ? (
          <button
            className="addTodoBoxBtn"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            +Add another list
          </button>
        ) : (
          <form typeof="submit" className="addTodoForm" onSubmit={handleAddSubmit}>
            <input
              className="addTodoBoxInput"
              onChange={handleChange}
              onBlur={() => {
                setToggle(true);
                setTitleValue("");
              }}
              value={TitleValue}
              autoFocus
            ></input>
            <button
              typeof="submit"
              className="enterBtn"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              Enter!
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default TodoContainer;
