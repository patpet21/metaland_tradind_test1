const logger = require('../utils/logger');
const { Users, Trades } = require('../database/models');

class RiskManager {
    constructor(notificationService) {
        this.notifications = notificationService;
        this.maxDailyLoss = -10; // 10% max perdita giornaliera
        this.maxPositionSize = 20; // 20% del portfolio per posizione
    }

    async validateTrade(userId, tradeParams) {
        const user = await Users.findByTelegramId(userId);
        const balance = await this.getUserBalance(userId);

        await this.checkDailyLoss(userId, balance);
        await this.checkPositionSize(tradeParams.size, balance);
        await this.checkLeverageLimit(tradeParams.leverage);
        
        return true;
    }

    async checkDailyLoss(userId, balance) {
        const dailyPnL = await this.calculateDailyPnL(userId);
        const dailyLossPercent = (dailyPnL / balance) * 100;

        if (dailyLossPercent <= this.maxDailyLoss) {
            throw new Error('Daily loss limit reached');
        }
    }

    async checkPositionSize(size, balance) {
        const positionPercent = (size / balance) * 100;
        if (positionPercent > this.maxPositionSize) {
            throw new Error('Position size too large');
        }
    }
}

module.exports = RiskManager;