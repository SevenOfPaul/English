<template>
    <div className="card w-1/1 bg-base-100 shadow-xl leading-5 
     text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10 flex flex-row h-full ">
     <div className="card w-1/1 bg-base-100 shadow-xl leading-5 p-4
     text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
     <p>当前由传统机器翻译 <a href="" className="link link-primary">通用领域模型</a>为您翻译</p>
<textarea placeholder="请输入文本" className="textarea textarea-bordered textarea-lg w-full h-full"></textarea>
     </div>
     <div className="card w-1/1 bg-base-100 shadow-xl leading-5 p-4
     text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
     </div>
</div>


</template>
<script setup lang="ts">


</script>
<style lang="less" scoped>
.textarea{
    resize: none;
    border: none;
    outline:none;
}

</style>