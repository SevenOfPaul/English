<template>
<dialog ref="box" className="modal modal-bottom sm:modal-middle dark:bg-zinc-400">
  <div className="modal-box w-1/3 dark:bg-zinc-600">
    <h3 :className="`${boxController.color } font-bold text-lg text-center`">{{boxController.level}}</h3>
    <p :className="`${boxController.color } py-4 text-center`"> {{ boxController.info }}</p>
    <div className="modal-action flex justify-center">
      <form method="dialog">
        <button :className="`btn w-30 ${boxController.color } dark:bg-zinc-600`">关闭</button>
      </form>
    </div>
  </div>
</dialog>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from '../stores';
let boxController=useMessage();
const box=ref<any>(null);
  boxController.$subscribe((_,state) =>{
    box.value.showModal();
for(let k in state){
 if(boxController.hasOwnProperty(k)){
    //@ts-ignore
  boxController[k]=state[k];
 }
}
  })
</script>
<style lang="less" scoped>


</style>