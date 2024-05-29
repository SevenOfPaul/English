<template>
    <div className="card w-120 bg-base-100 shadow-xl mx-auto flex flex-col items-center p-5 min-h-100 justify-around">
        <p className="font-sans font-semibold text-2xl m-3">欢迎来到士刀单词</p>
<Email  @email-and-code="(params:any)=>{
    user.email=params.email;
    user.verifyCode=params.verifyCode;
}"/>
<label className="w-2/3">
    <input type="text" placeholder="请输入姓名" className="input input-bordered input-secondary w-full" v-model="user.name" />
</label>
<label className="w-2/3">
    <p className="mb-2">请上传头像</p>
<input type="file" className="file-input file-input-bordered file-input-info w-full"  accept="image/*" @change="updatePic"/>
</label>
<PassWord message="请输入密码" @password="(params:any)=>{
user.newPassword1=params.password;
}"/>
<PassWord message="请再次输入密码" @password="(params:any)=>{
user.newPassword2=params.password;
}"/>
  <button className="btn bg-green-300 w-2/3 disabled:bg-slate-400" :disabled="empty" @click="register">注册账号</button>
</div>
</template>
<script setup lang="ts">
import Email from '../../components/Email.vue';
import PassWord from "../../components/PassWord.vue"
import { md5 } from 'js-md5';
import validator from 'validator';
import { reactive, computed } from 'vue';
import { check, isNotEmpty, isEqual } from '../../api';
import { http } from '../../http';
import { useUser } from '../../stores';
const user=reactive({email:"",name:"",newPassword1:"",newPassword2:"",verifyCode:"",pic:""});
let empty=computed(()=>{
    console.log(user)
   for(let key in user){
    //@ts-ignore
    if(validator.isEmpty(user[key])){
        return true
    }
   }
   return false
})
async function updatePic(event:Event){
    let param = new FormData(); //创建form对象
    //@ts-ignore
        param.append('pic',event.target!.files[0],event.target!.value);
        user.pic=await http({ url: "/user/addPic", method: "Post", data: param, headers: { 'Content-Type': 'multipart/form-data' } });
}
async function register(){
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
    //注册账号
    const {email,pic,verifyCode,name}=user;
      const {resName,token,create_at,picPath}=(await http.post("/user/verify",{email,name,pic,verifyCode,password:md5(user.newPassword1)})).data;
    const userController=useUser();
    userController.$patch({online:true,name:resName,create_at,token,pic:picPath})
  }
  
}

</script>
<style lang="less" scoped>

</style>