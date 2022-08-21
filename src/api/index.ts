import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3010",
}); //이렇게 쓰는 이유는 나중에 수정이 매우 용이해 지기 때문이다.

const token = JSON.parse(localStorage.getItem("accessToken") as string);
http.defaults.headers.common["Authorization"] = token ?? null;

export default http;
