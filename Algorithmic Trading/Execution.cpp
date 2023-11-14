#include "Execution.h"

Execution::Execution(const std::string& api_key, const std::string& secret_key, const std::string& base_url)
    : alpacaApi(api_key, secret_key, base_url) {}

void Execution::executeTrade(const std::string& symbol, double position_size, double entry_price) {
    // Use Alpaca API to submit an order
    alpacaApi.submitOrder(symbol, position_size, entry_price);
}

void Execution::submitStopLossOrder(const std::string& symbol, double position_size, double stop_loss_price) {
    // Use Alpaca API to submit a stop-loss order
    alpacaApi.submitStopLossOrder(symbol, position_size, stop_loss_price);
}
