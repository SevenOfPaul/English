import { defineStore } from "pinia";

export const useBookSettings=defineStore("bookSetting",{
    state:()=>({
        bookId:"",
        goal:10,
        sequence:"study",
        newFinished:0,
        oldFinished:0,
        quantity:0
    })
})