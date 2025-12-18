/**
 * 主要 JavaScript 邏輯
 */

// 發送聊天訊息
async function sendMessage() {
  const userInput = document.getElementById('userInput');
  const message = userInput.value.trim();

  if (!message) return;

  // 顯示用戶訊息
  displayMessage(message, 'user');
  userInput.value = '';

  try {
    // 發送請求到 API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('API 請求失敗');
    }

    const data = await response.json();

    // 顯示 AI 回應
    setTimeout(() => {
      displayMessage(data.reply, 'bot');
    }, 300);
  } catch (error) {
    console.error('聊天錯誤:', error);
    displayMessage('抱歉，我暫時無法回應。請稍後再試。', 'bot');
  }
}

/**
 * 在聊天框中顯示訊息
 * @param {string} text - 訊息文本
 * @param {string} sender - 發送者（'user' 或 'bot'）
 */
function displayMessage(text, sender) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');

  messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
  messageDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * 處理回車鍵發送訊息
 * @param {KeyboardEvent} event - 鍵盤事件
 */
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

/**
 * 提交聯絡表單
 * @param {Event} event - 表單事件
 */
async function submitContact(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!response.ok) {
      throw new Error('提交失敗');
    }

    const data = await response.json();

    // 清空表單
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';

    // 顯示成功訊息
    alert(data.message);
  } catch (error) {
    console.error('表單提交錯誤:', error);
    alert('表單提交失敗，請稍後再試。');
  }
}

/**
 * 滾動到聊天區域
 */
function scrollToChat() {
  const chatSection = document.getElementById('chat');
  chatSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * 轉義 HTML 特殊字符
 * @param {string} text - 要轉義的文本
 * @returns {string} 轉義後的文本
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 頁面加載時初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 應用程序已加載');

  // 檢查伺服器健康狀態
  fetch('/api/health')
    .then((response) => response.json())
    .then((data) => {
      console.log('✅ 伺服器狀態:', data.status);
    })
    .catch((error) => {
      console.error('❌ 伺服器連接失敗:', error);
    });
});
