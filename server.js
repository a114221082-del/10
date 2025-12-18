import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 取得當前目錄
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 中介層
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 健康檢查
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// AI 客服聊天 API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: '訊息不能為空' });
    }

    // 簡單的 AI 回應邏輯（可根據需要集成真實 AI 服務）
    const response = generateAIResponse(message);

    res.status(200).json({
      message: message,
      reply: response,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: '服務器內部錯誤' });
  }
});

// 聯絡表單 API
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 驗證
    if (!name || !email || !message) {
      return res.status(400).json({ error: '缺少必要欄位' });
    }

    // TODO: 可以在這裡集成 Email 服務或資料庫
    console.log('聯絡表單收到:', { name, email, subject, message });

    res.status(200).json({
      success: true,
      message: '感謝您的聯絡，我們將盡快回覆您。',
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: '表單提交失敗' });
  }
});

// 主頁路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 伺服器運行於 http://localhost:${PORT}`);
});

/**
 * 生成 AI 回應
 * @param {string} message - 用戶訊息
 * @returns {string} AI 回應
 */
function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  // 簡單的關鍵詞匹配（可替換為真實 AI 服務）
  const responses = {
    問候: '你好！歡迎諮詢我們的旅遊服務。請問有什麼我可以幫助的嗎？',
    景點: '我們提供國內外多個熱門景點的旅遊推薦。請告訴我您有興趣的地區！',
    行程: '我可以根據您的偏好和時間幫您規劃最完美的旅遊行程。',
    價格: '價格因景點和季節而異，請告訴我您的具體需求。',
    預訂: '您可以通過我們的聯絡表單提交預訂請求。',
    默認: '感謝您的提問！請提供更多詳情，我會盡力協助。',
  };

  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  return responses.默認;
}

export default app;
