<template>
      <div className="navbar bg-green-300  rounded-md mb-3 dark:text-white dark:bg-zinc-500">
        <img
          className="m-r-2"
          src="http://localhost:4320/public/pictures/logoes/white.png"
        />
        <div className="flex-1">
          <RouterLink v-for="tab in tabs" :to="tab.path" :key="tab.path">
            <div className="btn btn-ghost text-xl">{{ tab.name }}</div>
          </RouterLink>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              v-model="searchText"
              @keydown.enter="search()"
              className="input input-bordered w-24 md:w-auto focus:caret-indigo-500"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex="{0}"
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full" @dblclick="toProfile">
                <img
                  alt="Tailwind CSS Navbar component"
                  :src="pic"
                />
              </div>
            </div>
            <ul
              tabIndex="{0}"
              className="mt-3 z-[1] p-2 shadow menu menu-sm shadow-slate-500/50 dropdown-content
              dark:text-white
              dark:bg-zinc-600 
              bg-base-100 rounded-box w-52 justify-center items-center "
            >
              <RouterLink v-for="sT in showTab" :key="sT.path" :to="sT.path" >
                <li className="hover:text-slate-500 p-2">{{
                sT.name
              }}
              </li></RouterLink>
            </ul>
          </div>
        </div>
      </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
// import {http} from '../http';
import {  onMounted, ref } from 'vue';
import { useUser } from '../stores';
const router=useRouter();

const tabs = [
  { name: "首页", path: "/" },
  { name: "单词", path: "/" },
  { name: "翻译", path: "transform" },
  { name: "听力", path: "/listen" },
  { name: "短文", path: "/" },
  { name: "社区", path: "/" },
];
const showTab = true
  ? [
      { name: "个人信息", path: "/user/profile" },
      { name: "设置", path: "/setting" },
      { name: "退出登录", path: "/logOut" },
    ]
  : [{ name: "登录", path: "/logIn" }];
  const user=useUser();
 const searchText=ref("");
 async function search(){
// const data=await http.get(`/search/${searchText.value}`);
 }
 function toProfile(){
  router.push(`/user/profile`);
 }
 const pic=ref("");
 onMounted(()=>{
  pic.value=user.pic;
  console.log(pic)
 })
</script>
<style lang="less" scoped>


</style>