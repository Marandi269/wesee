import axios from 'axios';


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // 替换为你的 API 基础 URL
});



const scheme = window.location.protocol;
const host = window.location.host;
const wsScheme = scheme === 'https:' ? 'wss' : 'ws';
console.log('VITE_WS_URL:', import.meta.env.VITE_WS_URL);

class WsClient {
  wsUrl = import.meta.env.VITE_WS_URL || `${wsScheme}://${host}/api/sync`;

  WsClient() {
    this.wsClient = null;
    this.handler = () => {
    };
  }

  connect() {
    this.wsClient = new WebSocket(this.wsUrl);
    return new Promise((resolve, reject) => {
      this.wsClient.onopen = () => {
        console.log('WebSocket client connected');
        this.wsClient.onmessage = (buffer) => this.handler(JSON.parse(buffer.data));
        resolve();
      };
      this.wsClient.onerror = err => {
        reject(err);
      };
    });
  }

  async send_json(message) {
    if (!this.wsClient || this.wsClient.readyState === WebSocket.CLOSED || this.wsClient.readyState === WebSocket.CLOSING) {
      console.log('WebSocket is disconnected. Attempting to reconnect...');
      await this.connect();
    }
    this.wsClient.send(JSON.stringify(message));
  }

  onMessage(handler) {
    this.handler = handler;
    this.wsClient.onmessage = (buffer) => handler(JSON.parse(buffer.data));
  }

  close() {
    this.wsClient.close();
    this.wsClient = null;
    this.handler = () => {
    };
  }
}

export default {
  list: () => instance.get('/list').then(resp => resp.data),
  ws: new WsClient(),
}