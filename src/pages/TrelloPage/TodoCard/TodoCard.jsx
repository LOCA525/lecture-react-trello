import "./style.css";
import EditCardBtn from "../Controller/CardController/EditCard";

const TodoCard = ({ setTodoValue, item, rendering, todoChange, todoValue }) => {
  return (
    <EditCardBtn
      rendering={rendering}
      todoValue={todoValue}
      setTodoValue={setTodoValue}
      todoChange={todoChange}
      item={item}
    />
  );
};

export default TodoCard;
