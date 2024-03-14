
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://localhost:7086',
    changeOrigin: true,
  })
);

app.listen(3001, () => {
  console.log('Proxy-Server läuft auf Port 3001');
});

