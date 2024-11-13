const logger = require('../utils/logger');
const NotificationService = require('./notifications');

class MonitoringService {
    constructor(tradingService, notificationService) {
        this.trading = tradingService;
        this.notifications = notificationService;
        this.monitors = new Map();
    }

    startMonitoring(userId, position) {
        const monitorId = `${userId}-${position.id}`;
        
        if (this.monitors.has(monitorId)) {
            return;
        }

        const interval = setInterval(async () => {
            try {
                const currentPrice = await this.trading.getCurrentPrice(position.pair);
                const pnl = this.calculatePnL(position, currentPrice);

                if (this.checkTakeProfit(position, pnl)) {
                    await this.notifications.sendProfitNotification(userId, {
                        pair: position.pair,
                        profit: pnl,
                        roe: this.calculateROE(position, pnl)
                    });
                }

                if (this.checkStopLoss(position, pnl)) {
                    await this.notifications.sendMessage(userId, {
                        type: 'STOP_LOSS',
                        pair: position.pair,
                        loss: pnl
                    });
                }

            } catch (error) {
                logger.error('Monitoring error:', error);
            }
        }, 5000); // Check ogni 5 secondi

        this.monitors.set(monitorId, interval);
    }

    stopMonitoring(userId, positionId) {
        const monitorId = `${userId}-${positionId}`;
        if (this.monitors.has(monitorId)) {
            clearInterval(this.monitors.get(monitorId));
            this.monitors.delete(monitorId);
        }
    }

    private calculatePnL(position, currentPrice) {
        // Implementa calcolo PnL
    }

    private calculateROE(position, pnl) {
        // Implementa calcolo ROE
    }

    private checkTakeProfit(position, pnl) {
        // Implementa verifica TP
    }

    private checkStopLoss(position, pnl) {
        // Implementa verifica SL
    }
}

module.exports = MonitoringService;