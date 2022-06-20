<template>
  <div id="layout-footer">
    <div class="footer-main">
      <div class="footer-item">
        <div style="font-size: 17px; font-weight: bold">资源</div>
        <div>
          <a
            target="_blank"
            class="out-link"
            href="https://segmentfault.com/weekly?utm_source=sf-footer"
            >每周精选</a
          >
        </div>
        <div>
          <a target="_blank" class="out-link" href="https://www.jmjc.tech/"
            >简明教程</a
          >
        </div>
        <div>
          <a
            target="_blank"
            class="out-link"
            href="https://www.liaoxuefeng.com/"
            >廖雪峰的官方网站</a
          >
        </div>
      </div>
      <div class="footer-item" v-if="socials.length">
        <div v-for="item in socials" :key="item._id">
          <a target="_blank" class="out-link" :href="item.href">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="copyright">
      Copyright © 2021 by
      <a target="_blank" class="out-link" href="https://www.fetie.cn"
        >fetie.cn</a
      >
      . All rights reserved. |
      <a target="_blank" class="out-link" href="http://beian.miit.gov.cn/"
        >浙ICP备2021037797号</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/store'
// import sectionTitle from '@/components/section-title.vue'
import type { socialsList } from '@/api/types'

const store = useStore()
const socials = ref<socialsList>([])
// const runTimeInterval = computed(() => store.state.runTimeInterval)

function getSocial() {
  socials.value = store.getters.socials
}

getSocial()
store.dispatch('initComputeTime')
</script>

<style scoped lang="less">
#layout-footer {
  padding: 2%;
  border-top: 1px solid #f7f7f7;
  font-size: 13px;
  color: #9c9c9c;

  a.out-link:hover {
    color: #ff6d6d;
  }

  .footer-main {
    max-width: 800px;
    margin: 0 auto 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    .footer-item {
      //flex: 1;

      & > div:not(:last-child) {
        margin-bottom: 10px;
      }

      i {
        display: inline-block;
        margin-right: 10px;
        width: 21px;
        text-align: center;
      }
    }
  }

  .copyright {
    text-align: center;
    line-height: 18px;
  }
}

/*****/
@media (max-width: 800px) {
  #layout-footer {
    .footer-main .footer-item:nth-child(3) {
      flex: 2;
    }
  }
}

@media (max-width: 600px) {
  #layout-footer {
    .footer-main {
      display: block;

      .footer-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        & > div {
          margin-bottom: 10px;
        }
      }
    }
  }
}

/*****/
</style>
