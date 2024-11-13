const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let ledState = false; // Estado inicial do LED

app.use(express.json());  // Middleware para processar JSON

// Endpoint para ligar o LED
app.post('/led/on', (req, res) => {
    ledState = true; // Altera o estado do LED
    console.log("LED ligado");
    res.send('LED ligado');
});

// Endpoint para desligar o LED
app.post('/led/off', (req, res) => {
    ledState = false; // Altera o estado do LED
    console.log("LED desligado");
    res.send('LED desligado');
});

// Endpoint para verificar o estado do LED
app.get('/led/state', (req, res) => {
    res.json({ state: ledState });  // Retorna o estado atual do LED
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
