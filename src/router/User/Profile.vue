<template>
<div className="card w-96 bg-base-100 shadow-xl flex flex-row dark:bg-slate-300">
  <figure><img :src="user.pic" alt="Shoes" className="w-40 h-30" /></figure>
  <div className="card-body">
    <h2 className="card-title">昵称：{{ user.name }}</h2>
    <p>账号创建于：  {{ user.create_at }}</p>
  </div>
</div>

</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { http } from '../../http';

let user=reactive({name:"",create_at:"",pic:""});
onMounted(async ()=>{
    const information=(await http<{},{pic:"",name:"",create_at:""}>("/user/getProfile"));
          //@ts-ignore
    for(let k in user){if(information[k]){user[k]=information[k]}};
})

</script>
<style lang="less" scoped>


</style>