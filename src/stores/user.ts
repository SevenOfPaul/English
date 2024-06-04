import { defineStore } from "pinia";

export const useUser = defineStore("useUser", {
  state: () =>({ 
    online:!!localStorage.getItem("token"),
    name:"",
    create_at:"",
    pic:"http://localhost:4320/public/pictures/users/default.jpg",
    token:localStorage.getItem("token")?localStorage.getItem("token")!:"",
  })
});