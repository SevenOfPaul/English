<template>
  <div className="flex flex-row flex-wrap  grow-0 justify-around">
    <div className="card w-96 bg-base-100 shadow-xl dark:bg-zinc-600">
      <div className="card-body" v-for="(st,index) in settings" :key="index">
        <label className="cursor-pointer label">
          <span className="label-text text-xl dark:text-white">{{ st[0].name }}</span>
          <input type="checkbox" className="toggle toggle-md toggle-success" :checked="!!st[0].val" @change="st[0].check(sTcontroller)"/>
        </label>
        <div className="divider"></div>
        <label className="cursor-pointer label">
          <span className="label-text text-xl dark:text-white">{{ st[1].name }}</span>
          <input type="checkbox" className="toggle toggle-md toggle-success" :checked="!!st[1].val"  @change="st[1].check(sTcontroller)"/>
        </label>
      </div>  
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useSettings } from "../stores/index";
import { Store } from "pinia";
class Setting {
  val: boolean;
  name: string;
  key: string;
  constructor(name: string, key: string, val: boolean) {
    this.name = name;
    this.key = key;
    this.val = val;
  }
  check(controller:Store) {
      //@ts-ignore
      this.val=!this.val;
    controller.$patch({[this.key]:{val:this.val}});
  }
}
let sTcontroller = useSettings();
const settings = reactive<Setting[][]>([]);
for(let key in sTcontroller.$state){
  //@ts-ignore
   //@ts-ignore
  if(!parseInt(sTcontroller.$state[key].id%2)){
  // @ts-ignore
    settings.push([new Setting(sTcontroller.$state[key].name,key,sTcontroller.$state[key].val)]);
  }else{
      //@ts-ignore
     settings[parseInt(sTcontroller.$state[key].id/2)].push(new Setting(sTcontroller.$state[key].name,key,sTcontroller.$state[key].val));
  }
}
</script>
<style lang="less" scoped></style>
