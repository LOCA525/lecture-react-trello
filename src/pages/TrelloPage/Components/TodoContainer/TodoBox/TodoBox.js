import TodoCard from "./TodoCard/TodoCard";
import "./style.css";
const TodoBox = () => {
  return (
    <div className="TodoBox">
      <div className="todoTitle">
        todoTitle
        <button className="todoBoxDeleteBtn">🅧</button>
      </div>

      <ul className="todos">
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </ul>
      <button className="todoBoxAddBtn">+Add Cart</button>
    </div>
  );
};

export default TodoBox;
