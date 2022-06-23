import { useState, useRef } from "react";
import Nav from "./Components/Nav/Nav";
import TodoBox from "./Components/TodoContainer/TodoBox/TodoBox";
import TodoCard from "./Components/TodoContainer/TodoBox/TodoCard/TodoCard";
import TodoContainer from "./Components/TodoContainer/TodoConatainer";

const TrelloPage = () => {
  const id = useRef(0);
  const [TitleData, setTitleData] = useState([]);
  const [TitleValue, setTitleValue] = useState("");

  return (
    <div>
      <Nav />
      <TodoContainer
        TitleValue={TitleValue}
        setTitleValue={setTitleValue}
        TitleData={TitleData}
        setTitleData={setTitleData}
        id={id}
      />
    </div>
  );
};

export default TrelloPage;
