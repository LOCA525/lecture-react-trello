import "./App.css";
import LoinPage from "./pages/login";
import BoardPage from "./pages/board";
import BoardsPage from "./pages/boards";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardsPage />} />
      <Route path="/login" element={<LoinPage />} />
      <Route path="/boards" element={<BoardsPage />} />
      <Route path="/boards/:id" element={<BoardPage />} />
    </Routes>
  );
}

export default App;
