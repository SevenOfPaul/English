import { defineStore } from "pinia";
// type MessageBox={
//   level:"Error"|"tips"|"info",
//   info:string,
//   color: ComputedRef<"text-red-600" | "text-sky-600" | "text-black-600">
// }
export  const useMessage=defineStore("useMessage",{
state:()=>({level:"",info:""}),
getters:{
 color:(state)=>{
     if(state.level=="Error"){
      return  "text-red-600"
     }else if(state.level=="tips"){
     return "text-sky-600"
     }else{
      return "text-black-300"
     }
    }
}
})