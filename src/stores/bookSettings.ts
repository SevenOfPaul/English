import { defineStore } from "pinia";

export const useBookSettings=defineStore("bookSetting",{
    state:()=>({
        bookId:"",
        goal:10,
        sequence:"study"
    })
})