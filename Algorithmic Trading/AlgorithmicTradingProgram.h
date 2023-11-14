#ifndef ALGORITHMIC_TRADING_PROGRAM_H
#define ALGORITHMIC_TRADING_PROGRAM_H

#include "MarketData.h"
#include "TechnicalIndicators.h"
#include "TradingStrategy.h"
#include "RiskManagement.h"
#include "Execution.h"

class AlgorithmicTradingProgram {
private:
    MarketData& marketData;
    TechnicalIndicators& technicalIndicators;
    TradingStrategy& tradingStrategy;
    RiskManagement& riskManagement;
    Execution& execution;

public:
    AlgorithmicTradingProgram(MarketData& md, TechnicalIndicators& ti, TradingStrategy& ts, RiskManagement& rm, Execution& ex)
        : marketData(md), technicalIndicators(ti), tradingStrategy(ts), riskManagement(rm), execution(ex) {}

    // Functions to control the overall flow of the program
    void start();
};

#endif
