import "./style.css";
import axios from "axios";
import { useState } from "react";
import EditCardList from "../EditCardList";
import AddCard from "../AddCard";
import Card from "../Card";

const CardList = ({ id, setTitleValue, TitleValue, rendering, item }: any) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
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

  const handleEditSubmit = (e: any) => {
    if (TitleValue !== null) {
      e.preventDefault();
      setTitleValue(TitleValue);
      const data = {
        title: TitleValue,
        boardId: id,
        pos: item.pos,
      };

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

  const todoChange = (e: any) => {
    setTodoValue(e.target.value);
  };

  return (
    <div className="TodoBox">
      <EditCardList
        editToggle={editToggle}
        setEditToggle={setEditToggle}
        item={item}
        onRemove={onRemove}
        handleEditSubmit={handleEditSubmit}
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
        {item.cards.map((item: any) => {
          return (
            <Card
              key={item.id}
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
      <AddCard
        cardToggle={cardToggle}
        setCardToggle={setCardToggle}
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        todoData={todoData}
        setTodoData={setTodoData}
        rendering={rendering}
        item={item}
        accessToken={accessToken}
      />
    </div>
  );
};

export default CardList;
