<template>
  <transition name="slide-fade">
    <div class="back-top" v-show="show" @click.stop="getTop">
      <img src="@/assets/imgs/gotop.png" alt="">
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'

let show = ref(false)

function scroll() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 150) {
    show.value = true
  } else {
    show.value = false
  }
}

function getTop() {
  let timer = setInterval(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    let speed = Math.ceil(scrollTop / 5)
    document.documentElement.scrollTop = scrollTop - speed
    if (scrollTop === 0) {
      clearInterval(timer)
    }
  }, 20)
}

onMounted(() => window.addEventListener('scroll', scroll))
onBeforeUnmount(() => window.removeEventListener('scroll', scroll))
</script>

<style scoped lang="less">
.back-top {
  background-color: #FFFFFF;
  position: fixed;
  right: 3rem;
  bottom: 8rem;
  border-radius: 25px;
  cursor: pointer;
  opacity: .8;
  text-align: center;
  z-index: 99;

  &:hover{
    -webkit-animation: tada 1s .2s ease both;-moz-animation: tada 1s .2s ease both;
  }
  img {
    width: 48px;
    height: 48px;
  }
}

@-webkit-keyframes tada {
  0% {
    -webkit-transform: scale(1);
  }

  10%, 20% {
    -webkit-transform: scale(0.9) rotate(-3deg);
  }

  30%, 50%, 70%, 90% {
    -webkit-transform: scale(1.1) rotate(3deg);
  }

  40%, 60%, 80% {
    -webkit-transform: scale(1.1) rotate(-3deg);
  }

  100% {
    -webkit-transform: scale(1) rotate(0);
  }
}

@-moz-keyframes tada {
  0% {
    -moz-transform: scale(1);
  }

  10%, 20% {
    -moz-transform: scale(0.9) rotate(-3deg);
  }

  30%, 50%, 70%, 90% {
    -moz-transform: scale(1.1) rotate(3deg);
  }

  40%, 60%, 80% {
    -moz-transform: scale(1.1) rotate(-3deg);
  }

  100% {
    -moz-transform: scale(1) rotate(0);
  }
}

@media (max-width: 600px) {
  .back-top {
    display: none;
  }
}
</style>
