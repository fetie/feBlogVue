<template>
    <div class="home">
        <banner isHome="true" src="http://browser9.qhimg.com/bdr/__85/t01b30dd1843479c87c.jpg"></banner>
        <div class="site-content animate">
            <!--通知栏-->
            <div class="notify">
                <div class="search-result" v-if="hideSlogan">
                    <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
                    <span v-else-if="category">分类 "{{category}}" 相关文章</span>
                </div>
                <quote v-else>{{notice}}</quote>
            </div>

            <!--焦点图-->
            <div class="top-feature" v-if="!hideSlogan">
                <section-title>
                    <div style="display: flex;align-items: flex-end;">焦点图<small-ico></small-ico></div>
                </section-title>
                <div class="feature-content">
                    <div class="feature-item">
                        <feature />
                    </div>
                </div>
            </div>

            <!--文章列表-->
            <main class="site-main" :class="{'search':hideSlogan}">
                <section-title v-if="!hideSlogan">推荐</section-title>
              <template v-if="postList.length>0">
                <post v-for="item in postList" :post="item" :key="item._id"></post>
              </template>
              <template v-else>
                <div class="empty">
                  什么，怎么会没有东西呢？
                </div>
              </template>
            </main>

            <!--加载更多-->
            <div class="more" v-show="hasNextPage">
                <div class="more-btn" @click="getList">More</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref,computed,watch} from 'vue'
import {useStore} from "@/store"
import { useRouter, useRoute } from 'vue-router'
import Banner from '@/components/banner.vue'
import feature from '@/components/feature.vue'
import sectionTitle from '@/components/section-title.vue'
import Post from '@/components/post.vue'
import SmallIco from '@/components/small-ico.vue'
import Quote from '@/components/quote.vue'
import {fetchList} from '@/api'
import {articleData} from '@/api/types'

const props = defineProps({
  cate: {type: String},
  words: {type: String}
})

const features=ref([])
const postList=ref<articleData[]>([])
let currPage=ref(1)
let hasNextPage=ref(false)

const route=useRoute()
const store=useStore()

const searchWords=computed(() => {
    return route.params.words
})

const category=computed(() => {
    return route.params.cate
})

watch(()=>route.params.words,()=>{
  searchData()
})


const hideSlogan=computed(() => {
    return category.value || searchWords.value
})
const notice=computed(() => {
  return store.getters.notice
})

function searchData(){
  currPage.value=1
  postList.value=[]
  getList()
}

function getList() {
    fetchList({page:currPage.value,title:searchWords.value}).then(res => {
      let result=res.result
      postList.value = postList.value.concat(result.data || [])
      currPage.value = result.page
      hasNextPage.value = postList.value.length<result.count
      currPage.value++
    }).catch(err => {
        console.log(err)
    })
}

getList()

</script>

<style scoped lang="less">

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;
            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
      .empty{
        display: flex;
        justify-content: center;
        margin: 60px 0;
        font-size: 20px;
      }
    }

    .more{
        margin: 50px 0;
        .more-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:hover{
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    /******/
</style>
