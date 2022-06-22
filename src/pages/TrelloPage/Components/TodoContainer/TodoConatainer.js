import "./style.css";
import TodoBox from "./TodoBox/TodoBox";

const TodoContainer = () => {
  return (
    <div className="TodoContainer">
      <TodoBox />

      <button className="addTodoBoxBtn">+Add another list</button>
    </div>
  );
};

export default TodoContainer;
