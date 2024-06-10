<template>
    <div className="m-0" v-motion-pop>
        <p className="text-black text-4xl m-6 font-sans font-semibold">我在士刀学习
        <span className="font-extrabold">好多</span>天</p>
     <!--加载loading-->
    <div className="flex flex-row gap-4 w-90%" v-if="!st.energy.val&&load" v-motion-fade>
  <div className="grow">
    <div className="skeleton h-40 w-40"></div>
  </div>
  <div className="flex flex-col items-stretch grow">
    <div className="skeleton h-4 w-50"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
  <div className="flex flex-col grow-3">
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
</div>
          <!--------------------------------------->
     <div className="card m-4 shadow-xl flex flex-row w-9/10 bg-slate-100 min-h-50 p-3 dark:bg-slate-300" v-if="!load">
  <figure><img 
    :src="book.pic" 
    className="w-40" /></figure>
     <div className="grow-3">
        <p className="text-3xl font-sans font-bold text-center">{{ book.name }}</p>
       <div>
        <p className="text-xl">
            预计还有<span className="bg-green-300 dark:bg-slate-200 p-1 rounded">{{ Math.round((book.quantity-book.pro)/book.goal)  }}
            </span>天完成</p>
    <label className="mt-10 block">
        已完成{{ pointer }}
        <input type="range" min="0" max="100" value="0" step="1" className="range range-xs" disabled /> 
    </label>
        <p>{{  book.pro}}/{{ book.quantity }}词</p>
       </div>
     </div>
      <div className="grow-8">
        <p className="m-auto text-center">-今日任务-</p>
        <div className=" flex flex-row task">
        <div v-for="(task,index) in tasks" :key="index" className="grow">
            <div className="text-center text-2xl font-bold">{{ task.val }}</div>
            <div className="text-center text-xl">{{ task.name }}</div>
        </div>
    </div>
    </div>
    <p className="absolute right-2 top-1/4 dark:bg-slate-200 bg-green-400 text-white rounded-l-lg p-1 hover:cursor-pointer hover:scale-105" 
    @click="toWords">
    <book-one theme="outline" size="24" fill="white"/>词表</p>
</div>
<div className="flex items-center flex-col">
<button className="btn w-60 bg-green-300 my-3 text-white text-2xl font-medium dark:bg-slate-300 mx-auto" @click="toLearning">开始学习</button>
    <div className="divider dark:text-white">{{ odor.assign_date }}</div>
     <div class="w-full h-full flex flex-col p-6">
        <p className="dark:text-white">{{ odor.content }}</p>
        <p className="dark:text-white">{{ odor.translation }}</p>
        <p className="text-slate-400 text-right dark:text-zinc-100">———{{ odor.author }}</p>
</div>
</div>
</div>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { Odor } from '../../Types';
import { http } from '../../http';
import { useBookSettings, useSettings } from '../../stores';
import { BookOne } from '@icon-park/vue-next/';
import { useRouter } from 'vue-router';
const router=useRouter();
const st = useSettings();
const bst=useBookSettings();
let book=reactive({_id:"",name:"",pic:"",quantity:0,pro:0,goal:bst.goal,finished:0});
let load=ref(false);
let newFinished=ref(bst.newFinished);
let oldFinished=ref(bst.oldFinished);
let pointer=computed(()=>{
return ((book.pro+oldFinished.value+newFinished.value)/book.quantity).toFixed(2)+"%";
})
let tasks=computed(()=>{
   return [{name:"新学单词",val:book.goal-newFinished.value}
   ,{name:"复习单词",val:book.goal*3-oldFinished.value},
   {name:"所有单词",val:book.goal*4-oldFinished.value-newFinished.value}]
})
const odor = inject<Odor>('odor')!;
function toWords(){
  router.push({path:"/book/words",query:{bookId:book._id,goal:book.goal,pro:book.pro,quantity:book.quantity}});
}
function toLearning(){
  router.push({path:"/book/learning",query:{bookId:book._id,goal:book.goal,pro:book.pro,quantity:book.quantity}});
}
onMounted(async()=>{
    load.value=true;
    const information=(await http<{},any>("/book"));
    //@ts-ignore
    for(let key in book){book[key]=information.book[key]};
    book.quantity=information.quantity;
    bst.$patch({bookId:book._id,quantity:book.quantity});
    load.value=false;
    console.log(information)
})
</script>
<style lang="less" scoped>
.card div,.card figure{
    margin: 1rem;
}
</style>