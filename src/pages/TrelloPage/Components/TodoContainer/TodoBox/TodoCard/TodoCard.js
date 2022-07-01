import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeBoardData } from "../../../../../../store";
import { GoTrashcan, GoPencil } from "react-icons/go";
import "./style.css";

const TodoCard = ({ todoData, setTodoData, setTodoValue, item, accessToken, rendering, todoChange, todoValue }) => {
  const [editToggle2, setEditToggle2] = useState(true);
  const todoDeleteClick = () => {
    axios
      .delete(`http://localhost:3010/cards/${item.id}`, {
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

  const todoEditSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: todoValue,
      listId: item.listId,
    };

    axios
      .put(`http://localhost:3010/cards/${item.id}`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("카드수정성공!", res);
        setTodoValue("");
        rendering();
        setEditToggle2(!editToggle2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return editToggle2 === true ? (
    <li className="todoCard">
      {item.title}
      <button
        className="todoEditBtn"
        onClick={() => {
          setEditToggle2(!editToggle2);
        }}
      >
        <GoPencil />
      </button>
      <button className="todoDeleteBtn" onClick={todoDeleteClick}>
        <GoTrashcan />
      </button>
    </li>
  ) : (
    <form typeof="submit" className="editTodoForm" onSubmit={todoEditSubmit}>
      <input className="addTodoBoxInput" onChange={todoChange} value={todoValue} autoFocus></input>
      <button type="submit" className="enterBtn">
        Enter!
      </button>
    </form>
  );
};

export default TodoCard;
