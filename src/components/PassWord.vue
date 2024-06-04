<template>
<label className="input input-bordered flex items-center gap-2 w-2/3">
  <input :type="passwordSetting.show?'text':'password'" className="grow m-3" :placeholder="props.message" v-model="password"
  @change="emit('password',{password})" />
  <button @mouseover="()=>{passwordSetting.color='#86efac'}" @mouseout="()=>{passwordSetting.color='#9ca3af'}" @click="()=>{
    passwordSetting.show=! passwordSetting.show
  }">
    <preview-open theme="outline" size="24" :fill="passwordSetting.color" v-show="passwordSetting.show"/>
    <preview-close-one theme="outline" size="24" :fill="passwordSetting.color"  v-show="!passwordSetting.show"/>
  </button>
</label>
</template>
<script setup lang="ts">
import { reactive,ref } from 'vue';
const emit = defineEmits(['password']);
let passwordSetting=reactive({show:false,color:"#9ca3af"});
let password=ref("12345678");
const props = defineProps(['message']);
</script>
<style lang="less" scoped>


</style>