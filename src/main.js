import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import router from './router';
const app = createApp(App)
app.use(router)

app.mount('#app')



// 定义自定义指令
app.directive('longpress', {
  // 当被绑定的元素挂载到 DOM 上时
  mounted(el, binding) {
    if (typeof binding.value !== 'object' || typeof binding.value.start !== 'function' || typeof binding.value.end !== 'function') {
      console.warn('v-longpress 需要传入一个包含 start 和 end 函数的对象');
      return;
    }

    let pressTimer = null;
    let longPressTriggered = false; // 长按是否已触发的标志

    // 开始计时函数
    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          binding.value.start(); // 触发开始函数
          longPressTriggered = true; // 设置长按已触发标志为 true
        }, 500); // 设置500毫秒为长按阈值
      }
    };

    // 清理计时器并调用结束函数，只有在长按已触发的情况下
    const cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
        if (longPressTriggered) { // 只有当长按已经触发时，才调用结束函数
          binding.value.end();
        }
        longPressTriggered = false; // 重置长按已触发标志
      }
    };

    // 添加事件监听器
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    el.addEventListener('mouseup', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);

    // 用于在组件或指令解绑时清理事件监听器
    el._vueLongPress_ = {
      removeListeners: () => {
        el.removeEventListener('mousedown', start);
        el.removeEventListener('touchstart', start);
        el.removeEventListener('mouseup', cancel);
        el.removeEventListener('mouseout', cancel);
        el.removeEventListener('touchend', cancel);
        el.removeEventListener('touchcancel', cancel);
      }
    };
  },
  // 当指令与元素解绑时
  unmounted(el) {
    // 清理事件监听器
    el._vueLongPress_.removeListeners();
  }
});


