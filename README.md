# 🌍 旅遊平台 - AI 客服系統

一個簡單而高效的旅遊平台官網，配備 AI 客服助手，使用 **Node.js + Express** 後端和 **Vanilla JavaScript** 前端。本專案已優化用於 **Vercel** 部署。

## ✨ 功能特性

- 🎨 **玻璃擬態設計** - 現代化 UI 視覺風格
- 🌡️ **溫暖色調** - 親切、舒適的配色方案
- 🤖 **AI 客服助手** - 即時回應用戶查詢
- 📱 **完全響應式** - 支援手機、平板、桌機
- ⚡ **Serverless 架構** - 部署在 Vercel，無伺服器維護
- 🔧 **ES6+ 程式碼** - 現代 JavaScript 標準

---

## 🚀 快速開始

### 前置要求
- Node.js 18.x 或更高版本
- npm 8.x 或更高版本

### 安裝與運行

```bash
# 安裝依賴
npm install

# 本地開發
npm run dev

# 伺服器將在 http://localhost:3000 啟動
```

### 使用 Vercel CLI 本地測試

```bash
npm install -g vercel
vercel dev
```

---

## 📁 專案結構

```
├── api/                      # Vercel Serverless Functions
│   ├── health.js            # 健康檢查
│   ├── chat.js              # AI 客服
│   └── contact.js           # 聯絡表單
├── public/                   # 前端資源
│   ├── index.html
│   ├── css/styles.css       # 玻璃擬態設計
│   └── js/main.js           # 前端邏輯
├── server.js                # 本地開發伺服器
├── package.json
├── vercel.json              # Vercel 配置
├── .env.example
└── STRUCTURE.md             # 詳細結構說明
```

---

## 🔌 API 端點

### 1. 健康檢查
```
GET /api/health
```

### 2. AI 客服聊天
```
POST /api/chat
Body: { "message": "你好" }
```

### 3. 聯絡表單
```
POST /api/contact
Body: { "name": "...", "email": "...", "subject": "...", "message": "..." }
```

---

## 🎨 設計特點

- **色彩方案**: 溫暖色調（橙色 #FF6B35 為主色）
- **玻璃擬態**: 使用 CSS backdrop-filter 實現現代效果
- **響應式**: 支援桌機、平板、手機全尺寸

---

## 📦 部署到 Vercel

### 方法 1: CLI 部署
```bash
vercel login
vercel --prod
```

### 方法 2: GitHub 連接
1. 推送程式碼到 GitHub
2. 在 vercel.com 連接倉庫
3. 自動部署

### 環境變數配置
在 Vercel 儀表板設置：
- `NODE_ENV`: production
- `AI_API_KEY`: 您的 AI 服務 API 密鑰
- `AI_MODEL`: 使用的 AI 模型

---

## 🛠️ 開發指南

### 添加新 API 端點
在 `/api/` 建立新檔案：

```javascript
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    res.status(200).json({ data: 'Your data' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
```

### 集成真實 AI 服務

編輯 `/api/chat.js` 集成 OpenAI 或其他 AI 服務：

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.AI_API_KEY });

async function generateAIResponse(message) {
  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL || 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
  });
  return response.choices[0].message.content;
}
```

---

## 📱 響應式斷點

- **桌機**: 1024px+
- **平板**: 768px - 1023px
- **手機**: 480px - 767px

---

## 🔐 安全性

- ✅ CORS 設定
- ✅ 輸入驗證
- ✅ 環境變數管理
- ✅ HTML 轉義 (XSS 防護)

---

## 📚 相關資源

- [Express.js 文件](https://expressjs.com/)
- [Vercel 文件](https://vercel.com/docs)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

**版本**: 1.0.0  
**最後更新**: 2025-12-18
