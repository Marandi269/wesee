import {onMounted, ref} from "vue";
import api from "../api.js";

const animeList = ref([]);


export default function () {
  onMounted(async () => {
    console.log('PlayList mounted');
    const resp = await api.list();
    console.log('videos:', resp);
    animeList.value = resp;
    localStorage.setItem('animes', JSON.stringify(resp));
  });
  return animeList;
}