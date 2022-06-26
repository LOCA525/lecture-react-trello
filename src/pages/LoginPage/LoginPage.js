import "./style.css";
import Logo from "../../img/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changeToken, changeBoardData } from "../../store";

const LoinPage = () => {
  let accessToken = useSelector((state) => {
    return state.token;
  });
  let boardData = useSelector((state) => {
    return state.boardData;
  });
  let reduxState = useSelector((state) => {
    return state;
  });

  console.log(reduxState);
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value }); /// <== 요거 멋짐
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("loginForm은", loginForm);
    axios
      .post("http://localhost:3010/login", loginForm)
      .then((res) => {
        console.log("포스트성공", res);
        if (res.status === 200) {
          navigate("/board");
        }
        const data = res.data;
        const accessToken = data.accessToken;
        dispatch(changeToken(accessToken));
        const user = data.user;
        const email = user.email;
        dispatch(changeEmail(email));
        console.log(reduxState);
        console.log(accessToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <img className="logo" src={Logo} alt="logo!" />
      <div className="joinBox">
        <h1>Log in to Trello</h1>
        <form onSubmit={onSubmit} typeof="submit" className="loginForm">
          <input
            className="emailInput"
            name="email"
            onChange={onChange}
            value={loginForm.email}
            type="text"
            placeholder="Enter Email"
          />
          <input
            className="passwordInput"
            onChange={onChange}
            name="password"
            value={loginForm.password}
            type="password"
            placeholder="Enter Password"
          />

          <p>By log in up, you confirm that you've read and accepted our Terms of Service and Privacy Policy.</p>

          <button className="loginBtn">Log in</button>
        </form>

        <div className="hr"></div>

        <p>
          Can't log in? <a href="../page/join.html"> Sign up for an account</a>
        </p>
      </div>
    </div>
  );
};

export default LoinPage;
