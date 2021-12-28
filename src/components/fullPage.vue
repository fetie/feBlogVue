<template>
  <div
    @mousedown="mousedown"
    @touchstart.passive="mousedown"
    @mouseup="mouseup"
    @touchend.passive="mouseup"
    @mousewheel.passive="mousewheel"
    id="mousetouch"
    :class="{ transition: state.isTransition }"
    :style="{ transform: 'translate3d(0,-' + state.translateY + 'px,0)' }"
  >
    <div id="mouseToucheWrap">
      <!-- 直接板块，不要再外加元素 -->
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface WheelEvent_ extends WheelEvent {
  wheelDelta?: number;
}
import {
  reactive,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  watch,
  nextTick,
} from "vue";

const props=defineProps({
  skip: {
    type: Number,
    default: 0,
  },
  overflowY: {
    type: Boolean,
    default: false,
  },
  isTransition: {
    type: Boolean,
    default: true,
  },
  abs: {
    type: Number,
    default: 1,
  },
  width: {
    type: String,
    default: "1920px",
  },
  devices: {
    type: Number,
    default: 800,
  }
})

const emit = defineEmits(['scroll']);

let state = reactive({
  translateY: 0,
  startX: 0,
  startY: 0,
  element: <HTMLElement>document.getElementById("mousetouch"),
  nodesInfo: <number[]>[],
  page: 0,
  isBootom: false,
  isScroll: true,
  timid: <NodeJS.Timeout | null>null,
  devices: false,
  isTransition: true,
});


