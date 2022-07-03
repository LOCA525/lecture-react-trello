import TodoCard from "./TodoCard/TodoCard";
import "./style.css";
import { GoTrashcan, GoPencil } from "react-icons/go";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { changeBoardData } from "../../../../../store";

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
}) => {
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [editToggle, setEditToggle] = useState(true);
  const [cardToggle, setCardToggle] = useState(true);
  const [todoValue, setTodoValue] = useState("");
  const [todoData, setTodoData] = useState([]);
  const cardData = useSelector((state) => state.cardData);
  console.log("카드쪽boardData:", boardData);
  console.log("카드쪽item:", item.cards);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3010/cards/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
  //     .then((res) => {
  //       console.log("카드가져오기성공", res);
  //       if (res.status === 200) {
  //         const data = res.data;
  //         console.log("data:", data);
  //         console.log("boardData:", boardData);
  //         rendering();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const editToggler = () => {
    setEditToggle(!editToggle);
    console.log(editToggle);
  };
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
    e.preventDefault();
    setTitleValue(TitleValue);
    const data = {
      title: TitleValue,
    };
    setTitleData([...TitleData, data]);

    axios
      .put(`http://localhost:3010/lists/${item.id}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("리스트수정성공!", res);
        rendering();
        editToggler();
        setTitleValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const todoChange = (e) => {
    setTodoValue(e.target.value);
    console.log(todoValue);
  };
  const todoSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: todoValue,
      listId: item.id,
      pos: 70000,
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
  };
  return (
    <div className="TodoBox">
      {editToggle === true ? (
        <div className="todoTitle">
          {item.title}
          <button className="titleEditBtn" onClick={editToggler}>
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
            onBlur={() => {
              setEditToggle(true);
            }}
            onChange={handleChange}
            value={TitleValue}
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
      <ul className="todos">
        {item.cards.map((item) => {
          console.log(item);
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
            console.log(cardToggle);
          }}
        >
          +Add Cart
        </button>
      ) : (
        <form typeof="submit" className="editTodoForm" onSubmit={todoSubmit}>
          <input
            className="addTodoBoxInput"
            onChange={todoChange}
            onBlur={() => {
              setCardToggle(true);
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
