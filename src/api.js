import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // 替换为你的 API 基础 URL
});


let wsClient = null;


export default {
  list: () => instance.get('/list').then(resp => resp.data),
  ws: {
    connect: () => {
      wsClient = new WebSocket('ws://172.17.2.48:3000/sync');
      return new Promise((resolve, reject) => {
        wsClient.onopen = () => {
          console.log('WebSocket client connected');
          resolve();
        };
        wsClient.onerror = err => {
          reject(err);
        };
      });
    },
    send_json: message => {
      wsClient.send(JSON.stringify(message));
    },
    onMessage: handler => {
      wsClient.onmessage = (buffer)=>handler(JSON.parse(buffer.data));
    },
    close: ()=>{
      wsClient.close();
      wsClient = null;
    }
  }
}