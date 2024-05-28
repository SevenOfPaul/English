<template>
    <div className="container bg-slate-200 dark:bg-zinc-900 flex flex-col justify-center items-center
    min-h-100%">
      <Message />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { onMounted, provide, reactive } from "vue";
import Message from "./components/Message.vue";
import { Odor } from "./Types";

import {http} from "./http";
import { useSettings } from "./stores";
//需要修改
let odor = reactive<Odor>({
  assign_date: "",
  author: "",
  content: "",
  translation: "",
  imgUrl: "",
});
provide("odor",odor);
// document.className="dark";
useSettings().$subscribe((_,state)=>{
  const html=document.childNodes[1] as HTMLElement;
   if(state.night.val) html.className="dark"
   else html.className=""
})
onMounted(async () => {
  const response = await http.get("/odor");
  for (let k in odor) {
    //@ts-ignore
    odor[k] = response[k];
    //@ts-ignore
    if (k == "imgUrl") odor[k] = response["origin_img_urls"][0];
  }
});

</script>

<style lang="less" scoped>

</style>
