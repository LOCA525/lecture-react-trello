import axios from "axios";
import { useDispatch } from "react-redux";
import { addCardApi, getCardApi, getListApi } from "../../api/board";
import { changeBoardData } from "../../store";

const AddCard = ({
  accessToken,
  cardToggle,
  setCardToggle,
  todoValue,
  setTodoValue,
  todoData,
  setTodoData,
  rendering,
  item,
  id,
}: any) => {
  const dispatch = useDispatch();

  const todoSubmit = async (e: any) => {
    if (todoValue !== "") {
      e.preventDefault();
      const data = {
        title: todoValue,
        listId: item.id,
        pos: 65535 + (item.cards[item.cards.length - 1]?.pos ?? 1), //포지션값 설정 마지막 요소의 포지션값 //옵셔널 체이닝
      };
      setTodoData([...todoData, data]);

      try {
        const res = await addCardApi(data);
        if (res.status === 201) {
          const res = await getListApi(id);
          dispatch(changeBoardData(res.data.item.lists));
        }
      } catch (error) {}

      setCardToggle(!cardToggle);
      setTodoValue("");
    }
  };
  const todoEditChange = (e: any) => {
    setTodoValue(e.target.value);
  };
  return (
    <div>
      {cardToggle === true ? (
        <button
          className="todoBoxAddBtn"
          onClick={() => {
            setCardToggle(!cardToggle);
            setTodoValue("");
            console.log(cardToggle);
          }}
        >
          +Add Card
        </button>
      ) : (
        <form typeof="submit" className="editTodoForm" onSubmit={todoSubmit}>
          <input
            className="addTodoBoxInput"
            onChange={todoEditChange}
            onBlur={() => {
              setCardToggle(true);
              setTodoValue("");
            }}
            value={todoValue}
            autoFocus
          ></input>
          <button
            type="submit"
            className="enterBtn"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            Add Card
          </button>
        </form>
      )}
    </div>
  );
};

export default AddCard;
