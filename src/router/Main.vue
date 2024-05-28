<template>
 <div className="mb-4 h-max-223 w-3/4  m-auto min-h-100">
            <Tab></Tab>
            <RouterView/>
    </div>
    <div className="footer w-full h-60  bg-clip-content relative">
      <div className="absolute top-12 left-20">
        <p className="text-white text-4xl font-sans dark:text-slate-300">士刀单词</p>
        <p  className="text-slate-300 text-2xl font-sans dark:text-slate-400">坚持学习，未来可期</p>
      </div>
    </div>

</template>
<script setup lang="ts">
import Tab from "../components/Tab.vue"

</script>
<style lang="less" scoped>
.footer {
  background-image: url("http://localhost:4320/public/pictures/logoes/80830894.png");
}

</style>