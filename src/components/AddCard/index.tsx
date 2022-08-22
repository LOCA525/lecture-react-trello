import axios from "axios";
import { useDispatch } from "react-redux";
import { addCardApi, getCardApi } from "../../api/board";

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
}: any) => {
  const dispatch = useDispatch();
  const getCard = async () => {
    const res = await getCardApi(item.id);
    console.log(res);
  };

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
        addCardApi(data);
        getCard();
      } catch (error) {}
      // axios
      //   .post(`http://localhost:3010/cards`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
      //   .then((res) => {
      //     console.log("카드추가성공!", res);
      //     console.log("item.cards:", item.cards);
      //     rendering();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
