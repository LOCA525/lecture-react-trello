import "./style.css";
import EditCardBtn from "../Controller/CardController/EditCard";

const TodoCard = ({ setTodoValue, item, rendering, todoChange, todoValue }: any) => {
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
