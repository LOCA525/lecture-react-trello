import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";
import "./style.css";
import "dragula/dist/dragula.min.css";
import { changeBoardData, RootState } from "../../store";
import AddCardList from "../../components/AddCardList";
import axios from "axios";
import CardList from "../../components/CardList";

const BoardPage = () => {
  const todoContainer = useRef<any>();
  let boardData = useSelector((state: RootState) => {
    return state.boardData;
  });
  let { id } = useParams();

  const [TitleValue, setTitleValue] = useState("");
  const [render, setRender] = useState(true);
  const rendering = () => {
    setRender(!render);
  };

  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);
  useEffect(() => {
    axios
      .get(`http://localhost:3010/boards/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("리스트가져오기성공", res);
        if (res.status === 200) {
          const data = res.data;
          const dataItem = data.item;
          const dataList = dataItem.lists;
          dispatch(changeBoardData(dataList));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const handleAddSubmit = (e: any) => {
    if (TitleValue !== "") {
      e.preventDefault();
      setTitleValue(TitleValue);
      const data = {
        title: TitleValue,
        boardId: id,
        pos: 65535 + (boardData[boardData.length - 1]?.pos ?? 1),
      };

      axios
        .post("http://localhost:3010/lists", data, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log("포스트성공!", res);
        })
        .catch((err) => {
          console.log(err);
        });
      setTitleValue("");
      setRender(!render);
    }
  };

  return (
    <div>
      <Nav boardData={boardData} />
      <div className="TodoContainer" ref={todoContainer}>
        {boardData.map((item: any) => {
          return (
            <CardList
              item={item}
              key={item.id}
              rendering={rendering}
              TitleValue={TitleValue}
              setTitleValue={setTitleValue}
              id={id}
            />
          );
        })}
        <AddCardList handleAddSubmit={handleAddSubmit} TitleValue={TitleValue} setTitleValue={setTitleValue} />
      </div>
    </div>
  );
};

export default BoardPage;