watch(
  () => state.devices,
  (a, b) => {
    initInfo();
  }
);
watch(
  () => props.skip,
  (a, b) => {
    skipTo(a);
  }
);
let mousedirection: string = "";
const mousedown = (e: MouseEvent | TouchEvent) => {
  mousedirection = "";
  const { element } = state;
  const { type = "mousedown" } = e;
  let startX: number = 0,
    startY: number = 0;
  if (type === "mousedown") {
    //   pc端事件
    startX = (e as MouseEvent).pageX;
    startY = (e as MouseEvent).pageY;
    element.addEventListener("mousemove", mousemove, { passive: true });
  } else if (type === "touchstart") {
    //   移动端事件
    startX = (e as TouchEvent).touches[0].pageX;
    startY = (e as TouchEvent).touches[0].pageY;
    element.addEventListener("touchmove", mousemove, { passive: false });
  }
  state.startX = startX;
  state.startY = startY;
};
const mouseup = (e: MouseEvent | TouchEvent) => {
  const { type = "mouseup" } = e;
  console.log("mousedirection", mousedirection);
  if (mousedirection === "down") {
    scroll(false);
  }
  if (mousedirection === "up") {
    scroll(true);
  }
  if (type === "mouseup") {
    //   pc端事件
    state.element.removeEventListener("mousemove", mousemove);
  } else if (type === "touchend") {
    //   移动端事件
    state.element.removeEventListener("touchmove", mousemove);
  }
};
const mousemove = (e: any) => {
  const { type = "mousemove" } = e;
  const { startX, startY, isBootom } = state;
  let endX: number = 0,
    endY: number = 0;
  if (type === "mousemove") {
    //   pc端事件
    endX = (e as MouseEvent).pageX;
    endY = (e as MouseEvent).pageY;
  } else if (type === "touchmove") {
    //   移动端事件
    e.preventDefault();
    endX = (e as TouchEvent).touches[0].pageX;
    endY = (e as TouchEvent).touches[0].pageY;
  }
  let X = endX - state.startX,
    Y = endY - startY;
  if (Math.abs(X) > Math.abs(Y) && X > 0) {
    // alert("向右");
    mousedirection = "right";
  } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
    // alert("向左");
    mousedirection = "left";
  } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
    // alert("向下");
    mousedirection = "down";
    if (isBootom) {
      state.isBootom = false;
    }
  } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
    // alert("向上");
    mousedirection = "up";
  } else {
    // alert("没滑动");
    mousedirection = "none";
  }
};
const mousewheel = (e: WheelEvent_) => {
  const { wheelDelta = 120 } = e,
    { isBootom } = state;
  //   wheelDelta 取值 ± 120
  if (wheelDelta > 0) {
    //   向上滚动
    if (isBootom) {
      state.isBootom = false;
    }
    scroll(false);
  } else {
    //   向下滚动
    scroll(true);
  }
};
const scroll = (type: Boolean) => {
  let { nodesInfo, page, isScroll, isBootom } = state;
  let len = nodesInfo.length;
  if (!isScroll || isBootom || state.timid) return;
  state.isScroll = false;
  if (type && page < len) {
    state.page++;
  } else if (!type && page > 0) {
    state.page--;
  }
  state.translateY = <number>calcTranslateY();
  state.timid = setTimeout(() => {
    state.isScroll = true;
    clearTimeout(<NodeJS.Timeout>state.timid);
    state.timid = null;
  }, 1000);
  emit("scroll", state.page, state.translateY);
};
const calcTranslateY = (): number => {
  let { nodesInfo, page, isBootom } = state;
  let len = nodesInfo.length;
  if (len < 2) return 0;
  if (page === len - 1 && !isBootom && len > 1) {
    state.isBootom = true;
    return (
      state.nodesInfo
        .slice(0, page - 1)
        .reduce((total, curVal, curIndex, arr) => {
          return total + curVal;
        }) + nodesInfo[len - 1]
    );
  }
  return page > 0
    ? state.nodesInfo
        .slice(0, page)
        .reduce((total, curVal, curIndex, arr) => {
          return total + curVal;
        })
    : 0;
};
const calcNodesInfo = () => {
  return new Promise((resolve, reject) => {
    let timeId = setTimeout(() => {
      let wrap = <HTMLElement>document.getElementById("mouseToucheWrap"); //获取子节点
      if (!wrap) return initDocumentInfo(false);
      let children = wrap.children;
      if (children.length) {
        //   存储每个子节点高度
        state.nodesInfo = Array.from(children).map((item) => {
          // return item.clientHeight;  //这个属性没有小数不精确，当数组过大时会出现较明显的偏差
          return Number(item.getBoundingClientRect().height.toFixed(1)); //获取的高度会有小数点
        });
        resolve(state.nodesInfo);
      } else {
        initDocumentInfo(false);
        throw Error("请确定传入内容正确");
      }
      clearTimeout(timeId);
    }, 900);
  });
};
const initInfo = () => {
  const { skip } = props;
  hasTransition(skip);
  nextTick(async () => {
    await calcNodesInfo();
    console.log("state.nodesInfo", state.nodesInfo, calcTranslateY());
    state.page = skip; //计算当前滚动的页面数
    state.translateY = calcTranslateY();
    emit("scroll", state.page, state.translateY);
  });
};
const onresize = () => {
  const devices = !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  if (devices) {
    state.devices = true;
  } else {
    let w =
      document.documentElement.offsetWidth ||
      document.body.offsetWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    state.devices = !(w > props.devices);
  }
  initDocumentInfo(true);
};
const skipTo = (page: number) => {
  hasTransition(page);
  state.page = page;
  state.translateY = <number>calcTranslateY();
  state.timid = setTimeout(() => {
    state.isScroll = true;
    clearTimeout(<NodeJS.Timeout>state.timid);
    state.timid = null;
    state.isTransition = true;
  }, 1000);
  emit("scroll", state.page, state.translateY);
};
const hasTransition = (page: number) => {
  const { abs, isTransition } = props;
  if (Math.abs(state.page - page) > abs && !isTransition) {
    state.isTransition = false;
  }
};
const initDocumentInfo = (type: Boolean = false) => {
  const { overflowY, width } = props;
  if (type) {
    // 初始化基本属性
    if (overflowY && !state.devices) {
      document.body.style.width = width;
      document.body.style.overflow = "auto hidden";
      document.documentElement.style.overflow = "auto hidden";
    } else {
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden"; //隐藏滚动条
      document.documentElement.style.overflow = "hidden"; //隐藏滚动条 移动端浏览器打开向上滚动，导致移动偏移
    }
    // 重置滚动条，否则会影响transform:translate3d
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    }
    if (document.documentElement.scrollTop) {
      document.documentElement.scrollTop = 0;
    }
  } else {
    // 还原对应属性
    document.body.style.width = "100%";
    document.body.style.overflow = ""; //隐藏滚动条
    document.documentElement.style.overflow = ""; //隐藏滚动条 移动端浏览器打开向上滚动，导致移动偏移
  }
};
onMounted(() => {
  onresize();
  window.addEventListener("resize", onresize);
  state.element = <HTMLElement>document.getElementById("mousetouch"); //用于绑定监听事件
  initInfo();
});
onActivated(() => {
  console.log("keep-alive缓存组件被调用");
  initDocumentInfo(true);
});
onUnmounted(() => {
  console.log("页面卸载");
  initDocumentInfo(false);
  window.removeEventListener("resize", onresize);
});
onDeactivated(() => {
  initDocumentInfo(false);
  window.removeEventListener("resize", onresize);
  console.log("keep-alive缓存组件被停用");
});

</script>
<style scoped>
#mousetouch {
  -webkit-overflow-scrolling: touch;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
}
.transition {
  transition: all 700ms ease 0s;
}
</style>
