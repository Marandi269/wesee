<template>
  <div class="video-container w-[1200px]"
       v-longpress="{start: onStart, end: onEnd}"
       @dblclick="quickPlay"
       @click="playSwitch"
  >
    <video ref="videoElement" class="!w-full h-auto" controls preload="auto">
      <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4"/>
    </video>
    <div class="flex justify-center items-center px-2 bg-blue-200 bg-opacity-25 w-full h-12">
      <button class="control-button-play mr-1" @click="playSwitch">
        <svg v-if="status.isPlaying" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
        </svg>
      </button>
      <span>
      </span>
      <div @click="seek" class="progress-bar cursor-pointer bg-blue-200 w-full h-4 rounded-full overflow-hidden">
        <div class="progress bg-blue-600 h-full" :style="{
          width: 'calc(' + (status.currentTime / status.duration) * 100 + '%)'
        }"></div>
      </div>
      <label class="cursor-pointer w-24 text-center" @click="switchTimeMode">{{ timeDisplay }}</label>
      <button class="border border-blue-400 p-2 m-2">{{ status.speed }}</button>
    </div>
  </div>
  <p>status: {{ status }}</p>


</template>

<script setup>

import {computed, onMounted, reactive, ref, watch} from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const secondsToTimeString = (seconds) => {
  seconds = parseInt(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const arr = hours > 0 ? [hours, minutes, remainingSeconds] : [minutes, remainingSeconds];
  return arr.map(val => val.toString().padStart(2, '0'))
      .join(':');
}


const videoElement = ref(null);
const player = ref(null);

const status = reactive({
      isPlaying: false,
      muted: false,
      volume: 1,
      duration: 0,
      currentTime: 0,
      timeMode: '-',
      speed: 1,
    }
);
const switchTimeMode = () => {
  status.timeMode = status.timeMode === '-' ? '' : '-';
};
const timeDisplay = computed(() => {
  const displayTime = status.timeMode !== '-' ? status.duration : status.duration - status.currentTime;
  return `${status.timeMode}${secondsToTimeString(displayTime)}`;
});
watch([videoElement], () => {
  if (videoElement.value === null) return;
  player.value = videojs(videoElement.value, {
    controls: false,
  });
  player.value.on('loadedmetadata', function () {
    status.duration = player.value.duration();
    status.currentTime = player.value.currentTime();
    status.speed = player.value.playbackRate();
  });
  player.value.on('play', () => {
    status.isPlaying = true;
    status.volume = player.value.volume();
  });
  player.value.on('pause', () => {
    status.isPlaying = false;
  });

  player.value.on('timeupdate', function () {
    status.currentTime = player.value.currentTime();
  });
});
const play = () => {
  console.log('player:', player);
  player.value.play();
};
const pause = () => {
  player.value.pause();
};

const playSwitch = () => {
  handleClick();
  if (status.isPlaying) {
    player.value.pause();
  } else {
    player.value.play();
  }
};

const onStart = () => {
  play();
  status.speed = 3;
  console.log('长按开始');
}
const onEnd = () => {
  status.speed = 1;
  console.log('长按结束');
}
watch([status.speed], (v) => {
  player.value.playbackRate(v);
});
watch([status.currentTime], (v) => {
  player.value.currentTime(v);
});
watch([status.volume], (v) => {
  player.value.volume(v);
});

const seek = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = x / rect.width;
  const time = percent * status.duration;
  player.value.currentTime(time);
  e.stopPropagation()
};


const clickTimeout = ref(null);
const handleClick = () => {
  // 清除现有的定时器（如果有）
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value);
    clickTimeout.value = null;
    return; // 防止双击时执行单击逻辑
  }

  // 设置新的定时器
  clickTimeout.value = setTimeout(() => {
    console.log('单击事件触发');
    clickTimeout.value = null;
  }, 1000); // 300 毫秒内没有第二次点击则视为单击
};

const handleDoubleClick = () => {
  // 双击事件发生时清除定时器，阻止单击事件
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value);
    clickTimeout.value = null;
  }
  console.log('双击事件触发');
};

const quickPlay = () => {
  handleDoubleClick();
  console.log('quickPlay...');
}
</script>
