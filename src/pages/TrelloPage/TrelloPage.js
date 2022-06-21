import Nav from "./Components/Nav/Nav";
import TodoBox from "./Components/TodoContainer/TodoBox/TodoBox";
import TodoCard from "./Components/TodoContainer/TodoBox/TodoCard/TodoCard";
import TodoContainer from "./Components/TodoContainer/TodoConatainer";

const TrelloPage = () => {
  return (
    <div>
      <Nav />
      <TodoContainer />
    </div>
  );
};

export default TrelloPage;
