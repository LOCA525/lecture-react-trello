import axios from "axios";

const AddCardBtn = ({
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
}) => {
  const todoSubmit = (e) => {
    if (todoValue !== "") {
      e.preventDefault();
      const data = {
        title: todoValue,
        listId: item.id,
        pos: 65535,
      };
      setTodoData([...todoData, data]);
      console.log(todoData);
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

export default AddCardBtn;
