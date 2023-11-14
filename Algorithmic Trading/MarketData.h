#ifndef MARKETDATA_H
#define MARKETDATA_H

#include <string>
#include <vector>
#include "AlphaVantageApi.h"

class MarketData {
private:
    AlphaVantageApi alphaVantageApi;

public:
    MarketData(const std::string& api_key);

    std::vector<double> getHistoricalPriceData(const std::string& symbol, const std::string& interval, int data_points);
};

#endif
