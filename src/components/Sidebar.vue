<template>
  <div :class="isCollapsed ? 'w-12' : 'w-64'"
       class="transition-width duration-300 ease-in-out relative">
    <slot>
    </slot>
    <button @click="toggleSidebar"
            :class="[isCollapsed ? 'opacity-50' : 'opacity-100', 'bg-gray-500 hover:bg-gray-600']"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-full w-4 h-8 flex items-center justify-center text-white font-bold focus:outline-none transition-all duration-300 ease-in-out">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              :d="isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import {ref, defineProps, defineEmits} from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const isCollapsed = ref(props.modelValue);
const hover = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:modelValue', isCollapsed.value);
};
</script>

<style>
.transition-width {
  transition-property: width;
}

button {
  transition: opacity 0.3s, transform 0.3s;
}

button:hover {
  opacity: 1;
}
</style>
