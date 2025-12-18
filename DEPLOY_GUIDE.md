# 🚀 Vercel + Node.js 部署指南

## 📋 快速檢查清單

- [x] 專案結構已創建
- [x] Node.js 後端已配置（Express + CORS）
- [x] Vercel Serverless Functions 已實現 (api/*)
- [x] 前端 HTML + CSS + JS 已完成
- [x] 玻璃擬態設計已實現
- [x] 響應式設計已實現
- [x] vercel.json 配置已優化
- [x] package.json 已配置
- [x] .env 環境變數已設置

---

## 🎯 部署步驟

### 第一步：本地測試

#### 1.1 安裝依賴
```bash
cd /workspaces/10
npm install
```

#### 1.2 本地開發伺服器
```bash
npm run dev
```
訪問 `http://localhost:3000` 測試

#### 1.3 本地 Vercel 測試（可選）
```bash
npm install -g vercel
vercel dev
```

---

### 第二步：上傳到 GitHub

```bash
# 初始化 git（如果還未初始化）
git add .
git commit -m "初始提交：旅遊平台 + AI 客服系統"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/travel-platform.git
git push -u origin main
```

---

### 第三步：在 Vercel 部署

#### 方法 A：使用 Vercel CLI

```bash
# 1. 登入 Vercel
vercel login

# 2. 部署到生產環境
vercel --prod

# 3. 設置環境變數（根據提示設置）
```

#### 方法 B：使用 Vercel 網站

1. 訪問 https://vercel.com
2. 點擊 "New Project"
3. 選擇您的 GitHub 倉庫
4. 選擇 "Import"
5. 配置設置（框架：None，根目錄：./）
6. 添加環境變數（見下方）
7. 點擊 "Deploy"

---

## 🔧 環境變數配置

在 Vercel 儀表板中設置以下環境變數：

```
NODE_ENV = production
AI_API_KEY = 您的 AI 服務 API 密鑰
AI_MODEL = gpt-4（或其他模型）
```

---

## 📂 Vercel 預期目錄結構

```
.
├── api/
│   ├── health.js
│   ├── chat.js
│   └── contact.js
├── public/
│   ├── index.html
│   ├── css/styles.css
│   └── js/main.js
├── package.json
├── vercel.json
└── server.js
```

**注意**：`/api` 目錄中的每個 `.js` 文件自動成為 Vercel Serverless Function

---

## 🔗 API 端點（部署後）

假設 Vercel 專案 URL 為 `https://your-project.vercel.app`

```
健康檢查：
GET https://your-project.vercel.app/api/health

AI 客服聊天：
POST https://your-project.vercel.app/api/chat

聯絡表單：
POST https://your-project.vercel.app/api/contact
```

---

## ✅ 部署驗證

### 1. 檢查前端是否可訪問
```bash
curl https://your-project.vercel.app/
```

### 2. 測試 API 端點
```bash
# 健康檢查
curl https://your-project.vercel.app/api/health

# 聊天 API
curl -X POST https://your-project.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "你好"}'
```

---

## 🎨 自訂網域（可選）

在 Vercel 專案設置中：
1. 進入 "Domains"
2. 添加自訂網域
3. 配置 DNS 設置
4. 等待 DNS 生效（通常 24 小時）

---

## 🔒 生產環境建議

- ✅ 啟用 HTTPS（Vercel 預設）
- ✅ 設置速率限制（Rate Limiting）
- ✅ 實施 CSRF 保護
- ✅ 定期備份和日誌監控
- ✅ 使用密鑰管理服務

---

## 🐛 常見問題

### 部署失敗？

1. **檢查 package.json**
   ```bash
   npm install  # 確保所有依賴可正常安裝
   ```

2. **檢查 vercel.json**
   ```bash
   cat vercel.json  # 確保配置無誤
   ```

3. **查看 Vercel 日誌**
   - 進入 Vercel 儀表板
   - 選擇專案
   - 查看 "Deployments" 中的錯誤日誌

### API 返回 404？

- 確保 `/api` 目錄中的檔案是有效的 Serverless Function
- 檢查 `vercel.json` 中的 rewrites 配置

### 環境變數未生效？

- 確保在 Vercel 儀表板中已設置
- 重新部署應用程序

---

## 📊 監控和分析

Vercel 提供的內置監控：
- **Analytics**: 實時訪問統計
- **Performance**: 頁面加載性能
- **Functions**: Serverless 函式執行情況

---

## 🔄 自動化部署

配置 GitHub Actions 自動部署：

在倉庫根目錄建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📞 支援資源

- [Vercel 官方文檔](https://vercel.com/docs)
- [Node.js on Vercel](https://vercel.com/docs/functions/serverless-functions/node-js)
- [環境變數配置](https://vercel.com/docs/concepts/projects/environment-variables)

---

**🎉 完成！您的應用程序已準備部署。**
