const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let command = "none";

app.get('/check', (req, res) => {
    res.json({ status: "success", cmd: command });
    command = "none";
});

app.post('/push', (req, res) => {
    command = req.body.cmd;
    res.send("تم حفظ الأمر: " + command);
});

app.get('/', (req, res) => {
    res.send("Server is active.");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
