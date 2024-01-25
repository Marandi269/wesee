import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import router from './router';
const app = createApp(App)
app.use(router)

app.mount('#app')
