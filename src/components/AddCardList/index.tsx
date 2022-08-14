import { useState } from "react";

const AddCardList = ({ TitleValue, setTitleValue, handleAddSubmit }: any) => {
  const [toggle, setToggle] = useState(true);

  const handleChange = (e: any) => {
    setTitleValue(e.target.value);
    console.log("handleChange바뀌는중");
  };
  return (
    <>
      {toggle === true ? (
        <button
          className="addTodoBoxBtn"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          +Add another list
        </button>
      ) : (
        <form typeof="submit" className="addTodoForm" onSubmit={handleAddSubmit}>
          <input
            className="addTodoBoxInput"
            onChange={handleChange}
            onBlur={() => {
              setToggle(true);
              setTitleValue("");
            }}
            value={TitleValue}
            autoFocus
          ></input>
          <button
            typeof="submit"
            className="enterBtn"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            Add List
          </button>
        </form>
      )}
    </>
  );
};

export default AddCardList;
