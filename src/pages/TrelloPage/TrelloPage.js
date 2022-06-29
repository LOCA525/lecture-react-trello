import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import TodoBox from "./Components/TodoContainer/TodoBox/TodoBox";
import TodoCard from "./Components/TodoContainer/TodoBox/TodoCard/TodoCard";
import TodoContainer from "./Components/TodoContainer/TodoConatainer";

const TrelloPage = () => {
  let accessToken = useSelector((state) => {
    return state.token;
  });

  let boardData = useSelector((state) => {
    return state.boardData;
  });

  let { id } = useParams();
  const [TitleData, setTitleData] = useState([]);
  const [TitleValue, setTitleValue] = useState("");

  return (
    <div>
      <Nav boardData={boardData} />
      <TodoContainer
        TitleValue={TitleValue}
        setTitleValue={setTitleValue}
        TitleData={TitleData}
        setTitleData={setTitleData}
        id={id}
        boardData={boardData}
      />
    </div>
  );
};

export default TrelloPage;
