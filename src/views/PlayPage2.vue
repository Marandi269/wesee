<template>
  <div>
    <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
      <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: 'VideoPlayer',
  mounted() {
    this.player = videojs(this.$refs.videoElement, this.options, function onPlayerReady() {
      console.log('Player is ready');
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
  data() {
    return {
      options: {
        // 在这里定义你的播放器选项
      }
    }
  }
}
</script>
