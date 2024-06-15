<template>
    <div className="flex flex-row">
    <div className="w-2/5 mx-auto p-5 my-5 flex justify-center flex-col text-start">
        <p className="font-sans font-semibold text-3xl m-3 ">单词：{{word.word  }}</p>
            <p className="font-sans font-semibold text-2xl m-3 text-slate-300 flex
         flex-row justify-start hover:cursor-pointer hover:text-green-300 w-30 h-10
           pt-1 mx-2 items-center"
            @click="()=>play(audio)" >音标：{{word.phonetic_symbol  }}
                <Play theme="outline" size="24" fill="#cbd5e1" className="hover:green-300"/></p>
                <p className="font-semibold text-2xl m-3">词性&词义：{{ word.mean }}</p>
                <p className="font-semibold text-2xl m-3">例句：</p>
                <br/>
                <p>{{ word.sentence }}</p>
    </div>
    <div className="card w-3/5 bg-base-100 shadow-xl dark:bg-slate-300">
  <h2 className="card-title m-4 ">所属单词书</h2>
<div className="card-body flex flex-row flex-wrap">
    <div v-for="book in word.books" className="book text-center text-1xl w-1/4 hover:cursor-pointer relative"
    @click="()=>addBook(book._id)">
      <img :src="book.pic" className="rounded-sm my-o mx-auto h-2/5"/>
      <p className="font-bold">{{ book.name }}</p>
      <div className="tooltip tooltip-open tooltip-top absolute top-20 left-21"  data-tip="点我学习此书">
    </div>
  </div>
  </div>
</div>
</div>
    <audio :src="`https://dict.youdao.com/dictvoice?audio=${word.word}&type=1`" ref="audio"></audio>
    </template>
<script setup lang="ts">
import {  reactive, ref } from 'vue';
import {useRoute} from "vue-router";
import {Play} from "@icon-park/vue-next";
import {http} from "../http"
const route=useRoute();
console.log(route.query.word,"1");
let word=reactive(JSON.parse(route.query.word! as any));
word.books.forEach((b:any)=>b.pic="http://localhost:4320"+b.pic.replace("//","\/"));
const audio=ref(null);
function play(element:HTMLAudioElement|null){
    element!.play();
}
async function addBook(bookId:string){
    console.log("helo")
   await http(`/user/addBook/${bookId}`)
}
</script>
<style lang="less" scoped>
.tooltip{
  display: none;
}
.book:hover .tooltip,.tooltip:hover{
  display:block;
}
</style>