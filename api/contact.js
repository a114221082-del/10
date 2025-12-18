/**
 * Vercel Serverless Function - 聯絡表單
 * 路由: /api/contact
 * 方法: POST
 */

export default function handler(req, res) {
  // 設定 CORS 標頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // 驗證必填欄位
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: '缺少必要欄位: name, email, message',
      });
    }

    // 驗證電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: '無效的電子郵件格式',
      });
    }

    // TODO: 這裡可以集成：
    // 1. 郵件服務 (SendGrid, Nodemailer 等)
    // 2. 資料庫儲存 (MongoDB, PostgreSQL 等)
    // 3. CRM 系統集成

    console.log('📧 新聯絡表單提交:', {
      name,
      email,
      subject: subject || '(未填寫)',
      message,
      timestamp: new Date(),
    });

    res.status(200).json({
      success: true,
      message: '感謝您的聯絡！我們將在 24 小時內回覆您的訊息。',
      data: {
        name,
        email,
        submittedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({
      success: false,
      error: '表單提交失敗，請稍後再試',
    });
  }
}
