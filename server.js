const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let ledState = false; // Estado do LED

app.use(express.json());

app.post('/led/on', (req, res) => {
    ledState = true;
    console.log("LED ligado");
    res.send('LED ligado');
});

app.post('/led/off', (req, res) => {
    ledState = false;
    console.log("LED desligado");
    res.send('LED desligado');
});

app.get('/led/state', (req, res) => {
    res.json({ state: ledState });
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});


//hello
