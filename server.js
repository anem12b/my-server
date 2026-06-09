const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

let command = "none";

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
});
