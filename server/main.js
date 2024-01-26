const Koa = require('koa');
const Router = require('koa-router');
const websockify = require('koa-websocket');
const fs = require('fs').promises;
const path = require('path');

const app = websockify(new Koa());
const cors = require('@koa/cors');
app.use(cors({
  "origin": "*",
}));

app.use(async (ctx, next) => {
  console.log('Requested Path:', ctx.path);
  await next(); // 继续执行后续中间件
});
const router = new Router();

// 设置 HTTP 路由
router.get('/list', async (ctx, next) => {
  try {
    const files = await fs.readdir('./videos');
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    const promises = jsonFiles.map(file =>
      fs.readFile(path.join('./videos', file), 'utf8')
    );
    const contents = await Promise.all(promises);
    const data = contents.map(content => JSON.parse(content));
    ctx.body = data;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
});

app.use(router.routes()).use(router.allowedMethods());

const connections = [];
// 处理 WebSocket 连接
app.ws.use((ctx) => {
  connections.push(ctx.websocket);
  console.log('WebSocket client connected');

  ctx.websocket.on('message', (message) => {
    let data = {};
    try {
      data = eval(JSON.parse(message));
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return;
    }
    // 检查收到的消息类型
    console.log('recv:', data, data['type'], typeof data);
    if (data.type === 'publish-progress') {
      // 构建要广播的消息
      const broadcastMessage = JSON.stringify({
        type: 'dispatch-progress',
        payload:  data.payload,
      });
      console.log('broadcast:', broadcastMessage, connections.length);

      connections.forEach((conn) => {
        if (conn.readyState === conn.OPEN) {
          conn.send(broadcastMessage);
        }
      });
    }

  });

  const closeOrErrorHandler = () => {
    // 从数组中移除连接
    const index = connections.indexOf(ctx.websocket);
    if (index > -1) {
      connections.splice(index, 1);
    }
    console.log('WebSocket client disconnected or error', connections.length);
  };

  ctx.websocket.on('close', closeOrErrorHandler);
  ctx.websocket.on('error', closeOrErrorHandler);
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
