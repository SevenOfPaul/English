<template>
    <Transition v-motion-fade>
<div className="w-2/3 mx-auto my-5 relative flex justify-center flex-col" v-if="show.word">
    <div className="text-center mb-20">
        <p className="font-sans font-semibold text-3xl m-3">{{showWord.word  }}</p>
        <p @click="()=>play(audio)" className="font-sans font-semibold text-2xl m-3 text-slate-300 flex flex-row justify-center hover:cursor-pointer hover:text-green-300 w-30 h-10 text-center  pt-1 mx-2 items-center">
            {{showWord.phonetic_symbol  }}
                <Play theme="outline" size="24" fill="#cbd5e1" className="hover:green-300"/>
            </p>
        <div className="mt-20">
        <button className="btn btn-outline btn-accent w-full m-1" @click="know">1. 认识</button>
        <button className="btn btn-outline btn-error w-full m-1" @click="dontKnow">2. 不认识</button>
        </div>
    </div>
    <div className="absolute top-3 right-9  flex flex-row hover:cursor-pointer " @click="easy">
        <delete-two theme="outline" size="24" fill="#333"/>删除</div>
    <p className="text-white absolute bottom-0 left-1/2 z-50">{{ contents.val.length-finishedNumber }}</p>
    <progress className="progress progress-success w-full h-6  mx-auto" :value="finishedNumber" :max="contents.val.length-1">
    </progress>
</div>
</Transition>
<Transition v-motion-fade>
<Word v-if="!show.word" :word="showWord" :audio="audio" @next="next" @play="play"/>
</Transition>
<audio :src="`https://dict.youdao.com/dictvoice?audio=${showWord.word}&type=1`" ref="audio"></audio>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { http } from '../../http';
import {DeleteTwo,Play} from "@icon-park/vue-next"
import { useBookSettings } from '../../stores';
const bst=useBookSettings();
const contents=reactive({val:[] as any[]});
import Word from "../Word.vue"
import { useRouter } from 'vue-router';
import shuffle from '../../hooks/shuffle';
let studyWords=ref<any[]>([]);
let show=ref({word:true});
const router=useRouter();
let finishedNumber=ref(0);
const audio=ref<HTMLAudioElement|null>(null);
const type=bst.sequence;
let showWord=ref({initial:"",mean:"",word:"",phonetic_symbol:"",_id:"",type:"",study:3});
function easy(){
    show.value.word=!show.value.word;
    finishedNumber.value+=1
    return
}
function play(element:HTMLAudioElement|null){
    element!.play();
}
function know(){
    if(finishedNumber.value==contents.val.length-1){
        router.replace("/");
    }
    show.value.word=!show.value.word;
     let word=contents.val.find(c=>c._id== showWord.value._id);
    if(word.study==3){ finishedNumber.value+=1;return}
    word.study+=1;
}
function dontKnow(){
    show.value.word=!show.value.word;
    //添加两遍
    for(let i=2;i>=0;i--){studyWords.value.push(showWord.value)}
    studyWords.value=shuffle(type,studyWords.value,8);
    let word=contents.val.find(c=>c._id== showWord.value._id);
    word.study=0;
}
function next(){
    show.value.word=!show.value.word
    const i=studyWords.value.findIndex(w=>{if( w._id==showWord.value._id){w.finished=1;return true}});
    studyWords.value.splice(i,1);
    showWord.value=studyWords.value[i];
}
onMounted(async()=>{
    contents.val=[...await http.post<{},[]>("/book/contentOfGoal",{bookId:bst.bookId,todyFinished:0,goal:bst.goal})];
    contents.val.forEach((c,i:number)=>{if(i<contents.val.length-bst.goal) c.type="old" 
    else c.type="new"
    c.finished=0;
    c.study=3;
    studyWords.value=[...contents.val]
    showWord.value=studyWords.value[0];
});
})
onUnmounted(async()=>{
   await http.post("/book/learned",{bookId:bst.bookId,todayFinished:finishedNumber.value});
   bst.$patch({oldFinished:0,newFinished:0});
})

</script>
<style lang="less" scoped>


</style>