const { Markup } = require('telegraf');

const start = async (ctx) => {
    const welcomeMessage = `
🚀 Benvenuto in MetaLand Trading!

Apri la WebApp per iniziare a tradare:`;

    return ctx.reply(welcomeMessage, Markup.keyboard([
        [Markup.button.webApp('📱 Apri MetaLand Trading', 'https://tuo-dominio-netlify.app')]
    ]).resize());
};

module.exports = { start };