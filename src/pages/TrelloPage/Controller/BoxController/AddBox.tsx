const AddBoxBtn = ({ TitleValue, setTitleValue, toggle, setToggle, handleAddSubmit, handleChange }: any) => {
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

export default AddBoxBtn;
