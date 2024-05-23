<template>
  <main className="w-3/4 m-auto h-96 h-max-223">
       <div className="mb-4">
        <div className="navbar bg-base-100 bg-green-300  rounded-md ">
            <img className="m-r-2" src="http://localhost:4320/public/pictures/logoes/white.png"/>
            <div className="flex-1">
                <RouterLink v-for="tab in tabs" :to="tab.path" className="btn btn-ghost text-xl">{{ tab.name }}</RouterLink>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="http://localhost:4320/public/pictures/users/default.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm  dropdown-content bg-base-100 rounded-box w-52 justify-center items-center">
                     <RouterLink v-for="sT in showTab" to="showTab">{{ sT.name }}</RouterLink>
                    </ul>
                </div>
            </div>
        </div>
        </div> 
      <RouterView/></main>
</template>
<script setup lang="ts">
   const tabs =[
        { name: "首页" ,path:"/"},
        { name: "单词",path:"/" }, 
        { name: "翻译",path:"transform" },
        {name:"听力",path:"/"},
        {name:"短文",path:"/"},
        {name:"社区",path:"/"}
    ];
    const showTab=true?[
        { name: "个人信息" ,path:"/"},
        { name: "设置",path:"/setting" }, 
        { name: "退出登录" }
    ]:[{ name:"登录"}];
</script>

<style scoped>
</style>
