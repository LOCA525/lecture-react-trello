import { GoTrashcan, GoPencil } from "react-icons/go";

const EditCardList = ({
  setTitleValue,
  TitleValue,

  editToggle,
  setEditToggle,
  item,
  onRemove,
  handleEditSubmit,
}: any) => {
  const handleChange = (e: any) => {
    setTitleValue(e.target.value);
  };
  return (
    <>
      {editToggle === true ? (
        <div className="todoTitle">
          {item.title}
          <button
            className="titleEditBtn"
            onClick={() => {
              setEditToggle(!editToggle);
            }}
          >
            <GoPencil />
          </button>
          <button className="titleDeleteBtn" onClick={onRemove}>
            <GoTrashcan />
          </button>
        </div>
      ) : (
        <form typeof="submit" className="editTodoForm" onSubmit={handleEditSubmit}>
          <input
            className="addTodoBoxInput"
            onChange={handleChange}
            value={TitleValue}
            onBlur={() => {
              setEditToggle(true);
              setTitleValue("");
            }}
            autoFocus
          ></input>
          <button
            type="submit"
            className="enterBtn"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            Enter!
          </button>
        </form>
      )}
    </>
  );
};

export default EditCardList;
