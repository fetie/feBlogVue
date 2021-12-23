<template>
  <div class="history-box">
    <fullpage @scroll="mapScroll" :skip="skipMap" :isTransition="false">
      <div class="history-img" v-for="(item) in ImgArr">
        <img :src="item" alt="" @load="imgComplete">
      </div>
    </fullpage>
    <div class="current-num">
      {{currentNum}}
    </div>
    <div class="right-search" @mouseover="searchShow=true" @mouseout="searchShow=false">
      <div class="hover" v-show="!searchShow"></div>
      <el-input :class="searchShow?'search-show':'search-none'" v-model="mapNum" @keydown.enter="skipScroll" @change="skipScroll" placeholder="请输入1-825的序号" ></el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {useStore} from "@/store";
import fullpage from "@/components/fullPage.vue";
import { useDebounceFn } from '@vueuse/core';
import {historyImg} from '@/plugins/imgArr'

// console.log(historyImg,'hhh');

const store=useStore()
let ImgArr=ref<string[]>(Array(historyImg.length))
let mapNum=ref('')
let currentNum=ref(1)
let skipMap=ref(0)
let searchShow=ref(false)

function mapScroll(num:number){

  if(!Object.keys(ImgArr.value).includes(num+'')){  //已经加载过的图片不会在重新加载
    store.dispatch('setLoading', true);
  }
  currentNum.value=num+1
  ImgArr.value[num]='https://sdmtai.github.io/'+historyImg[num]
}

const skipScroll=useDebounceFn(()=>{
  let num=Number(mapNum.value)
  num=num-1
  if(num<0||num>824||isNaN(num)){
    num=skipMap.value=0
  }else{
    num=skipMap.value=num
  }
  mapScroll(num)
},200)


function imgComplete(){ //已经load过的不会再load
  store.dispatch('setLoading', false);
}

</script>

<style lang="less" scoped>
.history-img{
  img{
    width: 100%;
    height: calc(100vh - 80px);
  }
}

.current-num{
  position: fixed;
  right: 1px;
  top: 90px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.right-search{
  position: fixed;
  right: 0;
  top: 150px;
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .hover{
    width: 5px;
    background-color: blueviolet;
    height: 40px;
    transform: translateX(195px);
  }
}
.search-show{
  animation: slide-in-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

.search-none{
  animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}


@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(200px);
            transform: translateX(200px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;

  }
}

@keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(200px);
            transform: translateX(200px);
    opacity: 0;
  }
}
</style>