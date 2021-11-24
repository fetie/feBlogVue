<template>
  <ul class="menus">
    <li v-for="item in menus">
      <a :href="`#${item.id}`">{{ item.title }}</a>
      <ul v-if="item[childLabel]" class="child">
        <menu-tree :menus="item[childLabel]" :child-label="childLabel"></menu-tree>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  menus: {
    type: [Object, Array],
    required: true
  },
  childLabel: {
    type: String,
    default: 'child'
  }
})
</script>

<style scoped lang="less">
.menus {
  line-height: 1.7em;
  font-weight: bold;
}

.child {
  padding-left: 15px;
}
</style>
