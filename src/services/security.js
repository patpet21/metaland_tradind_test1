const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { TradingError } = require('../utils/errorHandler');

class SecurityService {
    static getMiddleware() {
        return [
            helmet(),
            this.getRateLimiter(),
            this.validateRequest,
            this.sanitizeInput
        ];
    }

    static getRateLimiter() {
        return rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minuti
            max: 100 // limit each IP to 100 requests per windowMs
        });
    }

    static validateRequest(req, res, next) {
        // Implementa validazione richieste
    }

    static sanitizeInput(req, res, next) {
        // Implementa sanificazione input
    }
}

module.exports = SecurityService;