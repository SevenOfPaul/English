<template>
  <div
    className="card w-1/1 bg-base-100 shadow-xl leading-5 
     text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10 flex flex-row h-100 dark:bg-zinc-400"
  >
    <div
      className="card w-1/1 bg-base-100 shadow-xl leading-5 p-4
     text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10 dark:bg-zinc-400"
    >
      <p>
        当前由传统机器翻译
        <a
          href="https://translate.appworlds.cn"
          target="blank"
          className="link link-primary"
          >通用领域模型</a
        >为您翻译
      </p>
      <textarea
        placeholder="请输入文本"
        className="textarea textarea-bordered textarea-lg w-full h-full dark:bg-zinc-400"
        v-model="text"
      ></textarea>
    </div>
    <div
      className="card w-1/1 bg-base-100 shadow-xl leading-5 p-4
     text-slate-900  shadow-black/5 ring-1 ring-slate-700/10 dark:bg-zinc-400"
    >
      <div v-show="showLoad">
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
      <p v-show="!showLoad">{{ result }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref, watch } from "vue";
import { useSettings } from "../stores";
const st = useSettings().$state;
let text = ref<string>("");
let result = ref<string>("");
let showLoad = ref<Boolean>(false);
watch(text, async () => {
  const controller = axios.CancelToken.source();
  if (!st.energy.val) showLoad.value = true;
  //后期修改
  const temp =  (
    await axios.get(`/transform/${text.value}`, {
      //@ts-ignore
      controller,
      cancelToken: controller.token,
    })
  ).data;
  //节流放在http模块里了，temp可能为null
  result.value = temp ? temp : result.value;
  //去除杂质
  result.value = result.value.replace(/&#39;/g, "'");
  showLoad.value = false;
});
</script>
<style lang="less" scoped>
.textarea {
  resize: none;
  border: none;
  outline: none;
}
</style>
