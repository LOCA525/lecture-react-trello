import TodoCard from "../TodoCard/TodoCard";
import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeBoardData } from "../../../store";
import dragula from "dragula";
import EditBoxBtn from "../Controller/BoxController/EditBox";
import AddCardBtn from "../Controller/CardController/AddCard";

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
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [editToggle, setEditToggle] = useState(true);
  const [cardToggle, setCardToggle] = useState(true);
  const [todoValue, setTodoValue] = useState("");
  const [todoData, setTodoData] = useState([]);

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
  };

  return (
    <div className="TodoBox">
      <EditBoxBtn
        editToggle={editToggle}
        setEditToggle={setEditToggle}
        item={item}
        onRemove={onRemove}
        handleEditSubmit={handleEditSubmit}
        handleChange={handleChange}
        TitleValue={TitleValue}
        setTitleValue={setTitleValue}
      />
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
      <AddCardBtn
        cardToggle={cardToggle}
        setCardToggle={setCardToggle}
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        todoData={todoData}
        setTodoData={setTodoData}
        rendering={rendering}
        item={item}
        accessToken={accessToken}
        todoChange={todoChange}
      />
    </div>
  );
};

export default TodoBox;
