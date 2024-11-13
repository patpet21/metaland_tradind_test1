const { Users, Trades } = require('../database/models');

class AnalyticsService {
    async getDashboardStats() {
        const [
            activeUsers,
            dailyTrades,
            volume,
            errors
        ] = await Promise.all([
            this.getActiveUsers(),
            this.getDailyTrades(),
            this.get24hVolume(),
            this.get24hErrors()
        ]);

        return {
            activeUsers,
            dailyTrades,
            volume,
            errors
        };
    }

    async getUserPerformance(userId) {
        const trades = await Trades.getUserTrades(userId);
        return {
            totalTrades: trades.length,
            winRate: this.calculateWinRate(trades),
            avgProfit: this.calculateAvgProfit(trades),
            bestTrade: this.getBestTrade(trades),
            worstTrade: this.getWorstTrade(trades)
        };
    }
}

module.exports = AnalyticsService;