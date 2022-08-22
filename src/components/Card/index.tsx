import "./style.css";
import { useState } from "react";
import { GoPencil, GoTrashcan } from "react-icons/go";
import { deleteCardApi, eidtCardApi, getListApi } from "../../api/board";
import { useDispatch } from "react-redux";
import { changeBoardData } from "../../store";

const Card = ({ setTodoValue, id, item, rendering, todoChange, todoValue, index }: any) => {
  const dispatch = useDispatch();
  const [editToggle2, setEditToggle2] = useState(true);

  const todoDeleteClick = async () => {
    try {
      const res = await deleteCardApi(item.id);
      if (res.status === 204) {
        const res = await getListApi(id);
        dispatch(changeBoardData(res.data.item.lists));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const todoEditSubmit = async (e: any) => {
    if (todoValue !== null) {
      e.preventDefault();
      const data = {
        title: todoValue,
        listId: item.listId,
        pos: item.pos,
      };

      try {
        const res = await eidtCardApi(item.id, data);
        if (res.status === 200) {
          const res = await getListApi(id);
          dispatch(changeBoardData(res.data.item.lists));
          setTodoValue("");
          setEditToggle2(!editToggle2);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {editToggle2 === true ? (
        <li className={`todoCard todoCard${index}`}>
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
