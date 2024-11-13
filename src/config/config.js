module.exports = {
    trading: {
        maxLeverage: 20,
        defaultLeverage: 2,
        supportedPairs: [
            'BTC/USDT',
            'ETH/USDT',
            'SOL/USDT',
            'DOGE/USDT'
        ],
        minOrderSize: {
            'BTC/USDT': 0.001,
            'ETH/USDT': 0.01,
            'SOL/USDT': 0.1,
            'DOGE/USDT': 100
        }
    },
    webapp: {
        url: process.env.WEBAPP_URL || 'https://metaland-trading.netlify.app'
    },
    notifications: {
        defaultEnabled: true,
        types: {
            TRADE_OPENED: true,
            TRADE_CLOSED: true,
            PRICE_ALERT: true,
            SYSTEM_ALERT: true
        }
    }
};