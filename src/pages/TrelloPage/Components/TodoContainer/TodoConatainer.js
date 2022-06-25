import { useRef, useState } from "react";
import "./style.css";
import TodoBox from "./TodoBox/TodoBox";
import axios from "axios";
import { useSelector } from "react-redux";

const TodoContainer = ({ TitleValue, setTitleValue, TitleData, setTitleData, id }) => {
  const accessToken = useSelector((state) => state.token);
  const [toggle, setToggle] = useState(true);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setTitleValue(TitleValue);
    const data = {
      title: TitleValue,
      boardId: id.current,
      pos: id.current,
    };
    setTitleData([...TitleData, data]);

    axios
      .post("http://localhost:3010/lists", { data, headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("포스트성공!", res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTitleValue("");
    setToggle(!toggle);
    id.current = id.current + 1;
  };

  const handleChange = (e) => {
    setTitleValue(e.target.value);
  };
  return (
    <>
      <div className="TodoContainer">
        {TitleData.map((item) => {
          return <TodoBox item={item} ket={item.id} />;
        })}

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
            <input className="addTodoBoxInput" onChange={handleChange} value={TitleValue}></input>
            <button type="submit" className="enterBtn">
              Enter!
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default TodoContainer;
