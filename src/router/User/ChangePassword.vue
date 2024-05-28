<template>
    <div className="card w-120 bg-base-100 shadow-xl mx-auto flex flex-col items-center p-5 h-100 justify-around">
        <p className="font-sans font-semibold text-2xl m-3">欢迎来到士刀单词</p>
<Email  @email-and-code="(params)=>{
    user.email=params.email;
    user.verifyCode=params.verifyCode;
    console.log(user);
}"/>
<PassWord message="请输入密码" @password="(params)=>{
user.newPassword1=params.password;
}"/>
<PassWord message="请再次输入密码" @password="(params)=>{
user.newPassword2=params.password;
}"/>
  <button className="btn bg-green-300 w-2/3 disabled:bg-slate-400" :disabled="empty" @click="changePassword">重置密码</button>
</div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue';
  // @ts-ignore
import validator from "validator"
import Email from '../../components/Email.vue';
import PassWord from "../../components/PassWord.vue"
import { check, isNotEmpty,isEqual } from '../../api';
import { md5 } from 'js-md5';
import { http } from '../../http';
const user=reactive({email:"",newPassword1:"",newPassword2:"",verifyCode:""});
let empty=computed(()=>{
   for(let key in user){
    //@ts-ignore
    if(validator.isEmpty(user[key])){
        return true
    }
   }
   return false
})
async function changePassword(){
  if(check(user,[{key:"email",fn:validator.isEmail,info:"邮箱格式错误"},{
    key:"verifyCode",fn:isNotEmpty,info:"验证码不可为空"
  },{
    key:"newPassword1",fn:isEqual,info:"两次输入密码必须相等",arguments:[user.newPassword2]
  },{
    key:"newPassword1",fn:validator.isByteLength,info:"密码长度必须为6-9",arguments:[{ min: 6, max: 9 }]
  }
  ,{
    key:"newPassword2",fn:validator.isByteLength,info:"密码长度必须为6-9",arguments:[{ min: 6, max: 9 }]
  }
])){
    //修改密码成功
 await http.post("/user/changePassword",{newPassword:md5(user.newPassword1),verifyCode:user.verifyCode});
  }
}
</script>

<style lang="less" scoped>


</style>