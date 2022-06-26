const BoardItem = (item) => {
  console.log(item.title);
  return (
    <div className="boardItem">
      <div className="navyLine"></div>
      <div className="boardTitle">{item.title}</div>
    </div>
  );
};

export default BoardItem;
