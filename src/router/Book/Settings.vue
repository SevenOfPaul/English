<template>
<label>学习顺序
    <input type="radio" name="order" className="radio" value="review" :checked="bookSettingController.sequence=='review'" 
    @change="changeSetting"
    />复习优先
<input type="radio" name="order" className="radio" value="study" 
@change="changeSetting"
:checked="bookSettingController.sequence=='study'"
/>新词优先
</label>
<label>学习量
    <input type="range" min="5" max="25" :value="bookSettingController.goal" className="range" step="5" @change="changeSetting"/>
<div className="w-full flex justify-between text-xs px-2">
  <span>5</span>
  <span>10</span>
  <span>15</span>
  <span>20</span>
  <span>25</span>
</div>
</label>
</template>
<script setup lang="ts">
import { http } from "../../http";
import {useBookSettings} from "../../stores/index"
const bookSettingController=useBookSettings();
async function changeSetting(e:Event){
  //@ts-ignore
  if(!parseInt(e.target!['value'])){
      //@ts-ignore
    bookSettingController.$patch({sequence:e.target!['value']})
  }else{
      //@ts-ignore
    bookSettingController.$patch({goal:e.target!['value']});
  }
  await http.post("book/settings",{bookId:bookSettingController.bookId,goal:bookSettingController.goal,sequence:bookSettingController.sequence});
}

</script>
<style lang="less" scoped>
label{
  margin:0.5rem auto;
}
label:first-of-type{
  margin:1rem auto;
}

</style>