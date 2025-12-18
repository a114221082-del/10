# ⚡ 快速開始 - 5 分鐘上手

## 1️⃣ 安裝依賴（1 分鐘）

```bash
cd /workspaces/10
npm install
```

## 2️⃣ 本地開發（1 分鐘）

```bash
npm run dev
```

🌐 訪問 `http://localhost:3000`

## 3️⃣ 測試功能（1 分鐘）

### 測試聊天機器人
- 點擊 "開始聊天" 按鈕
- 輸入：`你好`、`景點`、`行程` 等
- 查看 AI 回應

### 測試聯絡表單
- 填寫表單
- 提交
- 查看成功訊息

### 測試 API 直接訪問
```bash
# 健康檢查
curl http://localhost:3000/api/health

# 聊天 API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "你好"}'
```

## 4️⃣ 部署到 Vercel（2 分鐘）

### 方式 A：使用 CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 方式 B：使用網頁
1. 推送到 GitHub
2. 訪問 vercel.com
3. 連接 GitHub 倉庫
4. 自動部署

---

## 📁 核心文件位置

| 功能 | 文件位置 |
|------|--------|
| 修改網頁外觀 | `public/css/styles.css` |
| 修改網頁內容 | `public/index.html` |
| 修改前端邏輯 | `public/js/main.js` |
| 修改聊天回應 | `api/chat.js` |
| 修改表單邏輯 | `api/contact.js` |
| 配置 Vercel | `vercel.json` |
| 配置環境變數 | `.env` 或 Vercel 儀表板 |

---

## 🎨 自訂設計

### 修改顏色
在 `public/css/styles.css` 頂部修改：
```css
:root {
  --primary-color: #FF6B35;      /* 主色 */
  --secondary-color: #F7931E;    /* 次要色 */
  --accent-color: #FDB833;       /* 強調色 */
}
```

### 修改文字
在 `public/index.html` 修改各區域的文字

### 添加圖片
把圖片放在 `public/images/` 目錄，然後在 HTML 中引用

---

## 🤖 自訂 AI 回應

### 簡單方式（關鍵詞匹配）
編輯 `api/chat.js` 中的 `responses` 物件：

```javascript
const responses = {
  '你好': '歡迎！',
  '景點': '我們有很多景點...',
  // 添加更多關鍵詞
};
```

### 集成真實 AI（OpenAI）

1. 安裝包
```bash
npm install openai
```

2. 編輯 `api/chat.js`
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({ 
  apiKey: process.env.AI_API_KEY 
});

async function generateAIResponse(message) {
  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL || 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
  });
  return response.choices[0].message.content;
}
```

3. 在 Vercel 設置環境變數
- `AI_API_KEY`: 您的 OpenAI API 密鑰
- `AI_MODEL`: gpt-4 或 gpt-3.5-turbo

---

## 📝 常見修改

### 修改網站標題
`public/index.html` - 第 5 行
```html
<title>您的網站名稱</title>
```

### 修改聯絡表單收件人
`api/contact.js` - 添加郵件服務集成

### 添加新景點卡片
`public/index.html` - 在景點區域複製卡片 HTML

### 修改導航連結
`public/index.html` - 編輯 `<nav>` 部分

---

## 🐛 常見問題

**Q: 本地伺服器無法啟動？**
A: 檢查埠 3000 是否被佔用
```bash
lsof -i :3000
kill -9 <PID>
```

**Q: API 返回 404？**
A: 確保伺服器正在運行，檢查 URL 拼寫

**Q: Vercel 部署失敗？**
A: 檢查 `vercel.json` 配置，查看部署日誌

**Q: 修改環境變數後沒有生效？**
A: 需要重新部署應用程序

---

## 📚 更多幫助

- 📖 完整文檔：[README.md](README.md)
- 🚀 部署指南：[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)
- 📂 項目結構：[STRUCTURE.md](STRUCTURE.md)
- 📋 項目總結：[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- ❓ 待確認事項：[proj_ai.md](proj_ai.md)

---

**提示**：如有更複雜的需求，請填寫 `proj_ai.md` 中的待確認項目，然後聯絡開發團隊進行二次開發。

🎉 **祝您開發愉快！**
