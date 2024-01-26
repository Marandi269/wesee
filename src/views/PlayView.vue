<script setup>
import {useRoute} from 'vue-router';
import {nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect} from "vue";
import {shallowRef} from 'vue'
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import api from "../api.js";

const title = ref('Title');
const url = ref('');
const index = ref(0);
const room = ref(1);
const sp = ref([]);
const animeIndex = ref(0);
const spIndex = ref(0);
const epIndex = ref(0);
onMounted(async () => {
  const route = useRoute();
  console.log('PlayView mounted:', route.query, route);
  await api.ws.connect();
  const update = () => {
    [animeIndex.value, spIndex.value, epIndex.value] = [
      parseInt(route.query.animeIndex), parseInt(route.query.spIndex), parseInt(route.query.epIndex)];
    console.log('animeIndex:', animeIndex.value, 'spIndex:', spIndex.value, 'epIndex:', epIndex.value);
    const animes = JSON.parse(localStorage.getItem('animes'));
    title.value = `${animes[animeIndex.value].title} 第${animes[animeIndex.value].seasons[spIndex.value].title}季 第${epIndex.value + 1}集`;
    url.value = route.query.url;
    room.value = parseInt(route.query.room);
    index.value = route.query.index;

    sp.value = animes[animeIndex.value].seasons[spIndex.value];
    console.log('sp:', sp.value);
  };

  watch([route], update, {immediate: true});
});


onBeforeUnmount(() => {
  api.ws.close();
});

const player = shallowRef()

const handleEvent = (log) => {
}

const currentTime = ref(0);

const pushProgress = () => {
  api.ws.send_json({
    type: 'publish-progress',
    payload: {
      progress: currentTime.value,
      url: url.value,
      room: parseInt(room.value),
    }
  });
}
const handleMounted = (payload) => {
  console.log('Advanced player mounted', payload);
  player.value = payload.player;
  player.value.on('timeupdate', () => {
    currentTime.value = player.value.currentTime();
  });
}

const setProgress = (time) => {
  console.log('player.value:', player.value);
  if (player.value) {
    console.log('setProgress:', time);
    player.value.currentTime(time);
  }
};

nextTick(() => {
  api.ws.onMessage((msg) => {
    console.log('msg:', msg, msg.type, msg.payload.room,
        room.value, msg.payload.room === room.value, typeof msg.payload.room, typeof room.value);
    if (msg.type === 'dispatch-progress'
        && msg.payload.room === room.value
        && msg.payload.url === url.value
    ) {
      setProgress(msg.payload.progress);
    }
  });
})

</script>


<template>
  <div class="p-4 h-screen w-screen bg-blue-200 text-white flex flex-col">
    <h1>{{ title || 'Title' }}</h1>
    <video-player
        class="w-full flex-grow"
        :src="url"
        preload="auto"
        autoplay
        crossorigin="anonymous"
        playsinline
        controls
        :volume="0.6"
        :height="320"
        :playback-rates="[0.7, 1.0, 1.5, 2.0]"
        @play="handleEvent($event)"
        @pause="handleEvent($event)"
        @ended="handleEvent($event)"
        @loadeddata="handleEvent($event)"
        @waiting="handleEvent($event)"
        @playing="handleEvent($event)"
        @canplay="handleEvent($event)"
        @canplaythrough="handleEvent($event)"
        @timeupdate="handleEvent(player?.currentTime())"
        @mounted="handleMounted"
    >
      <template v-slot="{ player, state }">
        <div>
          <button
              @click="pushProgress"
              class="fixed
                          block
                          top-1/2
                          right-12
                          transform
                          -translate-y-1/2
                          bg-opacity-20
                          hover:!bg-opacity-75
                          hover:!bg-blue-200
                          text-white
                          p-4
                          rounded-full
                          w-16 h-16 items-center justify-center
                          !border-2 !border-dashed border-gray-300
">
            同步
          </button>
        </div>

      </template>
    </video-player>
    <footer>
      放点啥呢～～～
      <p>
        url: {{ url }}
      </p>
      <ul class="flex flex-wrap">
        <li v-for="(ep, ei) in sp.episodes"
            class="px-4 py-2"
        >
          <router-link
              :to="{
                name: 'Play',
                query: {
                 room : 1 ,
                 url: ep.url,
                 animeIndex,
                 spIndex,
                 epIndex: ei,
                 },
                params: {
                  video_id: ei,
                }
            }">
            <button type="button"
                    class="rounded-md bg-indigo-50 px-3
                      py-2 text-sm font-semibold
                      text-indigo-600 shadow-sm
                      hover:bg-indigo-100"
                    :class="{
                      'bg-red-200' : ei===epIndex
                    }"
            >
              {{ ep.title }}
            </button>
          </router-link>

        </li>

      </ul>


    </footer>
  </div>
</template>

<style lang="scss" scoped>
.video-player {
  background-color: black;
  width: 100%;
}
</style>