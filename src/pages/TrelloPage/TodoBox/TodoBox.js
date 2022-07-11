import TodoCard from "../TodoCard/TodoCard";
import "./style.css";
import { GoTrashcan, GoPencil } from "react-icons/go";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeBoardData } from "../../../store";
import dragula from "dragula";

const TodoBox = ({
  boardData,
  id,
  setTitleData,
  setTitleValue,
  TitleData,
  TitleValue,
  handleChange,
  rendering,
  item,
  init,
}) => {
  init();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [editToggle, setEditToggle] = useState(true);
  const [cardToggle, setCardToggle] = useState(true);
  const [todoValue, setTodoValue] = useState("");
  const [todoData, setTodoData] = useState([]);
  console.log("카드쪽boardData:", boardData);
  console.log("카드쪽item:", item.cards);
  const onRemove = () => {
    axios
      .delete(`http://localhost:3010/lists/${item.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("삭제성공", res);
        rendering();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditSubmit = (e) => {
    if (TitleValue !== null) {
      e.preventDefault();
      setTitleValue(TitleValue);
      const data = {
        title: TitleValue,
        boardId: id,
        pos: id * 24444,
      };
      setTitleData([...TitleData, data]);

      axios
        .put(`http://localhost:3010/lists/${item.id}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log("리스트수정성공!", res);
          rendering();
          setEditToggle(!editToggle);
        })
        .catch((err) => {
          console.log(err);
        });
      setTitleValue("");
    }
  };

  const todoChange = (e) => {
    setTodoValue(e.target.value);
    console.log(todoValue);
  };
  const todoSubmit = (e) => {
    if (todoValue !== "") {
      e.preventDefault();
      const data = {
        title: todoValue,
        listId: item.id,
        pos: 65535,
      };
      setTodoData([...todoData, data]);
      console.log(todoData);
      axios
        .post(`http://localhost:3010/cards`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log("카드추가성공!", res);
          console.log("item.cards:", item.cards);
          rendering();
        })
        .catch((err) => {
          console.log(err);
        });
      setCardToggle(!cardToggle);
      setTodoValue("");
    }
  };
  return (
    <div className="TodoBox">
      {editToggle === true ? (
        <div className="todoTitle">
          {item.title}
          <button
            className="titleEditBtn"
            onClick={() => {
              setEditToggle(!editToggle);
            }}
          >
            <GoPencil />
          </button>
          <button className="titleDeleteBtn" onClick={onRemove}>
            <GoTrashcan />
          </button>
        </div>
      ) : (
        <form typeof="submit" className="editTodoForm" onSubmit={handleEditSubmit}>
          <input
            className="addTodoBoxInput"
            onChange={handleChange}
            value={TitleValue}
            onBlur={(e) => {
              setEditToggle(true);
              setTitleValue("");
            }}
            autoFocus
          ></input>
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
      )}
      <ul
        className="todos"
        id="todos"
        onClick={() => {
          console.log("hi");
        }}
      >
        {item.cards.map((item) => {
          return (
            <TodoCard
              setTodoValue={setTodoValue}
              setTodoData={setTodoData}
              todoData={todoData}
              todoChange={todoChange}
              todoValue={todoValue}
              item={item}
              rendering={rendering}
              accessToken={accessToken}
            />
          );
        })}
      </ul>

      {cardToggle === true ? (
        <button
          className="todoBoxAddBtn"
          onClick={() => {
            setCardToggle(!cardToggle);
            setTodoValue("");
            console.log(cardToggle);
          }}
        >
          +Add Card
        </button>
      ) : (
        <form typeof="submit" className="editTodoForm" onSubmit={todoSubmit}>
          <input
            className="addTodoBoxInput"
            onChange={todoChange}
            onBlur={() => {
              setCardToggle(true);
              setTodoValue("");
            }}
            value={todoValue}
            autoFocus
          ></input>
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
      )}
    </div>
  );
};

export default TodoBox;
