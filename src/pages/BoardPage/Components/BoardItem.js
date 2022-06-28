import axios from "axios";
import { useEffect, useState } from "react";
import { GoTrashcan } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { changeBoardData } from "../../../store";

const BoardItem = (props) => {
  ///프롭스부분 고장 ..
  let accessToken = useSelector((state) => {
    return state.token;
  });
  let boardData = useSelector((state) => {
    return state.boardData;
  });

  const onRemove = () => {
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
  return (
    <div className="boardItem">
      <div className="navyLine">
        <button className="deleteBtn" onClick={onRemove}>
          <GoTrashcan />
        </button>
      </div>
      <div className="boardTitle">{props.item.title}</div>
    </div>
  );
};

export default BoardItem;
