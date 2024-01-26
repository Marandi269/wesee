import axios from 'axios';


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // 替换为你的 API 基础 URL
});


let wsClient = null;

const scheme = window.location.protocol;
const host = window.location.host;
const wsScheme = scheme === 'https:' ? 'wss' : 'ws';
console.log('VITE_WS_URL:',import.meta.env.VITE_WS_URL );
const wsUrl = import.meta.env.VITE_WS_URL || `${wsScheme}://${host}/api/sync`;
export default {
  list: () => instance.get('/list').then(resp => resp.data),
  ws: {
    connect: () => {
      wsClient = new WebSocket(wsUrl);
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
      wsClient.onmessage = (buffer) => handler(JSON.parse(buffer.data));
    },
    close: () => {
      wsClient.close();
      wsClient = null;
    }
  }
}