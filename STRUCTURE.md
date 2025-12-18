# 專案資料夾結構

```
travel-platform-ai/
├── api/                          # Vercel Serverless Functions
│   ├── health.js                # 健康檢查端點
│   ├── chat.js                  # AI 客服聊天端點
│   └── contact.js               # 聯絡表單端點
│
├── backend/                      # 後端程式碼（本地開發用）
│   ├── routes/                  # 路由模組
│   │   ├── chat.js              # AI 客服路由
│   │   ├── contact.js           # 聯絡表單路由
│   │   └── health.js            # 健康檢查路由
│   │
│   ├── middleware/              # 中介層
│   │   ├── errorHandler.js      # 錯誤處理中介層
│   │   ├── corsHandler.js       # CORS 設定中介層
│   │   └── validation.js        # 驗證中介層
│   │
│   └── utils/                   # 工具函式
│       ├── logger.js            # 日誌工具
│       ├── validators.js        # 驗證函式
│       └── helpers.js           # 通用協助函式
│
├── public/                       # 前端靜態資源
│   ├── index.html               # 主頁面
│   ├── css/
│   │   ├── styles.css           # 全局樣式（玻璃擬態）
│   │   ├── responsive.css       # 響應式設計
│   │   └── animations.css       # 動畫效果
│   │
│   ├── js/
│   │   ├── main.js              # 主程式入口
│   │   ├── chat.js              # 聊天機制邏輯
│   │   ├── contact.js           # 聯絡表單邏輯
│   │   └── utils.js             # 前端工具函式
│   │
│   └── images/                  # 圖片資源
│       ├── logo.png
│       └── ...
│
├── server.js                     # 本地開發伺服器
├── package.json                  # Node.js 相依性管理
├── .env.example                  # 環境變數範例
├── .gitignore                    # Git 忽略文件
├── vercel.json                   # Vercel 配置文件
├── STRUCTURE.md                  # 本文件
└── README.md                     # 專案說明文件
```

## 各資料夾說明

### `/api/` - Vercel Serverless Functions
- **用途**：部署在 Vercel 平台上的無伺服器函式
- **特點**：自動路由，無需手動設定伺服器
- **文件**：每個 `.js` 檔案自動對應 `/api/filename` 路由

### `/backend/` - 本地開發後端
- **routes/**：負責不同功能的路由模組
- **middleware/**：請求處理中介層（錯誤、CORS、驗證）
- **utils/**：可重複使用的工具函式

### `/public/` - 前端資源
- **index.html**：主頁面入口
- **css/**：玻璃擬態設計風格樣式表
- **js/**：前端邏輯和互動
- **images/**：圖片和媒體資源

### `/` - 根目錄配置
- **server.js**：本地測試伺服器
- **package.json**：專案依賴和指令
- **vercel.json**：Vercel 平台部署配置
- **.env.example**：環境變數範例
