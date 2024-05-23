import { defineStore } from "pinia";
import { reactive, ref } from "vue";
type MessageBox={
  show:Boolean,
  level:"Error"|"tips"|"info",
  info:string
}
export  const messageBox=defineStore("messageBox",()=>{
 const box=reactive<MessageBox>({
   show: false,
   level: "tips",
   info: ""
 })
function openMessage(this: MessageBox, level:"Error"|"tips"|"info",info:string){
    this.show=true;
     this.level=level;
     this.info=info;
}
function closeMessage(this: MessageBox){
    this.show=false;
  }
  return {...box,openMessage,closeMessage}
})