import "./App.css";
import LoinPage from "./pages/LoginPage/LoginPage";
import TrelloPage from "./pages/TrelloPage/TrelloPage";
import BoardPage from "./pages/BoardPage/BoardPage";
import { Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoinPage />} />
        <Route path="/Board" element={<BoardPage />} />
        <Route path="/trello/:id" element={<TrelloPage />} />
      </Routes>
      {/* <Link to="/login">로그인!!!</Link>
      <Link to="/Board">보드!!!</Link>
      <Link to="/trello">트렐로!!!</Link> */}
    </>
  );
}

export default App;
