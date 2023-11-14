#ifndef EXECUTION_H
#define EXECUTION_H

#include <string>

class Execution {
private:
    AlpacaApi alpacaApi;

public:
    Execution(const std::string& api_key, const std::string& secret_key, const std::string& base_url);

    void executeTrade(const std::string& symbol, double position_size, double entry_price);
    void submitStopLossOrder(const std::string& symbol, double position_size, double stop_loss_price);
};

#endif
