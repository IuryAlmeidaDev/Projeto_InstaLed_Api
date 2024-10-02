const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let ledState = false; // Estado do LED

app.use(express.json());

app.post('/led/on', (req, res) => {
    ledState = true;
    console.log("LED ligado");
    res.status(200).json({ state: true }); // Retorna um JSON { state: true } para /led/on
});

app.post('/led/off', (req, res) => {
    ledState = false;
    console.log("LED desligado");
    res.status(200).json({ state: false }); // Retorna um JSON { state: false } para /led/off
});

app.get('/led/state', (req, res) => {
    res.json({ state: ledState }); // Retorna o estado atual do LED
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
