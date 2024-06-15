<template>
  <div className="flex flex-row">
    <div className="w-0.15 mr-2">
      <p
        v-for="tab in tabs"
        :key="tab.name"
        class="hover:cursor-pointer w-7/10 p-7 text-xl border-slate-0  border-r-4  
    hover:text-green-300
    hover:border-green-400
    max-h-20"
    :class="{'text-green-300':show.name==tab.name,
    'border-green-400':show.name==tab.name}"
        @click="changeTab"
      >
        {{ tab.name }}
      </p>
    </div>
    <div className=" w-0.85 h-100">
      <p className="text-right px-3 text-slate-300">共{{ show.quantity }}词</p>
      <div className="overflow-x-auto mx-4">
        <table className="table">
          <div v-show="!settingController.energy.val&&!animate" className="mx-auto text-center h-100">
            <span className="loading loading-bars loading-xs"></span>
               <span className="loading loading-bars loading-sm"></span>
                 <span className="loading loading-bars loading-md"></span>
               <span className="loading loading-bars loading-lg"></span>
          </div>
          <!-- 写四个-->
          <Transition v-motion-fade>
          <tbody className="flex flex-row flex-wrap justify-around" v-show="animate">
            <tr
              className="hover w-1/2 flex flex-row flex-wrap hover:cursor-pointer m-1 max-w-80 "
              v-for="content in show.val" 
              @dblclick="()=>toWords(content)"
            >
              <td className="font-sans font-bold w-full h-8 truncate">
                {{ content.word }}
              </td>
              <td className="h-8 truncate w-3/5">{{ content.mean }}</td>
              <td className="h-8 truncate w-2/5">{{ content.phonetic_symbol }}</td>
            </tr>
          </tbody>
        </Transition>
        </table>
      </div>
      <div className="join flex justify-center my-3">
        <button className="join-item btn" @click="changePage('prev', show)">
          «
        </button>
        <button className="join-item btn" disabled>{{ show.page }}页</button>
        <button className="join-item btn" @click="changePage('next', show)">
          »
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { http } from "../../http";
import { useRoute } from "vue-router";
import {useSettings} from "../../stores/index";
import router from "..";
const route = useRoute();
const { bookId, goal, quantity, pro, number = 10 } = route.query;
const settingController=useSettings();
const animate=ref(true);
const tabs = reactive([
  {
    name: "今日新词",
    page: 1,
    number: 10,
    pro,
    quantity: goal,
    goal,
    val: [],
    url: "/book/new/page",
  },
  {
    name: "今日复习",
    page: 1,
    number,
    pro,
    quantity: (goal as unknown as number) * 3,
    val: [],
    url: "/book/review/page",
    goal,
  },
  {
    name: "已学单词",
    page: 1,
    number,
    pro: 0,
    quantity: pro,
    val: [],
    url: "/book/learned/page",
    goal,
  },
  {
    name: "未学单词",
    page: 1,
    number,
    pro,
    quantity: (quantity as unknown as number) - (pro as unknown as number),
    goal,
    val: [],
    url: "/book/study/page",
  },
]);
const show = reactive({
  name: "今日新词",
  val: [] as any[],
  quantity: "0",
  page: 1,
});
async function changeTab(event: MouseEvent) {
  //@ts-ignore
  const params = tabs.find((tab) => tab.name == event.target!["innerText"])!;
  show.name = params.name;
  show.page = params.page;
  getPageData(params, show);
}
async function changePage(type: string, show: any) {
  if (type == "prev" && show.page - 1 >= 1) {
    show.page = show.page -= 1;
    // @ts-ignore
  } else if (type == "next" && show.page + 1 <= parseInt(show.quantity)/number) {
    show.page = show.page += 1;
  }
  //@ts-ignore
  const params = tabs.find((tab) => tab.name == show.name)!;
  console.log(show, params);
  params.page = show.page;
  getPageData(params, show);
}
async function getPageData(params: any, show: any) {
  animate.value=false;
  params.page = show.page;
  const data = await http.post<any, any>(params.url, {
    page: params.page,
    bookId,
    goal: params.goal,
    number: params.number,
    pro: params.pro,
  });
  show.val = data;
  show.quantity = params.quantity as string;
  params.val.push(data);
  animate.value=true;
}
function toWords(data:any){
  router.push({path:"/search", query:{word:JSON.stringify(data)}})
}
onMounted(async () => {
  //@ts-ignore
  const params = tabs.find((tab) => tab.name == "今日新词");
  getPageData(params, show);
});
</script>
<style lang="less" scoped></style>
