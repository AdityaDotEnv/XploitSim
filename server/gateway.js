import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const PORT = process.env.GATEWAY_PORT || 5000;

app.use(cors());

// Proxy configuration map
const proxies = {
  '/api/auth': 'http://localhost:4100',
  '/api/broken-access-control': 'http://localhost:4000',
  '/api/cryptographic-failures': 'http://localhost:5001',
  '/api/injection': 'http://localhost:5100',
  '/api/insecure-design': 'http://localhost:5200',
  '/api/security-misconfiguration': 'http://localhost:5300',
  '/api/vulnerable-components': 'http://localhost:5002',
  '/api/software-data-integrity': 'http://localhost:5400',
  '/api/security-logging-failures': 'http://localhost:5600',
  '/api/server-side-request-forgery': 'http://localhost:5500',
};

// Apply proxies
Object.entries(proxies).forEach(([path, target]) => {
  app.use(path, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${path}`]: '', // strip the prefix when sending to the target
    },
  }));
});

app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running', port: PORT });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
});

