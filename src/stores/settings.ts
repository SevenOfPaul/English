import { defineStore } from "pinia";

export const useSettings = defineStore("useSettings", {
  state: () =>({ 
    night:{id:0,name: "夜间模式", key: "night", val: false },
    energy:{id:1, name: "节能模式", key: "energy", val: false },
  })
});
