import { useState } from "react";
import { GoTrashcan, GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeBoardData, RootState } from "../../store";
import dayjs from "dayjs";
import { deleteBoardsApi, getBoardsApi, putBoardsApi } from "../../api/board";
import { IoColorPaletteSharp } from "react-icons/io5";
interface Props {
  item: any;
}

const BoardItem = ({ item }: Props) => {
  const dispatch = useDispatch();
  let boardData = useSelector((state: RootState) => {
    return state.boardData;
  });
  const navigate = useNavigate();

  const [editToggle, setEditToggle] = useState(true);
  const [boardTitle, setBoardTitle] = useState<string>("");

  const onChange = (e: any) => {
    setBoardTitle(e.target.value);
  };

  const onRemove = async () => {
    try {
      const res = await deleteBoardsApi(item.id);

      if (res.status === 204) {
        const res = await getBoardsApi();
        dispatch(changeBoardData(res.data.list));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await putBoardsApi(item.id, boardTitle, "rgb(0, 121, 191)");

      if (res) {
        const res = await getBoardsApi();
        dispatch(changeBoardData(res.data.list));
        setEditToggle(true);
        setBoardTitle("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goListClick = () => {
    navigate(`/boards/${item.id}`);
  };

  return (
    <div className="boardItem">
      <div className="navyLine">
        <button className="bgColorBtn" onClick={() => {}}>
          <IoColorPaletteSharp />
        </button>

        <button
          className="editBtn"
          onClick={() => {
            setEditToggle(!editToggle);
          }}
        >
          <GoPencil />
        </button>
        <button className="deleteBtn" onClick={onRemove}>
          <GoTrashcan />
        </button>
      </div>
      {editToggle ? (
        <div>
          <div className="boardTitle" onClick={goListClick}>
            {item.title}
          </div>
          <div className="createdAtData">{dayjs(item.createdAt).format("YYYY-MM-DD")}</div>
        </div>
      ) : (
        <form typeof="submit" className="boardAddSubmit" onSubmit={editSubmit}>
          <input
            className="boardAddInput"
            onChange={onChange}
            name="title"
            value={boardTitle}
            onBlur={() => {
              setEditToggle(true);
              setBoardTitle("");
            }}
            autoFocus
          />
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
    </div>
  );
};

export default BoardItem;
