import { createWebHistory, createRouter, useRouter } from "vue-router";
import { useMessage, useUser } from "../stores";
const routes=[
  {
    path:"/",
    component:()=>import("./Main.vue"),
    children:[
      {
        path: "/",
        component: () => import("./Home/Home.vue"),
        children: [
         {
          path:"/",
          component:()=>import("./Home/Study.vue")
         },{
          path:"/books",
          component:()=>import("./Home/Books.vue")
         },{
          path:"/",
          children:[
            {
              path:"/book/words",
              component:()=>import("./Book/Words.vue"),
            },
            {
              path:"/book/settings",
              component:()=>import("./Book/Settings.vue"),
             },{
              path:"/book/learning",
              component:()=>import("./Learning.vue")
            }]
        }
        ],
      },{
        path: "/transform",
        component: () => import("./Transform.vue"),
      },{
        path: "/setting",
        component: () => import("./Setting.vue"),
      }
    ]
  },{
    path:"/",
    children:[
      {
        path:"/user/register",
        component:()=>import("./User/Register.vue"),
       },
      {
        path:"/user/login",
        component:()=>import("./User/Login.vue")
       },{
        path:"/user/profile",
        component:()=>import("./User/Profile.vue"),
        meta: { requiresAuth: true },
       },{
        path:"/user/changePassword",
        component:()=>import("./User/ChangePassword.vue"),
       }
    ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeResolve((to)=>{
  const online=useUser().online;
  console.log(online)
  if(to.meta.requiresAuth&&!online){
    const router=useRouter();
    router.push("/user/login")
    return false
  }
  if(!to.matched.length){
    //弹窗
    const message=useMessage();
    message.$patch({level:"Error",info:"该功能暂未开放"});
    return false
  }
  // next();
})
export default router;
