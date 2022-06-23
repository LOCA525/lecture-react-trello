import TodoCard from "./TodoCard/TodoCard";
import "./style.css";
const TodoBox = ({ item }) => {
  return (
    <div className="TodoBox">
      <div className="todoTitle">
        {item.title}
        <button className="todoBoxDeleteBtn">🅧</button>
      </div>

      <ul className="todos">
        <TodoCard />
      </ul>

      <form typeof="submit">
        <input className=""></input>
        <button className="todoBoxAddBtn">+Add Cart</button>
      </form>
    </div>
  );
};

export default TodoBox;
