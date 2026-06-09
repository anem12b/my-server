const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let command = "none";

// مسار للتحقق الأساسي
app.get('/', (req, res) => {
    res.send("Server is running!");
});

// مسار التحقق من الأوامر
app.get('/check', (req, res) => {
    res.json({ status: "success", cmd: command });
    command = "none";
});

// مسار إرسال الأوامر
app.post('/push', (req, res) => {
    command = req.body.cmd;
    res.send("Command received: " + command);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
