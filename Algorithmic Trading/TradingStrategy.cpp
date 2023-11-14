#include "TradingStrategy.h"

// Implement a basic trading strategy based on a simple moving average crossover.
bool TradingStrategy::shouldBuy(const std::vector<double>& prices, int short_period, int long_period) {
    double short_ma = simpleMovingAverage(prices, short_period);
    double long_ma = simpleMovingAverage(prices, long_period);

    if (short_ma > long_ma) {
        return true;
    } else {
        return false;
    }
}

bool TradingStrategy::shouldSell(const std::vector<double>& prices, int short_period, int long_period) {
    double short_ma = simpleMovingAverage(prices, short_period);
    double long_ma = simpleMovingAverage(prices, long_period);

    if (short_ma < long_ma) {
        return true;
    } else {
        return false;
    }
}
