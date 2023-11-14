#ifndef TRADINGSTRATEGY_H
#define TRADINGSTRATEGY_H

#include "TechnicalIndicators.h"
#include <vector>

class TradingStrategy : public TechnicalIndicators {
public:
    bool shouldBuy(const std::vector<double>& prices, int short_period, int long_period); // Function to check for buy signals
    bool shouldSell(const std::vector<double>& prices, int short_period, int long_period); // Function to check for sell signals
};

#endif
