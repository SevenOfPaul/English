<template>
    <label className="input input-bordered flex items-center gap-2 w-2/3">
  <input type="text" className="grow m-3 w-full" placeholder="请输入邮箱"  v-model="user.email" />
   <button class="w-40 hover:text-green-400" @click="sendEmail">发送验证码</button>
</label>
<label className="input input-bordered flex items-center gap-2 w-2/3">
  <input type="text" className="grow m-3 w-full" placeholder="请输入验证码"  v-model="user.verifyCode" @change="()=>{
            emit('emailAndCode',{email:user.email,verifyCode:user.verifyCode})
  }"/>
</label>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { check } from '../api';
//@ts-ignore
import validator from "validator"
import axios from 'axios';

const emit = defineEmits(['emailAndCode']);
let user=reactive({email:"g13136918273@gmail.com",verifyCode:""});
async function sendEmail(){
    if(check(user,[{key:"email",fn:validator.isEmail,info:"请输入正确的邮箱"}])){
        await axios.post("/user/sendMail",{email:user.email});
    }
}

</script>
<style lang="less" scoped>

</style>