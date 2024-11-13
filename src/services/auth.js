const jwt = require('jsonwebtoken');
const { Users } = require('../database/models');
const { ValidationError } = require('../utils/errorHandler');

class AuthService {
    static async generateToken(userId) {
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    }

    static async validateWebAppUser(initData) {
        try {
            const data = new URLSearchParams(initData);
            // Verifica hash Telegram
            if (!this.validateTelegramHash(data)) {
                throw new ValidationError('Invalid Telegram hash');
            }
            return { userId: data.get('id'), username: data.get('username') };
        } catch (error) {
            throw new ValidationError('Invalid authentication data');
        }
    }

    static async setupUserApi(userId, apiKey, apiSecret) {
        const encryptedKeys = this.encryptApiKeys(apiKey, apiSecret);
        await Users.updateApiKeys(userId, encryptedKeys);
    }

    private static encryptApiKeys(key, secret) {
        // Implementa crittografia delle API keys
    }
}

module.exports = AuthService;