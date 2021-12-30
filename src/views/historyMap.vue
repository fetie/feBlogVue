<template>
  <div class="history-box">
    <fullpage @scroll="mapScroll" :skip="skipMap" :isTransition="false">
      <div class="history-img" v-for="(item,index) in historyImg">
        <img :data-src="'https://sdmtai.github.io/'+item" :key="index" @load="imgComplete" class="imgItem" alt="">
      </div>
    </fullpage>
    <div class="current-num">
      {{ currentNum }}
    </div>
    <div class="right-search" @mouseover="searchShow=true" @mouseout="searchShow=false">
      <div class="hover" v-show="!searchShow"></div>
      <el-input :class="searchShow?'search-show':'search-none'"
                clearable
                v-model="mapNum"
                maxlength="3"
                @keydown.enter="skipScroll"
                @change="skipScroll"
                placeholder="请输入1-825的索引序号">
      </el-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue'
import {useStore} from "@/store";
import fullpage from "@/components/fullPage.vue";
import {useDebounceFn} from '@vueuse/core';
import {historyImg} from '@/plugins/imgArr'
import { ElMessage } from 'element-plus'

const store = useStore()
let mapNum = ref('')
let currentNum = ref(1)
let skipMap = ref(0)
let searchShow = ref(false)

watch(mapNum, (n) => {
  if (n) {
    mapNum.value = n.replace(/[^\d]/g, '')
  }
})
function mapScroll(num:number){
  currentNum.value=num+1
}
const skipScroll = useDebounceFn(() => {
  let num = Number(mapNum.value)
  num = num - 1
  if (num < 0 || num > 824 || isNaN(num)) {
    ElMessage.warning('请输入正确的索引序号')
    return
  } else {
    skipMap.value = num
  }
  mapScroll(num)
}, 200)


function imgComplete() { //已经load过的不会再load
  store.dispatch('setLoading', false);
}

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(item => {
      // isIntersecting是一个Boolean值，判断目标元素当前是否可见
      if (item.isIntersecting) {
        store.dispatch('setLoading', true);
        const target=item.target as HTMLImageElement
        target.src = target.dataset.src || '' //这里不加个空字符串ts会报错
        // 图片加载后即停止监听该元素
        io.unobserve(item.target)
      }
    })
  }, {
    threshold: 1
  })

  const imgItemEl = document.querySelectorAll('.imgItem')
  const imgList = [...Array.from(imgItemEl)]
  // observe遍历监听所有img节点
  imgList.forEach(img => io.observe(img))

})

</script>

<style lang="less" scoped>
.history-box {
  height: 100%;

  .history-img {
    height: calc(100vh - 80px);

    img {
      width: 100%;
      height: calc(100vh - 80px);
    }
  }

  .current-num {
    position: fixed;
    right: 1px;
    top: 90px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

  .right-search {
    position: fixed;
    right: 0;
    top: 150px;
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    .hover {
      width: 5px;
      background-color: blueviolet;
      height: 40px;
      transform: translateX(195px);
    }
  }

  .search-show {
    animation: slide-in-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }

  .search-none {
    animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }
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