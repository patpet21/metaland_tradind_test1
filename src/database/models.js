const db = require('./connect');

const Users = {
    async create(userData) {
        const collection = await db.getCollection('users');
        return collection.insertOne({
            telegram_id: userData.telegram_id,
            username: userData.username,
            created_at: new Date(),
            settings: {
                leverage: 2,
                pairs: ['BTC/USDT', 'ETH/USDT'],
                notifications: true
            },
            api_keys: {
                bybit: {
                    key: userData.bybit_key,
                    secret: userData.bybit_secret
                }
            }
        });
    },

    async findByTelegramId(telegramId) {
        const collection = await db.getCollection('users');
        return collection.findOne({ telegram_id: telegramId });
    },

    async updateSettings(telegramId, settings) {
        const collection = await db.getCollection('users');
        return collection.updateOne(
            { telegram_id: telegramId },
            { $set: { settings } }
        );
    }
};

const Trades = {
    async create(tradeData) {
        const collection = await db.getCollection('trades');
        return collection.insertOne({
            user_id: tradeData.user_id,
            pair: tradeData.pair,
            type: tradeData.type, // LONG/SHORT
            entry_price: tradeData.entry_price,
            leverage: tradeData.leverage,
            status: 'OPEN',
            created_at: new Date()
        });
    },

    async getUserTrades(userId) {
        const collection = await db.getCollection('trades');
        return collection.find({ user_id: userId }).toArray();
    }
};

module.exports = { Users, Trades };