#include "RiskManagement.h"

// Implement a basic method to calculate position size based on the risk percentage and stop-loss level.
double RiskManagement::calculatePositionSize(double account_balance, double risk_percentage, double entry_price, double stop_loss_price) {
    double risk_amount = account_balance * risk_percentage;
    double position_size = risk_amount / std::abs(entry_price - stop_loss_price);
    return position_size;
}
