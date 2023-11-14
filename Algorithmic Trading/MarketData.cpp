#include "MarketData.h"

MarketData::MarketData(const std::string& api_key) : alphaVantageApi(api_key) {}

std::vector<double> MarketData::getHistoricalPriceData(const std::string& symbol, const std::string& interval, int data_points) {
    // Use Alpha Vantage API to retrieve historical price data
    return alphaVantageApi.getHistoricalPriceData(symbol, interval, data_points);
}
