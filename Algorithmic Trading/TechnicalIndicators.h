#ifndef TECHNICALINDICATORS_H
#define TECHNICALINDICATORS_H

#include <vector>

class TechnicalIndicators {
public:
    double simpleMovingAverage(const std::vector<double>& prices, int period);
    double exponentialMovingAverage(const std::vector<double>& prices, int period);
    std::pair<std::vector<double>, std::vector<double>> stochasticOscillator(const std::vector<double>& high_prices, const std::vector<double>& low_prices, const std::vector<double>& close_prices, int period);
    double relativeStrengthIndex(const std::vector<double>& prices, int period);
};

#endif
