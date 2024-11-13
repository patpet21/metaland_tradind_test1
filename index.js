require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Menu principale con pulsanti fisici (non inline)
const mainKeyboard = Markup.keyboard([
    ['📊 Trading Status'],
    ['⚙️ Settings', 'ℹ️ Info'],
    ['❓ Help']
]).resize();

// Menu impostazioni
const settingsKeyboard = Markup.keyboard([
    ['🔐 API Settings', '⚡ Trading Mode'],
    ['🔔 Notifications'],
    ['🔙 Back to Main Menu']
]).resize();

// Comando start
bot.command('start', async (ctx) => {
    const userName = ctx.message.from.first_name;
    await ctx.reply(
        `🚀 Benvenuto ${userName} in MetaLand Trading Bot!\n\nSeleziona un'opzione dal menu:`,
        mainKeyboard
    );
});

// Gestione pulsante Trading Status
bot.hears('📊 Trading Status', async (ctx) => {
    await ctx.reply(`📈 Trading Status:

🏦 Account Balance: 0 USDT
📊 Active Trades: 0
🔄 Last Update: ${new Date().toLocaleTimeString()}

⚠️ Trading non ancora attivo`);
});

// Gestione pulsante Settings
bot.hears('⚙️ Settings', async (ctx) => {
    await ctx.reply('⚙️ Seleziona un\'opzione:', settingsKeyboard);
});

// Gestione Back to Main Menu
bot.hears('🔙 Back to Main Menu', async (ctx) => {
    await ctx.reply('🔙 Menu Principale:', mainKeyboard);
});

// Gestione API Settings
bot.hears('🔐 API Settings', async (ctx) => {
    await ctx.reply(`🔑 API Settings:

1. Vai su Bybit
2. Crea nuova API Key
3. Copia API Key e Secret
4. Usa /register per configurare

⚠️ Importante: Non condividere mai le tue API keys!`);
});

// Gestione Trading Mode
bot.hears('⚡ Trading Mode', async (ctx) => {
    await ctx.reply(`🔄 Trading Mode:

📈 Current Mode: Demo
💰 Risk Level: Low
🤖 Auto Trading: Off

⚠️ Demo mode attivo`);
});

// Gestione Notifications
bot.hears('🔔 Notifications', async (ctx) => {
    await ctx.reply(`🔔 Notification Settings:

✅ Trade Alerts: ON
✅ Balance Updates: ON
✅ Error Alerts: ON
❌ News Alerts: OFF`);
});

// Gestione Info
bot.hears('ℹ️ Info', async (ctx) => {
    await ctx.reply(`ℹ️ MetaLand Trading Bot

Version: 1.0.0 BETA
Status: Development Mode

🔥 Features:
- Automatic Trading
- Real-time Monitoring
- Custom Strategies
- Risk Management

🌟 Coming Soon:
- Advanced Analytics
- Multi-pair Trading
- Portfolio Management`);
});

// Gestione Help
bot.hears('❓ Help', async (ctx) => {
    await ctx.reply(`📚 Guida Comandi:

/start - Avvia il bot
/register - Registrazione
/status - Stato sistema
/settings - Impostazioni
/help - Questo menu

💡 Tips:
- Usa i pulsanti per navigare
- Controlla lo stato regolarmente
- Configura le notifiche

⚠️ Note:
- Bot in fase BETA
- Trading demo attivo
- Supporto via /support`);
});

// Comando register
bot.command('register', async (ctx) => {
    await ctx.reply(`🔐 Registrazione:

Per registrarti segui questi passi:

1️⃣ Crea un account Bybit
2️⃣ Genera le API Keys
3️⃣ Configura il livello di rischio
4️⃣ Scegli le coppie di trading

⚠️ Note: In fase BETA solo demo disponibile`);
});

// Avvio del bot
bot.launch()
    .then(() => {
        console.log('🚀 MetaLand Trading Bot avviato!');
        console.log('⌛ In attesa di comandi...');
    })
    .catch((err) => {
        console.error('❌ Errore:', err);
    });

// Gestione arresto gradevole
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
