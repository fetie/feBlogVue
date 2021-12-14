<template>
  <div class="button" :style="{backgroundColor:backgroundColor}">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    backgroundColor:{
      type: String,
      default: '#409eff'
    }
  })
</script>

<style lang="less" scoped>
.button{
  display: inline-block;
  width: 75px;
  color: #fff;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 3px;
}
</style>