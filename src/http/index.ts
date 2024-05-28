import axios from "axios";
import { useMessage } from "../stores";
let lastTime = new Date().getTime();
axios.interceptors.request.use(async (config) => {
  if (localStorage.getItem("token")) {
    const token = `Bearer ${localStorage.getItem("token")}`;
    config.headers.Authorization = token;
  }
  //节流
  const nowTime = new Date().getTime();
   //@ts-ignore
  if (nowTime - lastTime < 2000&&config.controller) {
    lastTime = nowTime;
    //@ts-ignore
    config.controller.cancel();
  }
  return config
})
axios.interceptors.response.use((config) => {
  if (config.headers.authorization) {
    const token = config.headers.authorization  as string;
    localStorage.setItem("token", token);
  }
  const outer={...config.data};
  if(outer.status=="200"&&outer.data.code==200){
    return outer.data.data;
  }else{
     const message=useMessage();
     message.$patch({level:"Error",info:outer.data.message})
  }

});
axios.defaults.baseURL ="http://localhost:4320"
const http=axios;
export  {http}