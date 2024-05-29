import { defineStore } from "pinia";

export const useUser = defineStore("useUser", {
  state: () =>({ 
    online:false,
    name:"",
    create_at:"",
    pic:"",
    token:"",
  }),getters:{
    _setToken:(state)=>{
      if(state.online){
        localStorage.setItem("token",state.token)
      }else{
        localStorage.clear();
      }
    }
  }
});
