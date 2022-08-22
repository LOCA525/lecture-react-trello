import "./style.css";
import axios from "axios";
import { useState } from "react";
import EditCardList from "../EditCardList";
import AddCard from "../AddCard";
import Card from "../Card";
import { deleteListApi, editListApi, getListApi } from "../../api/board";
import { useDispatch } from "react-redux";
import { changeBoardData } from "../../store";

const CardList = ({ id, setTitleValue, TitleValue, item }: any) => {
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
  const [editToggle, setEditToggle] = useState(true);
  const [cardToggle, setCardToggle] = useState(true);
  const [todoValue, setTodoValue] = useState("");
  const [todoData, setTodoData] = useState([]);

  const onRemove = async () => {
    try {
      const res = await deleteListApi(item.id);
      if (res.status === 204) {
        const res = await getListApi(id);
        console.log(res);
        dispatch(changeBoardData(res.data.item.lists));
      }
    } catch (error) {}
  };

  const handleEditSubmit = async (e: any) => {
    if (TitleValue !== null) {
      e.preventDefault();
      setTitleValue(TitleValue);
      const data = {
        title: TitleValue,
        boardId: id,
        pos: item.pos,
      };
      try {
        const res = await editListApi(item.id, data);
        if (res.status === 200) {
          const res = await getListApi(id);
          dispatch(changeBoardData(res.data.item.lists));
        }
      } catch (error) {}
      setEditToggle(!editToggle);
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
      <ul className="todos">
        {item.cards?.map((item: any, index: number) => {
          return (
            <Card
              index={index}
              key={item.id}
              id={id}
              setTodoValue={setTodoValue}
              setTodoData={setTodoData}
              todoData={todoData}
              todoChange={todoChange}
              todoValue={todoValue}
              item={item}
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
        item={item}
        id={id}
        accessToken={accessToken}
      />
    </div>
  );
};

export default CardList;
