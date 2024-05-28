<template>
<div className="card w-120 bg-base-100 shadow-xl mx-auto flex flex-col items-center p-5 h-75 justify-around">
    <p className="font-sans font-semibold text-2xl m-3">欢迎来到士刀单词</p>
    <label className="input input-bordered flex items-center gap-2 w-2/3">
  <input type="text" className="grow m-3 w-full" placeholder="请输入邮箱"  v-model="user.email" />
</label>
<PassWord @password="(params)=>{
user.password=params.password;
}"/>
    <ul className="flex flex-row justify-around w-full">
        <li>还没有账号<RouterLink to="/user/register" className="text-green-300">去注册</RouterLink></li>
        <li><RouterLink to="/user/changePassword" className="text-green-300">忘记密码</RouterLink></li></ul>
        <div className="text-xs text-green-400">登录注册代表同意用户使用协议和隐私政策</div>
        <button className="btn bg-green-300 w-2/3 disabled:bg-slate-400" :disabled="empty" @click="login">登录</button>
</div>

</template>
<script setup lang="ts">
import PassWord from "../../components/PassWord.vue";
import { computed, reactive } from "vue";
//@ts-ignore
import crypto from "crypto"
//@ts-ignore
import validator from "validator"
import { check } from "../../api";
import { http } from "../../http";
import {md5} from "js-md5"
/*
 **
 * email 3167385363@qq.com
 * password password
*/
let user=reactive({email:"",password:""});
let empty=computed(()=>{
   return validator.isEmpty(user.email)||validator.isEmpty(user.password)
})
async function login(){
  if(check(user,[{key:"email",fn:validator.isEmail,info:"邮箱格式错误"},{
    key:"password",fn:validator.isByteLength,info:"密码长度必须为6-9",arguments:[{ min: 6, max: 9 }]
  }])){
    //登录成功
    console.log(await http.post("/user/login",{email:user.email,password:md5(user.password)}));
  }
}
</script>
<style lang="less" scoped>


</style>