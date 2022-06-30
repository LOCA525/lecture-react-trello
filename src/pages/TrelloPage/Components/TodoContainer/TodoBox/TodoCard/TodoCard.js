import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeBoardData } from "../../../../../../store";
import "./style.css";

const TodoCard = ({ item }) => {
  return (
    <li className="todoCard">
      <button className="todoCardDeleteBtn">🅧</button>
      TodoCard
    </li>
  );
};

export default TodoCard;
