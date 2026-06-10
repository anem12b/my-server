const express = require('express');
const https = require('https');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

const TOKEN = "8670809794:AAF8SfJ56yY5ysR0TsCJ1sQDdHRSmmPGtZk";
const RENDER_URL = "https://my-server-bit5b.onrender.com";

let command = "none";

function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
  https.get(url, () => {});
}

app.post('/webhook', (req, res) => {
  const msg = req.body.message;
  if (msg && msg.text) {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
      sendMessage(chatId, 'البوت يعمل ✅');
    } else if (text === '/check') {
      sendMessage(chatId, 'الأمر الحالي: ' + command);
    } else if (text.startsWith('/push ')) {
      command = text.replace('/push ', '');
      sendMessage(chatId, 'تم إرسال الأمر: ' + command);
    } else {
      sendMessage(chatId, 'أمر غير معروف');
    }
  }
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send("Server is running!");
});

app.get('/check', (req, res) => {
  res.json({ status: "success", cmd: command });
  command = "none";
});

app.post('/push', (req, res) => {
  command = req.body.cmd;
  res.send("Command received: " + command);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  https.get(
    `https://api.telegram.org/bot${TOKEN}/setWebhook?url=${RENDER_URL}/webhook`,
    (r) => { console.log("Webhook set!"); }
  );
});
