<template>
    <p className="text-black text-4xl m-6 font-sans font-semibold">我在士刀学习
        <span className="font-extrabold">好多</span>天</p>
        <div></div>
        <button className="btn w-60 bg-green-300 my-3 mx-auto text-white text-2xl font-medium dark:bg-slate-300">开始学习</button>
    <div className="divider dark:text-white">{{ odor.assign_date }}</div>
     <div class="w-full h-full flex flex-col p-6">
        <p className="dark:text-white">{{ odor.content }}</p>
        <p className="dark:text-white">{{ odor.translation }}</p>
        <p className="text-slate-400 text-right dark:text-zinc-100">———{{ odor.author }}</p>
</div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { Odor } from '../../Types';

// import { RouterLink } from 'vue-router';
const odor = inject<Odor>('odor')!;
</script>
<style lang="less" scoped>


</style>