<template>
  <div class="feature-content">
    <div class="feature-item">
      <div class="feature">
        <router-link to="/">
          <!--            <div class="feature-title"><span class="foverlay">{{data.title}}</span></div>-->
          <el-image
            :src="getImg('jack')"
            :preview-src-list="srcList"
          >
          </el-image>
        </router-link>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature">
        <router-link to="/">
          <el-image
            :src="getImg('lunhui')"
            :preview-src-list="srcList"
          >
          </el-image>
<!--          <img src="@/assets/imgs/suppress/lunhui.png">-->
        </router-link>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature">
        <router-link to="/">
          <el-image
            :src="getImg('fly')"
            :preview-src-list="srcList"
          >
          </el-image>
<!--          <img src="@/assets/imgs/suppress/fly.jpg">-->
        </router-link>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {ref} from 'vue'

const srcNames=['jack','lunhui','fly']
let srcList=ref([])
srcList.value=srcNames.map(v=>{
  return getImg(v)
})

function getImg(name){
  const path='/src/assets/imgs/suppress/'+name+'.png'
  const module=import.meta.globEager('/src/assets/imgs/suppress/*')
  return module[path].default
}
</script>

<style scoped lang="less">
.feature {
  width: inherit;
  position: relative;

  :deep(.el-image) {
    img {
      height: 160px;
      width: 257px;
      object-fit: cover;
      object-position: top;
      border-radius: 5px;
    }

  }

  & a:hover .foverlay {
    opacity: 1;
  }

  .foverlay {
    position: absolute;
    z-index: 2;
    width: 257px;
    height: 160px;
    text-align: center;
    line-height: 160px;
    background: #BBE2DB;
    color: white;
    font-size: 16px;
    opacity: 0;
    border-radius: 5px;

    -moz-transition: opacity .4s ease-out;
    -o-transition: opacity .4s ease-out;
    -webkit-transition: opacity .4s ease-out;
    transition: opacity .4s ease-out;
  }
}
</style>