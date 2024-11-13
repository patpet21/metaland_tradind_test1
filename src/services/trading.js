class MetaLandTrading {
    constructor() {
        this.tg = window.Telegram.WebApp;
        this.init();
        this.positions = [];
        this.currentPair = 'BTC/USDT';
        this.leverage = 2.5;
    }

    init() {
        this.tg.expand();
        this.tg.ready();
        this.setupEventListeners();
        this.initializeWebApp();
        this.startPriceUpdates();
    }

    initializeWebApp() {
        document.body.className = this.tg.colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white';
        this.tg.MainButton.setParams({
            text: 'APRI TRADE',
            color: '#2ecc71'
        }).hide();
    }

    setupEventListeners() {
        document.querySelector('.bg-green-500').addEventListener('click', () => this.openTrade('LONG'));
        document.querySelector('.bg-red-500').addEventListener('click', () => this.openTrade('SHORT'));
        document.querySelectorAll('nav button').forEach(button => {
            button.addEventListener('click', (e) => this.navigateTo(e.target.textContent.trim()));
        });
    }

    openTrade(direction) {
        const pair = this.currentPair;
        const message = `
 Nuovo Trade ${direction}
📊 Pair: ${pair}
📈 Leva: ${this.leverage}x
⏰ Timestamp: ${new Date().toLocaleTimeString()}
        `;

        this.tg.showConfirm(message, (confirmed) => {
            if (confirmed) {
                this.executeTrade(direction, pair);
            }
        });
    }

    executeTrade(direction, pair) {
        const newPosition = {
            pair: pair,
            direction: direction,
            entryPrice: this.getCurrentPrice(pair),
            leverage: this.leverage,
            timestamp: Date.now(),
            pnl: 0
        };

        this.positions.push(newPosition);
        this.updatePositions();
        this.tg.showAlert('Trade eseguito con successo! 🎯');
    }

    updatePositions() {
        const container = document.getElementById('positions');
        container.innerHTML = this.positions.map(pos => this.createPositionElement(pos)).join('');
    }

    createPositionElement(position) {
        const pnlClass = position.pnl >= 0 ? 'text-green-500' : 'text-red-500';
        return `
            <div class="flex justify-between items-center border-b border-gray-700 pb-4 slide-in">
                <div>
                    <div class="font-bold">${position.pair}</div>
                    <div class="text-sm text-gray-400">${position.direction} • ${position.leverage}x</div>
                </div>
                <div class="text-right">
                    <div class="${pnlClass}">${position.pnl.toFixed(2)} USDT</div>
                    <div class="text-sm ${pnlClass}">${this.calculatePnlPercentage(position)}%</div>
                </div>
            </div>
        `;
    }

    startPriceUpdates() {
        setInterval(() => {
            this.updatePrices();
        }, 2000);
    }

    updatePrices() {
        const priceElement = document.querySelector('.text-xl.font-bold');
        const changeElement = priceElement.nextElementSibling;
        const currentPrice = this.getCurrentPrice('BTC/USDT');
        const change = ((Math.random() * 2) - 1).toFixed(2);
        
        priceElement.textContent = `$${currentPrice.toLocaleString()}`;
        changeElement.textContent = `${change}%`;

        const isPositive = parseFloat(change) >= 0;
        priceElement.className = `text-xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`;
        changeElement.className = `text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`;
    }

    getCurrentPrice(pair) {
        return Math.floor(40000 + Math.random() * 5000);
    }

    calculatePnlPercentage(position) {
        return ((Math.random() * 4) - 2).toFixed(2);
    }

    navigateTo(section) {
        console.log(`Navigating to ${section}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new MetaLandTrading();
});