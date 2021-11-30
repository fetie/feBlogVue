<template>
  <div class="header-search">
    <i class="iconfont iconsearch" @click.stop="click"></i>
    <input ref="searchInput" :class="{'show':show}" v-model="searchValue" type="text" @click.stop=""
           @keyup.enter="search"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, unref, watch,computed} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const searchInput = ref()

let searchValue = ref('')
let show = ref(false)

function search() {
  router.push({name: 'search', params: {words: searchValue.value}});
}

function click() {
  // searchValue.value = ''
  show.value = !show.value
  if (show.value) {
    const searchInputDom = unref(searchInput)
    searchInputDom && searchInputDom.focus()
  }
}

function close() {
  const searchInputDom = unref(searchInput)
  searchInputDom && searchInputDom.blur()
  show.value = false
}

watch(show, (value) => {
  if (value) {
    document.body.addEventListener('click', close)
  } else {
    document.body.removeEventListener('click', close)
  }
})


</script>

<style scoped lang="less">
.header-search {
  display: inline-block;
  position: relative;
  cursor: pointer;
  i {
    font-size: 18px;
    position: relative;
    top: 3px;
  }

  input {
    border: none;
    outline: none;
    overflow: hidden;
    background: transparent;
    height: 30px;
    width: 0;
    transition: .2s all;

    &.show {
      width: 200px;
      margin-left: 10px;
    }

    &:focus {
      border-bottom: 1px solid #8fd0cc;
    }
  }
}
</style>
