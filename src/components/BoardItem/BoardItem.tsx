import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { GoTrashcan, GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeBoardData, RootState } from "../../store";

const BoardItem = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editToggle, setEditToggle] = useState(true);
  let accessToken = useSelector((state: RootState) => {
    return state.token;
  });

  let boardData = useSelector((state: RootState) => {
    return state.boardData;
  });
  console.log(boardData);

  const handleEditClick = () => {
    setEditToggle(!editToggle);
  };
  const onRemove = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);

    axios
      .delete(`http://localhost:3010/boards/${props.item.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("삭제성공", res);
        props.setRender(!props.render);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editSubmit = (e: any) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);

    e.preventDefault();
    axios
      .put(`http://localhost:3010/boards/${props.item.id}`, props.boardTitle, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log("수정성공", res);

        const data = res.data;
        const NewBoardData = data.item;

        console.log("새보드데이터", NewBoardData);
        setEditToggle(!editToggle);
        props.setRender(!props.render);
        props.setBoardTitle("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const goListClick = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken") as string);

    axios
      .get(`http://localhost:3010/boards/${props.item.id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        console.log("리스트이동성공", res);
        if (res.status === 200) {
          console.log(res.data.item.id);
          const boardId = res.data.item.id;
          const data = res.data.item.lists;
          console.log(data);
          dispatch(changeBoardData(data));
          navigate(`/boards/${boardId}`);
          console.log("리스트이동성공후보드데이터:", boardData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="boardItem">
      <div className="navyLine">
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
      {editToggle === true ? (
        <div>
          <div className="boardTitle" onClick={goListClick}>
            {props.item.title}
          </div>
          <div className="createdAtData">{props.item.createdAt}</div>
        </div>
      ) : (
        <form typeof="submit" className="boardAddSubmit" onSubmit={editSubmit}>
          <input
            className="boardAddInput"
            onChange={props.onChange}
            name="title"
            value={props.boardTitle.title}
            onBlur={() => {
              setEditToggle(true);
              props.setBoardTitle("");
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
