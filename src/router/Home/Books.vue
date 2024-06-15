<template>
  <div className="flex flex-row">
<div className="card w-1/2 bg-base-100 shadow-xl flex flex-row">
  <div className="card-body  dark:bg-slate-300">
    <p className="absolute right-2 top-1/4
     dark:bg-slate-300 bg-green-400 text-white rounded-l-lg p-1 hover:cursor-pointer hover:scale-105" 
    @click="toWords">
    <book-one theme="outline" size="24" fill="white"/>词表</p>
    <p className="absolute right-2 bottom-1/4 dark:bg-slate-200 bg-green-400 text-white 
    rounded-l-lg p-1 flex justify-center hover:cursor-pointer hover:scale-105" 
    @click="toSettings">
    <activity-source theme="outline" size="24" fill="white"/>
    设置任务量</p>
    <h2 className="card-title">正在学习的单词书</h2>
    <figure><img 
    :src="book.pic" 
    className="w-40" /></figure>
     <div className="grow-3">
        <p className="text-3xl font-sans font-bold text-center">{{ book.name }}</p>
       <div>
        <p className="text-xl">
            预计还有<span className="bg-green-300 dark:bg-slate-300 p-1 rounded">{{ Math.round((book.quantity-book.pro)/book.goal)  }}
            </span>天完成</p>
    <label className="mt-10 block">
        已完成{{ pointer }}
        <input type="range" min="0" max="100" value="0" step="1" className="range range-xs" disabled /> 
    </label>
        <p>{{  book.pro}}/{{ book.quantity }}词</p>
       </div>
     </div>
  </div>
</div>
<div className="card w-1/2 bg-base-100 shadow-xl dark:bg-slate-300">
  <h2 className="card-title m-4 ">书桌中的单词书</h2>
<div className="card-body flex flex-row flex-wrap">
    <div v-for="book in books" className="book text-center text-1xl w-1/4 hover:cursor-pointer relative">
      <img :src="book.pic" className="rounded-sm my-o mx-auto h-2/5"  @click="()=>{changeStudy(book._id)}"/>
      <p className="font-bold">{{ book.name }}</p>
      <p className="font-light">已学<span className="bg-green-300">{{ book.pro }}</span>词</p>
      <div className="tooltip tooltip-open tooltip-top absolute top-20 left-16" data-tip="点我学习此书">
    </div>
  </div>
  </div>
</div>
</div>
</template>
<script setup lang="ts">
import {   onMounted, reactive, ref } from 'vue';
import { http } from '../../http';
import { computed } from '@vue/reactivity';
import { useBookSettings } from '../../stores';
import { useRouter } from 'vue-router';
import { BookOne,ActivitySource } from '@icon-park/vue-next/';
const router=useRouter();
const bst=useBookSettings();
let newFinished=ref(bst.newFinished);
let oldFinished=ref(bst.oldFinished);
let book=reactive({_id:"",name:"",pic:"",quantity:0,pro:0,goal:bst.goal,finished:0});
let books=reactive<any[]>([])
    let pointer=computed(()=>{
        //@ts-ignore
return ((book.pro+oldFinished.value+newFinished.value)/book.quantity).toFixed(2)+"%";
})
function toWords(){
  router.push({path:"/book/words",query:{bookId:book._id,goal:book.goal,pro:book.pro,quantity:book.quantity}});
}
function toSettings(){
  router.push({path:"/book/settings"});
}
async function changeStudy(bookId:string){
  await http.get("/book/changeStudyBook/",{params:{bookId}});
}
onMounted(async ()=>{
    const information=await http.get("/book/getStudyBook");
 //@ts-ignore 
 for(let key in book){book[key]=information[key]};
    book.quantity=bst.quantity;
    const data=await http<{},any[]>("/book/desk");
     for(let v of data){if(v._id!==book._id){
      v.pic=v.pic.replace(/\\/g,(_:any,offset:number)=>{return offset==5?"//" : "/"});
      books.push(v)
    }};
})

</script>
<style lang="less" scoped>
.tooltip{
  display: none;
}
.book:hover .tooltip,.tooltip:hover{
  display:block;
}

</style>