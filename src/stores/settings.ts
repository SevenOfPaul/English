import { defineStore } from "pinia";

const localSetting=localStorage.getItem("settings")?JSON.parse(localStorage.getItem("settings")!):{ 
  night:{id:0,name: "夜间模式", key: "night", val: false },
  energy:{id:1, name: "节能模式", key: "energy", val: false },
};
export const useSettings = defineStore("useSettings", {
  state: () =>({night:localSetting.night,energy:localSetting.energy})});
