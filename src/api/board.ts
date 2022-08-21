import http from ".";

export const getBoardsApi = async () => {
  const res = await http.get("/boards");
  return res;
};

export const postBoardsApi = async (title: string) => {
  const res = await http.post("/boards", { title });
  return res;
};

export const deleteBoardsApi = async (id: number) => {
  const res = await http.delete(`/boards/${id}`); //res 에 통신하는 함수를 넣고 싶은게 아니라 , 서버에서 던져주는 데이터를 넣고 싶은 것이다.
  return res;
};

export const putBoardsApi = async (id: number, title: string, bgColor: string) => {
  const res = await http.put(`/boards/${id}`, { title, bgColor });
  return res;
};

export const getListApi = async (id: any) => {
  const res = await http.get(`/boards/${id}`);
  return res;
};

export const addListApi = async (data: any) => {
  const res = await http.post("/lists", data);
  return res;
};

export const editListApi = async (id: string, data: any) => {
  const res = await http.put(`/lists/${id}`, data);
  return res;
};

export const deleteListApi = async (id: any) => {
  const res = await http.delete(`/lists/${id}`);
  return res;
};
