/**
 * Vercel Serverless Function - AI 客服聊天
 * 路由: /api/chat
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
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: '訊息不能為空' });
    }

    // 生成 AI 回應
    const reply = generateAIResponse(message);

    res.status(200).json({
      message: message,
      reply: reply,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: '服務器內部錯誤' });
  }
}

/**
 * 生成 AI 回應（簡單關鍵詞匹配）
 * 可替換為真實 AI 服務（OpenAI, Google Gemini 等）
 */
function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  const responses = {
    '你好': '你好！歡迎諮詢我們的旅遊服務。請問有什麼我可以幫助的嗎？',
    '景點': '我們提供國內外多個熱門景點的旅遊推薦。請告訴我您有興趣的地區！',
    '行程': '我可以根據您的偏好和時間幫您規劃最完美的旅遊行程。',
    '價格': '價格因景點和季節而異，請告訴我您的具體需求。',
    '預訂': '您可以通過我們的聯絡表單提交預訂請求。',
    '推薦': '根據不同季節和興趣，我可以推薦多個行程。請分享更多細節！',
    '交通': '我們提供完整的交通建議，包括機票、高鐵、巴士等安排。',
    '住宿': '我們合作了多家優質酒店和民宿，可根據預算推薦。',
  };

  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  return '感謝您的提問！請提供更多詳情，我會盡力協助。如有其他問題，歡迎繼續提問。';
}
