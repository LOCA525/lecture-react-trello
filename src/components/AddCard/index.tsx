import axios from "axios";

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
  todoChange,
}: any) => {
  const todoSubmit = (e: any) => {
    if (todoValue !== "") {
      e.preventDefault();
      const data = {
        title: todoValue,
        listId: item.id,
        pos: 65535 * item.cards.length,
      };
      setTodoData([...todoData, data]);
      console.log("todoData", todoData);
      axios
        .post(`http://localhost:3010/cards`, data, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log("카드추가성공!", res);
          console.log("item.cards:", item.cards);

          rendering();
        })
        .catch((err) => {
          console.log(err);
        });
      setCardToggle(!cardToggle);
      setTodoValue("");
    }
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
            onChange={todoChange}
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
