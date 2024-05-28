import { defineStore } from "pinia";

export const useUser = defineStore("useUser", {
  state: () =>({ 
    online:false,
    id:"",
    name:"",
    email:"",
    crate_at:"",
    pic:"",
    token:"",
  })
});
