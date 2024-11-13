const crypto = require('crypto');

const helpers = {
    encryptApiKey(key) {
        const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
        let encrypted = cipher.update(key, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },

    decryptApiKey(encrypted) {
        const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    },

    calculatePnL(entry, current, size, isLong) {
        if (isLong) {
            return (current - entry) * size;
        }
        return (entry - current) * size;
    },

    formatMoney(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
};

module.exports = helpers;