const BoardItem = (item) => {
  return (
    <div className="boardItem">
      <div className="navyLine"></div>
      <div className="boardTitle">{item.item.title}</div>
    </div>
  );
};

export default BoardItem;
