import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.css";
import { changeBoardData, RootState } from "../../store";
import AddCardList from "../../components/AddCardList";
import CardList from "../../components/CardList";
import { addListApi, getListApi } from "../../api/board";

const BoardPage = () => {
  let boardData = useSelector((state: RootState) => {
    return state.boardData;
  });
  let { id } = useParams();
  const [TitleValue, setTitleValue] = useState("");
  const [bgColor, setBgColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getBoard();
  }, []);

  const getBoard = async () => {
    const res = await getListApi(id);
    dispatch(changeBoardData(res.data.item.lists));

    setBgColor(res.data.item.bgColor);
  };

  const handleAddSubmit = async (e: any) => {
    e.preventDefault();
    if (TitleValue !== "") {
      setTitleValue(TitleValue);
      const data = {
        title: TitleValue,
        boardId: id,
        pos: 65535 + (boardData[boardData.length - 1]?.pos ?? 1),
      };

      try {
        const res = await addListApi(data);
        if (res.status === 201) {
          getBoard();
          setTitleValue("");
        }
        console.log(res);
      } catch (error) {}
    }
  };
  console.log(boardData);

  return (
    <div
      className="boardContainer"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="mainBoard">MainBoard</div>
      <div className="TodoContainer">
        {boardData.map((item: any) => {
          return <CardList item={item} key={item.id} TitleValue={TitleValue} setTitleValue={setTitleValue} id={id} />;
        })}
        <AddCardList handleAddSubmit={handleAddSubmit} TitleValue={TitleValue} setTitleValue={setTitleValue} />
      </div>
    </div>
  );
};

export default BoardPage;
