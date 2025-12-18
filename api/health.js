/**
 * Vercel Serverless Function - 健康檢查
 * 路由: /api/health
 */

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    message: '伺服器正常運行',
  });
}
