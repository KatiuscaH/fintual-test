class Portfolio {
    constructor() {
        this.stocks = {}
    }

    addStock(stockCode, prices) {
        this.stocks[stockCode] = prices
    }

    price(stockCode, date) {
        return this.stocks[stockCode][date] || 0
    }

    profit(startDate, endDate) {
        let startValue = 0
        let endValue = 0

        for (let stockCode in this.stocks) {
            startValue += this.price(stockCode, startDate)
            endValue += this.price(stockCode, endDate)
        }

        return endValue - startValue;
    }

    annualizedReturn(startDate, endDate) {
        let profit = this.profit(startDate, endDate)
        let start = new Date(startDate)
        let end = new Date(endDate)
        let years = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
        let startValue = Object.keys(this.stocks)
            .reduce((sum, stockCode) => sum + this.price(stockCode, startDate), 0);
        let annualizedReturn = (profit / startValue) / years
        return annualizedReturn * 100
    }
}

const myPortfolio = new Portfolio();
myPortfolio.addStock('Stock1', {
    '2023-01-01': 450,
    '2024-01-01': 500,
})
myPortfolio.addStock('Stock2', {
    '2023-01-01': 280,
    '2024-01-01': 300,
})

const profit = myPortfolio.profit('2023-01-01', '2024-01-01')
const annualizedReturns = myPortfolio.annualizedReturn('2023-01-01', '2024-01-01')

console.log('Protfolio', myPortfolio)
console.log(`Profit: $${profit}`)
console.log(`Annualized Return: ${annualizedReturns.toFixed(2)}%`)
