<template>
  <ul className="flex flex-row w-100 flex-1 pt-3 px-3">
    <RouterLink v-for="tab in tabs" :to="tab.path" :key="tab.name">
      <li className="w-25 text-center text-lg dark:text-white">
        {{tab.name}}
      </li>
      </RouterLink>
  </ul>
  <div className="card card-compact w-full bg-base-100 shadow-xl dark:bg-zinc-400">
  <RouterView/>
</div>
</template>
<script setup lang="ts">
const tabs = [
  {
    path: "/",
    name: "学单词",
  },
  {
    path: "/book",
    name: "单词书",
  },
  {
    path: "/add",
    name: "上传单词",
  },
  {
    path: "/homeSettings",
    name: "设置",
  },
];
</script>
<style lang="less" scoped>
.router-link-exact-active li{
   color:#16a34a;
   border-bottom: solid #16a34a 2px
}

</style>
