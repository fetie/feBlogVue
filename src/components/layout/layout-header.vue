<template>
  <div id="layout-header" :class="{'fixed':fixed,'hidden':hidden}" @click.stop="mobileShow=false">
    <div class="site-logo">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="">
        <p class="site-name roll-in-right">24k纯铁</p>
      </router-link>
    </div>
    <div class="menus-btn" @click.stop="mobileShow=!mobileShow">
      菜单
    </div>
    <div class="site-menus" :class="{'mobileShow':mobileShow}" @click.stop="mobileShow=!mobileShow">
      <div class="menu-item header-search">
        <header-search/>
      </div>
      <div class="menu-item">
        <router-link to="/">首页</router-link>
      </div>
      <div class="menu-item hasChild">
        <a href="#">文章</a>
        <div class="childMenu" v-if="category.length">
          <div class="sub-menu" v-for="item in category" :key="item.title">
            <router-link :to="`/category/${item.title}`">{{ item.title }}</router-link>
          </div>
        </div>
      </div>
      <div class="menu-item">
        <router-link to="/friend">推荐</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/guess-num">猜数字游戏</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/about">关于</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import HeaderSearch from '@/components/header-search.vue'
import {fetchCategory} from '@/api'
import {categoriesList} from '@/api/types'

let lastScrollTop = ref(0)
let fixed = ref(false)
let hidden = ref(false)
let category = ref<categoriesList>([])
let mobileShow = ref(false)

function watchScroll() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop === 0) {
    fixed.value = false;
  } else if (scrollTop >= lastScrollTop.value) {
    fixed.value = false;
    hidden.value = true;
  } else {
    fixed.value = true
    hidden.value = false
  }
  lastScrollTop.value = scrollTop
}

function getCategory() {
  fetchCategory().then(res => {
    category.value = res.result
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  window.addEventListener('scroll', watchScroll)
  getCategory()
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", watchScroll)
})
</script>

<style scoped lang="less">
#layout-header {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 80px;
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: .3s all ease;
  -webkit-transition: .3s all ease;
  -moz-transition: .3s all linear;
  -o-transition: .3s all ease;
  -ms-transition: .3s all ease;

  &.hidden {
    top: -100px;
  }

  &.fixed {
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .roll-in-right {
    -webkit-animation: roll-in-right 0.6s ease-out both;
            animation: roll-in-right 0.6s ease-out both;
  }
}

.site-logo {
  text-align: center;

  a{
    display: flex;
    align-items: center;
    height: 60px;
  }

  img {
    width: 80px;
    height: 58px;
  }

  p.site-name {
    font-size: 25px;
    font-weight: bold;
    color: #333;
  }
}

.menus-btn {
  display: none;
  visibility: hidden;
}

.site-menus {
  display: flex;
  align-items: center;

  .menu-item {
    min-width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;

    a {
      padding: 12px 10px;
      color: #545454;
      font-weight: 500;
      font-size: 16px;

      &:hover {
        color: #ff6d6d;
      }
    }

    &:not(:last-child) {
      margin-right: 15px;
    }

    &.hasChild:hover .childMenu {
      opacity: 1;
      visibility: visible;
      transform: translateY(-5px);
    }
  }

  .childMenu {
    width: 130px;
    background-color: #FDFDFD;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 55px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: .7s all ease;
    -webkit-transition: .6s all ease;
    -moz-transition: .6s all linear;
    -o-transition: .6s all ease;
    -ms-transition: .6s all ease;

    &:before, &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid white;
      top: -8px;
      left: 20px;
    }

    &:before {
      top: -9px;
      border-bottom: 8px solid #ddd;
    }

    .sub-menu {
      height: 40px;
      line-height: 40px;
      position: relative;

      &:not(:last-child):after {
        /*position: absolute;*/
        content: '';
        width: 50%;
        height: 1px;
        color: #ff6d6d;
        bottom: 0;
        left: 25%;
        z-index: 99;
      }
    }
  }
}

@media (max-width: 960px) {
  #layout-header {
    padding: 0 20px;
  }
}

@media (max-width: 600px) {
  #layout-header {
    padding: 0 10px;
  }

  .menus-btn {
    display: block;
    visibility: visible;
  }

  .site-menus {
    position: absolute;
    display: none;
    visibility: hidden;
    background-color: #F9F9F9;
    width: 100%;
    left: 0;
    top: 80px;
    z-index: -9;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .menu-item {
      position: relative;
      height: unset;

      &:not(:last-child) {
        margin-right: 0;
      }
    }

    .childMenu {
      position: relative;
      width: 100%;
      top: 0;
      background-color: #F3F3F3;
      opacity: 1;
      visibility: visible;
      border: none;
      box-shadow: none;

      &:before, &:after {
        content: '';
        position: relative;
        width: 0;
        height: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
      }
    }
  }

  .site-menus.mobileShow {
    display: inline-block;
    visibility: visible;
    z-index: 99;
  }
}


/* ----------------------------------------------
 * Generated by Animista on 2021-12-17 16:47:3
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation roll-in-right
 * ----------------------------------------
 */
@-webkit-keyframes roll-in-right {
  0% {
    -webkit-transform: translateX(800px) rotate(540deg);
            transform: translateX(800px) rotate(540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}
@keyframes roll-in-right {
  0% {
    -webkit-transform: translateX(800px) rotate(540deg);
            transform: translateX(800px) rotate(540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}

</style>
