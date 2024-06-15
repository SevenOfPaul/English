import axios from "axios";
import { useMessage,useUser } from "../stores";
let lastTime = new Date().getTime();

axios.interceptors.request.use(async (config) => {
  const useController=useUser();
  if (useController.online) {
    const token = `Bearer ${useController.token}`;
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
    const useController=useUser();
    const token = config.headers.authorization  as string;
    useController.$patch({token});
  }
  const outer={...config.data};
  if(outer.status=="200"&&outer.data.code==200){
const message=useMessage();
    if(outer.data.message){
      message.$patch({level:"info",info:outer.data.message});
      return outer.data.data;
    }
    if(outer.data.data["book"]){
      outer.data.data["book"].pic=outer.data.data["book"].pic.replace(/\\/g,(_:any,offset:number)=>{
        return offset==5?"//" : "/"});}
    if(outer.data.data["pic"]){
       outer.data.data.pic=outer.data.data.pic.replace(/\\/g,(_:any,offset:number)=>{return offset==5?"//" : "/"});
    }
    // @ts-ignore
    return new Promise(resolve=>setTimeout(()=>{resolve(outer.data.data)},250));
  }else{
     const message=useMessage();
     message.$patch({level:"Error",info:outer.data.message});
     return (outer.data.data)
  }
});
axios.defaults.baseURL ="http://localhost:4320"
const http=axios;
export  {http}