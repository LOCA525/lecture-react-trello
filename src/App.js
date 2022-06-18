import "./App.css";
import JoinPage from "./routes/JoinPage/JoinPage";
import TrelloPage from "./routes/TrelloPage/TrelloPage";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<JoinPage />} />
        <Route path="/trello" element={<TrelloPage />} />
      </Routes>
      <Link to="/login">로그인!!!</Link>
      <Link to="/trello">트렐로!!!</Link>
    </>
  );
}

export default App;
