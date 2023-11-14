#include "AlgorithmicTradingProgram.h"

void AlgorithmicTradingProgram::start() {
    // Initialize API keys and API objects
    std::string alpha_vantage_api_key = "your_alpha_vantage_api_key";
    std::string alpaca_api_key = "your_alpaca_api_key";
    std::string alpaca_secret_key = "your_alpaca_secret_key";
    std::string alpaca_base_url = "https://paper-api.alpaca.markets"; // Use the paper trading API for testing

    MarketData marketData(alpha_vantage_api_key);
    Execution execution(alpaca_api_key, alpaca_secret_key, alpaca_base_url);

    // Retrieve historical price data
    std::vector<double> prices = marketData.getHistoricalPriceData("AAPL", "5min", 200);

    // Calculate technical indicators
    double short_ma = technicalIndicators.simpleMovingAverage(prices, 5);
    double long_ma = technicalIndicators.simpleMovingAverage(prices, 10);

    // Check if the trading strategy signals a buy or sell opportunity
    bool buy_signal = tradingStrategy.shouldBuy(prices, 5, 10);
    bool sell_signal = tradingStrategy.shouldSell(prices, 5, 10);

    // Manage risk
    double account_balance = 10000;
    double risk_percentage = 0.01;
    double entry_price = prices.back();
    double stop_loss_price = entry_price * 0.98;
    double position_size = riskManagement.calculatePositionSize(account_balance, risk_percentage, entry_price, stop_loss_price);

    // Execute trades
    if (buy_signal) {
        execution.executeTrade("AAPL", position_size, entry_price);
        execution.submitStopLossOrder("AAPL", position_size, stop_loss_price);
    } else if (sell_signal) {
        execution.executeTrade("AAPL", -position_size, entry_price);
        execution.submitStopLossOrder("AAPL", -position_size, stop_loss_price);
    }
}
