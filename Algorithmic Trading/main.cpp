#include <iostream>
#include "MarketData.h"
#include "TechnicalIndicators.h"
#include "TradingStrategy.h"
#include "RiskManagement.h"
#include "Execution.h"
#include "AlgorithmicTradingProgram.h"

int main() {
    // Initialize the components of the trading program
    MarketData marketData;
    TechnicalIndicators technicalIndicators;
    TradingStrategy tradingStrategy;
    RiskManagement riskManagement;
    Execution execution;

    // Create an instance of the algorithmic trading program
    AlgorithmicTradingProgram tradingProgram(marketData, technicalIndicators, tradingStrategy, riskManagement, execution);

    // Start the trading program
    tradingProgram.start();

    return 0;
}
