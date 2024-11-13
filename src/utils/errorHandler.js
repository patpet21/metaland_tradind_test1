const logger = require('./logger');

class ErrorHandler {
    static async handle(error, ctx) {
        const errorTypes = {
            API_ERROR: '🔌 Errore API',
            TRADE_ERROR: '📈 Errore Trading',
            AUTH_ERROR: '🔐 Errore Autenticazione',
            VALIDATION_ERROR: '⚠️ Errore Validazione',
            SYSTEM_ERROR: '🔧 Errore Sistema'
        };

        try {
            logger.error('Error occurred:', {
                error: error.message,
                type: error.type,
                userId: ctx?.from?.id,
                command: ctx?.message?.text
            });

            const userMessage = this.getUserMessage(error);
            
            if (ctx) {
                await ctx.reply(userMessage, { 
                    parse_mode: 'HTML',
                    reply_to_message_id: ctx.message?.message_id 
                });
            }

            if (this.shouldAlertAdmin(error)) {
                await this.alertAdmin(error);
            }

        } catch (e) {
            logger.error('Error in error handler:', e);
        }
    }

    static getUserMessage(error) {
        const baseMessage = '⚠️ Si è verificato un errore';

        switch (error.type) {
            case 'API_ERROR':
                return `${baseMessage} di connessione. Riprova tra poco.`;
            case 'TRADE_ERROR':
                return `${baseMessage} nell'esecuzione del trade. Verifica i parametri.`;
            case 'AUTH_ERROR':
                return `${baseMessage} di autenticazione. Ricontrolla le tue API keys.`;
            case 'VALIDATION_ERROR':
                return `${baseMessage} nei parametri. ${error.message}`;
            default:
                return `${baseMessage}. Riprova più tardi.`;
        }
    }

    static shouldAlertAdmin(error) {
        return ['SYSTEM_ERROR', 'API_ERROR'].includes(error.type);
    }

    static async alertAdmin(error) {
        const adminId = process.env.ADMIN_TELEGRAM_ID;
        if (!adminId) return;

        const message = `
🚨 ALERT SISTEMA

Tipo: ${error.type}
Messaggio: ${error.message}
Stack: ${error.stack}
Timestamp: ${new Date().toISOString()}
        `;

        try {
            await bot.telegram.sendMessage(adminId, message);
        } catch (e) {
            logger.error('Error sending admin alert:', e);
        }
    }
}

// Custom Error Classes
class TradingError extends Error {
    constructor(message) {
        super(message);
        this.type = 'TRADE_ERROR';
    }
}

class APIError extends Error {
    constructor(message) {
        super(message);
        this.type = 'API_ERROR';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.type = 'VALIDATION_ERROR';
    }
}

module.exports = {
    ErrorHandler,
    TradingError,
    APIError,
    ValidationError
};