const express = require('express');
const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const startCommand = require('./src/commands/start');

dotenv.config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Connessione al database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connesso con successo'))
    .catch(err => console.error('Errore connessione database:', err));

// Comando di avvio del bot
bot.start(startCommand.start);

// Avvio del bot
bot.launch()
    .then(() => console.log('Bot avviato con successo'))
    .catch(err => console.error('Errore avvio bot:', err));

// Avvio del server Express
app.use(express.static('webapp/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/webapp/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
