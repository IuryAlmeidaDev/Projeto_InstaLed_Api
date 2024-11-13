const express = require('express');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3000;

let ledState = false; // Estado do LED

app.use(express.json());

// Criando o servidor WebSocket
const wss = new WebSocket.Server({ noServer: true });

// Quando um cliente se conecta via WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente conectado via WebSocket');

    // Enviar o estado inicial do LED para o cliente
    ws.send(JSON.stringify({ state: ledState }));

    // Escutar mensagens do cliente
    ws.on('message', (message) => {
        console.log('Mensagem recebida:', message);

        if (message === 'turn_on') {
            ledState = true;
            console.log("LED ligado");
            ws.send('LED ligado');
        } else if (message === 'turn_off') {
            ledState = false;
            console.log("LED desligado");
            ws.send('LED desligado');
        }
    });

    // Quando o cliente desconectar
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Redireciona a requisição HTTP para o WebSocket
app.server = app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
