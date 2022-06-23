import { useRef, useState } from "react";
import "./style.css";
import TodoBox from "./TodoBox/TodoBox";
import axios from "axios";
import { useSelector } from "react-redux";

const TodoContainer = ({ TitleValue, setTitleValue, TitleData, setTitleData, id }) => {
  const accessToken = useSelector((state) => state.token);
  console.log(accessToken);
  const [toggle, setToggle] = useState(true);
  const handleAddSubmit = (e) => {
    e.preventDefault();
    setTitleValue(TitleValue);
    setTitleData([...TitleData, { id: id.current, title: TitleValue }]);
    id.current = id.current + 1;
    console.log(TitleData);
    setTitleValue("");
    setToggle(!toggle);
  };

  const handleChange = (e) => {
    setTitleValue(e.target.value);
  };
  return (
    // axios
    //   .post("localhost:3000/lists", loginForm)
    //   .then((res) => {
    //     console.log("포스트성공", res);
    //     if (res.status === 200) {
    //       navigate("/trello");
    //     }
    //     const data = res.data;
    //     const accessToken = data.accessToken;
    //     const user = data.user;
    //     const email = user.email;
    //     dispatch(changeEmail(email));
    //     dispatch(changeToken(accessToken));
    //     console.log(reduxState);
    //     // console.log(res.data);
    //     // console.log(accessToken);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
  );
};

export default TodoContainer;
