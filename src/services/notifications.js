const { Telegraf } = require('telegraf');
const logger = require('../utils/logger');
const { Users } = require('../database/models');

class NotificationService {
    constructor(bot) {
        this.bot = bot;
        this.notificationTypes = {
            TRADE_OPENED: '🟢',
            TRADE_CLOSED: '🔴',
            PRICE_ALERT: '⚠️',
            PROFIT_TARGET: '🎯',
            STOP_LOSS: '🛑',
            MARGIN_CALL: '⚡',
            SYSTEM: '🔧'
        };
    }

    async sendTradeNotification(userId, type, data) {
        try {
            const user = await Users.findByTelegramId(userId);
            if (!user?.settings?.notifications) return;

            const messages = {
                TRADE_OPENED: `
${this.notificationTypes.TRADE_OPENED} Trade Aperto

📊 Pair: ${data.pair}
📈 Direzione: ${data.direction}
💰 Entrata: ${data.price}
⚡ Leva: ${data.leverage}x
⏰ Time: ${new Date().toLocaleTimeString()}
                `,
                TRADE_CLOSED: `
${this.notificationTypes.TRADE_CLOSED} Trade Chiuso

📊 Pair: ${data.pair}
💵 P/L: ${data.pnl > 0 ? '+' : ''}${data.pnl} USDT
📊 ROE: ${data.roe}%
⏱ Durata: ${data.duration}
                `,
                PRICE_ALERT: `
${this.notificationTypes.PRICE_ALERT} Alert Prezzo

${data.pair} ha raggiunto $${data.price}
${data.message}
                `
            };

            await this.bot.telegram.sendMessage(
                userId,
                messages[type] || data.message,
                { parse_mode: 'HTML' }
            );

            logger.info(`Notification sent to ${userId}: ${type}`);
        } catch (error) {
            logger.error('Error sending notification:', error);
        }
    }

    async sendProfitNotification(userId, data) {
        const message = `
${this.notificationTypes.PROFIT_TARGET} Take Profit Raggiunto!

📈 ${data.pair}
💰 Profit: +${data.profit} USDT
⚡ ROE: +${data.roe}%
        `;

        await this.sendMessage(userId, message);
    }

    async sendSystemAlert(userId, message, type = 'info') {
        const icons = {
            info: 'ℹ️',
            warning: '⚠️',
            error: '🚨'
        };

        await this.sendMessage(userId, `${icons[type]} ${message}`);
    }

    private async sendMessage(userId, message) {
        try {
            await this.bot.telegram.sendMessage(userId, message, {
                parse_mode: 'HTML'
            });
        } catch (error) {
            logger.error('Error sending message:', error);
        }
    }
}

module.exports = NotificationService;