import "./style.css";
import { useState } from "react";
import axios from "axios";
import { GoPencil, GoTrashcan } from "react-icons/go";

const Card = ({ setTodoValue, item, rendering, todoChange, todoValue }: any) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);

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

  const todoEditSubmit = (e: any) => {
    if (todoValue !== null) {
      e.preventDefault();
      const data = {
        title: todoValue,
        listId: item.listId,
        pos: item.pos,
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
    }
  };
  return (
    <>
      {editToggle2 === true ? (
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
          <input
            className="addTodoBoxInput"
            onChange={todoChange}
            value={todoValue}
            onBlur={() => {
              setEditToggle2(true);
              setTodoValue("");
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
    </>
  );
};

export default Card;