<template>
  <div class="articles">
    <banner></banner>
    <div class="site-content animate">
      <!-- 文章目录 -->
      <div class="sticky">
        <div id="article-menus">
          <menu-tree :menus="menus" child-label="child"></menu-tree>
        </div>
      </div>

      <main class="site-main">
        <article class="hentry">
          <!-- 文章头部 -->
          <header class="entry-header">
            <!-- 标题输出 -->
            <h1 class="entry-title">{{article.title}}</h1>
            <hr>
            <div class="breadcrumbs">
              <div id="crumbs">最后更新时间：{{moment.unix(article.updateTime).format('YYYY-MM-DD')}}</div>
            </div>
          </header>
          <!-- 正文输出 -->
          <div class="entry-content" v-html="article.content">
          </div>
          <!-- 文章底部 -->
          <section-title>
            <footer class="post-footer">
              <!-- 阅读次数 -->
              <div class="post-like">
                <i class="iconfont iconeyes"></i>
                <span class="count">{{article.viewNum}}</span>
              </div>
              <div class="donate" @click="showDonate=!showDonate">
                <span>赏</span>
                <ul class="donate_inner" :class="{'show':showDonate}">
                  <!--<li class="wedonate"><img src="http://cdn.fengziy.cn/gblog/wexin_pay.png">
                    <p>微信</p></li>
                  <li class="alidonate"><img src="http://cdn.fengziy.cn/gblog/ali_pay.jpg">
                    <p>支付宝</p></li>-->
                  <li class="alidonate">
                    <p>就先不赏了</p>
                  </li>
                </ul>
              </div>
              <!-- 文章标签 -->
              <!--<div class="post-tags">
                <i class="iconfont iconcategory"></i>
                <router-link to="/category/web">Web</router-link>
              </div>-->
            </footer>
          </section-title>

          <!--声明-->
          <div class="open-message">
            <p>声明：fetie博客|版权所有，违者必究|如未注明，均为原创|本网站采用<a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">BY-NC-SA</a>协议进行授权</p>
            <p>转载：转载请注明原文链接 - <a :href="route.path">{{article.title}}</a></p>
          </div>
          <!--评论-->
          <!--<div class="comments">
            <comment v-for="item in comments" :key="item.comment.id" :comment="item.comment">
              <template v-if="item.reply.length">
                <comment v-for="reply in item.reply" :key="reply.id" :comment="reply"></comment>
              </template>
            </comment>
          </div>-->
        </article>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref,reactive,nextTick,watch} from 'vue'
import {useRoute} from 'vue-router'
import moment from 'moment'
import Banner from '@/components/banner.vue'
import sectionTitle from '@/components/section-title.vue'
// import comment from '@/components/comment.vue'
import menuTree from '@/components/menu-tree.vue'
import {fetchArticle,articleView} from '../api'
import {articleData} from '@/api/types'


interface HEle{
  h:number;
  title:string;
  id:string;
  offsetTop:number;
  child:HEle[]
}

const route=useRoute()

const showDonate = ref(false)
const comments = ref([])
let article = ref<articleData>({
  content: '',
  createTime: 0,
  updateTime: 0,
  title: '',
  author: '',
  sort: 0,
  viewNum: 0,
  banner: [],
  _id: '',
})
const menus = ref<HEle[]>([])

const id=route.params.id

function updateView(){
  articleView({id}).catch(err => {
    console.log(err)
  })
}

function getArticle() {
  fetchArticle({id}).then(res => {
    article.value = res.result
  }).catch(err => {
    console.log(err)
  })
}

function fetchH(arr:HEle[], left:number, right:number|undefined) {
  if (right) {
    return arr.filter(item => item.offsetTop > left && item.offsetTop < right)
  } else {
    return arr.filter(item => item.offsetTop > left)
  }
}

// 生成目录
let headCount=0
function createMenus() {
  let arr:HEle[] = []
  for (let i = 6; i > 0; i--) {
    let temp:HEle[] = []
    let e = document.querySelector(".entry-content")!.querySelectorAll(`h${i}`) as NodeListOf<HTMLElement>
    if(e){
      for (let j = 0; j < e.length; j++) {
        e[j].setAttribute('id', 'heading-'+headCount)
        let child = fetchH(arr, e[j].offsetTop, (j + 1 === e.length) ? undefined : e[j + 1].offsetTop)
        temp.push({
          h: i,
          title: e[j].innerText,
          id: 'heading-'+headCount,
          offsetTop: e[j].offsetTop,
          child
        })
        headCount++
      }
    }

    if (temp.length) {
      arr = temp
    }
  }
  menus.value = arr
}

getArticle()
updateView()

//获取v-html里的元素
watch(()=>article.value.content,(v)=>{
  nextTick(()=>{
    createMenus()
  })
})
// getComment()
</script>

<style scoped lang="less">
.site-content {
  position: relative;
  .site-main {
    padding: 80px 0 0 0;
  }
}

.sticky{
  position: absolute;
  height: 100%;
  #article-menus {
    position: sticky;
    top: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
    border-radius: 3px;
    padding: 15px;
    width: 300px;
    transform: translateX(-120%) translateY(100px);
    font-size: 14px;
  }
}


article.hentry {
  .entry-header {
    .entry-title {
      font-size: 23px;
      font-weight: 600;
      color: #737373;
      margin: 0.67em 0;
    }

    hr {
      height: 1px;
      border: 0;
      background: #EFEFEF;
      margin: 15px 0;
    }

    .breadcrumbs {
      font-size: 14px;
      color: #D2D2D2;
      text-decoration: none;
      margin-bottom: 30px;
    }
  }

  footer.post-footer {
    width: 100%;
    padding: 20px 10px;
    margin-top: 30px;
    height: 65px;
    position: relative;

    i {
      font-size: 18px;
      margin-right: 5px;
    }

    .post-like {
      float: right;
      margin: 7px 0 0 20px;
    }

    .post-share {
      float: right;
      list-style: none;
      margin-right: 20px;
    }

    .donate {
      float: left;
      line-height: 36px;
      border-radius: 100%;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border: 1px solid #2B2B2B;
      position: relative;
      &:hover {
        border: 1px solid goldenrod;

        span {
          color: goldenrod;
        }
      }

      span {
        color: #2B2B2B;
        padding: 10px;
        position: relative;
        cursor: pointer;
      }

      .donate_inner {
        display: none;
        margin: 0;
        list-style: none;
        position: absolute;
        left: 50px;
        top: 0;
        width: 105px;
        background: #FFF;
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
        border-radius: 3px;

        &.show {
          display: block;
        }

        li {
          float: left;
        }

        img {
          width: 100px;
        }

        p {
          text-align: center;
          font-size: 15px;
          color: #D2D2D2;
          line-height: 1rem;
        }
      }

      .donate_inner:after, .donate_inner:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 45%;
        margin-left: -8px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #fff;
      }

      .donate_inner:before {
        left: -1px;
        border-right: 8px solid #ddd;
      }

    }

    .post-tags {
      margin: 7px 0 0 20px;
      float: left;
      text-transform: uppercase;

      a:hover {
        color: #ff6d6d;
      }
    }
  }

  .open-message {
    margin: 50px 0;
    position: relative;
    background: #2B2B2B;
    padding: 10px 30px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;

    &:after {
      content: "";
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #2B2B2B;
      position: absolute;
      top: -8px;
      left: 48%;
    }

    p {
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    a {
      color: #A0DAD0;
      padding: 0 5px;
    }
  }
}
</style>
