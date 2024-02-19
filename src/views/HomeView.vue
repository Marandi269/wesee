<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar v-model="isCollapsed">
      <div class="h-full w-full bg-white">
        <div class="flex items-center justify-center bg-black p-4 overflow-hidden">
          <span class="text-white text-3xl font-bold">OmOFUN</span>
        </div>

        <div class="flex flex-col divide-y">
          <div class="group flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-amber-400" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9.5V22h18V9.5L12 2 3 9.5z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 22V12h6v10"/>
            </svg>
            <span class="ml-4 text-lg font-medium text-gray-800 group-hover:text-red-500">首页</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 ml-auto hidden group-hover:block"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>

          <div class="group flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-amber-400" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 21v-2m0 0c-3.31 0-6-2.69-6-6 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.31-2.69 6-6 6z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3C7.03 3 3 7.03 3 12h2m14 0c0-4.97-4.03-9-9-9v2m0 14c4.97 0 9-4.03 9-9h-2"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l-2-2 2-2 2 2-2 2z"/>
            </svg>
            <span class="ml-4 text-lg font-medium text-gray-800 group-hover:text-red-500">日榜</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 ml-auto hidden group-hover:block"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>

          <div class="group flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-amber-400" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 2v2m2.828 1.172a2 2 0 000 2.828l-1.414 1.414A4.984 4.984 0 0012 8a4.984 4.984 0 00-1.414.414L9.172 7A2 2 0 009.172 4.172M22 12h-2m-1.172-2.828a2 2 0 00-2.828 0l1.414 1.414c-.378.44-.586.994-.586 1.586s.208 1.146.586 1.586l-1.414 1.414a2 2 0 002.828 0L20 12m-7 10v-2m-2.828-1.172a2 2 0 000-2.828l1.414-1.414c-.378-.44-.586-.994-.586-1.586s.208-1.146.586-1.586l1.414-1.414a2 2 0 000 2.828L12 12m-7 0h2m1.172 2.828a2 2 0 002.828 0l-1.414-1.414c.378-.44.586-.994.586-1.586s-.208-1.146-.586-1.586l1.414-1.414a2 2 0 00-2.828 0L4 12m8 7a7 7 0 100-14 7 7 0 000 14z"/>
            </svg>
            <span class="ml-4 text-lg font-medium text-gray-800 group-hover:text-red-500">剧场版</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 ml-auto hidden group-hover:block"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>

          <div class="group flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-amber-400" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 2v2m2.828 1.172a2 2 0 000 2.828l-1.414 1.414A4.984 4.984 0 0012 8a4.984 4.984 0 00-1.414.414L9.172 7A2 2 0 009.172 4.172M22 12h-2m-1.172-2.828a2 2 0 00-2.828 0l1.414 1.414c-.378.44-.586.994-.586 1.586s.208 1.146.586 1.586l-1.414 1.414a2 2 0 002.828 0L20 12m-7 10v-2m-2.828-1.172a2 2 0 000-2.828l1.414-1.414c-.378-.44-.586-.994-.586-1.586s.208-1.146.586-1.586l1.414-1.414a2 2 0 000 2.828L12 12m-7 0h2m1.172 2.828a2 2 0 002.828 0l-1.414-1.414c.378-.44.586-.994.586-1.586s-.208-1.146-.586-1.586l1.414-1.414a2 2 0 00-2.828 0L4 12m8 7a7 7 0 100-14 7 7 0 000 14z"/>
            </svg>
            <span class="ml-4 text-lg font-medium text-gray-800 group-hover:text-red-500">热榜</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 ml-auto hidden group-hover:block"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </Sidebar>

    <div class="flex-1 p-8">
      <div class="max-w-xl mb-2">
        <div class="flex items-center bg-gray-200 rounded-full overflow-hidden">
          <input
              class="bg-gray-200 outline-none px-6 py-3 w-full"
              type="text"
              placeholder="今天你想看些什么呢？"
          />
          <button class="flex items-center justify-center px-4 border-l">
            <svg class="text-gray-600 h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h13M8 12h13m-7 6h7"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-col md:flex-row">
        <!-- Video player container -->
        <div class="w-full md:w-3/4 bg-blue-800">
          <!-- Video player -->
          <video controls class="w-full">
            <!-- Video source here -->
            Your browser does not support the video tag.
          </video>
        </div>

        <!-- Sidebar container -->
        <div class="w-full md:w-1/4 bg-white p-4">
          <!-- Content details -->
          <h2 class="text-lg font-semibold">标题</h2>
          <p class="text-sm text-gray-600">副标题信息</p>
          <div class="flex items-center my-2">
            <span class="text-red-500">2024</span>
            <span class="mx-2">|</span>
            <span>中文 / 英语 / 日语</span>
          </div>
          <!-- Rating and options -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-red-500">评分</span>
              <span class="ml-2 text-red-500">5</span>
            </div>
            <button class="text-blue-600">更多选项</button>
          </div>
          <!-- Episode selection -->
          <div class="mt-4">
            <div class="flex flex-wrap justify-start overflow-auto">
              <button class="m-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">第03集</button>
              <button class="m-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">第04集</button>
              <button class="m-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">第05集</button>
              <button class="m-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">第06集</button>
              <button class="m-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">第07集</button>
            </div>
          </div>
        </div>
      </div>
      <hr>

    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Sidebar from '@/components/Sidebar.vue';

const isCollapsed = ref(false);
</script>

