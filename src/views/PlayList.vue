<script setup>
import {onMounted, ref} from "vue";
import api from "../api.js";

const animeList = ref([]);
onMounted(async () => {
  console.log('PlayList mounted');
  const resp = await api.list();
  console.log('videos:', resp);
  animeList.value = resp;
})
</script>

<template>
  <div class="w-full bg-blue-200 min-h-screen bg-opacity-25 p-4">
    <h1 class="text-3xl mb-12">播放列表</h1>

    <div v-for="anime in animeList" class="mb-12">
      <hr>
      <h2 class="text-2xl">{{ anime.title }}</h2>
      <p class="text-sm text-gray-500 px-4">{{ anime.description }}</p>
      <div v-for="sp in anime.seasons" class="mt-2">
        <h3>{{ sp.title }}</h3>
        <ul class="flex flex-wrap">

          <li v-for="ep in sp.episodes" class="px-4 py-2">
            <router-link
                :to="{ name: 'Play', query: { url: ep.url, title: `${anime.title}:${sp.title}:${ep.title}` } }">
              <button type="button"
                      class="rounded-md bg-indigo-50 px-3
                      py-2 text-sm font-semibold
                      text-indigo-600 shadow-sm
                      hover:bg-indigo-100">
                {{ ep.title }}
              </button>
            </router-link>

          </li>

        </ul>

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>