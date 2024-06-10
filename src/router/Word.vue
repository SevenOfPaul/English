<template>
<div className="relative w-2/3 mx-auto my-5 flex justify-center flex-col text-center">
    <div className="absolute top-15 right-2 hover:cursor-pointer flex flex-row" @click="()=>emit('next')">
        <double-right theme="outline" size="24" fill="#7e7e7e"/>下一个</div>
    <p className="font-sans font-semibold text-3xl m-3 ">{{word.word  }}</p>
        <p className="font-sans font-semibold text-2xl m-3 text-slate-300">{{word.phonetic_symbol  }}
            <span @click="()=>play(audio)" className="hover:cursor-pointer hover:text-green-300">播放</span></p>
            <p className="font-semibold text-2xl m-3">{{ word.mean }}</p>
</div>
<audio :src="`https://dict.youdao.com/dictvoice?audio=${word.word}&type=1`" ref="audio"></audio>
</template>
<script setup lang="ts">
import {  ref } from 'vue';
import {DoubleRight} from "@icon-park/vue-next";
const {word}=defineProps(['word']);
const emit=defineEmits(["next"]);
const audio=ref(null);
function play(element:HTMLAudioElement|null){
    element!.play();
}
</script>
<style lang="less" scoped>


</style>