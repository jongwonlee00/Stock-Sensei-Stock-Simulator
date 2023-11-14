#ifndef RISKMANAGEMENT_H
#define RISKMANAGEMENT_H

class RiskManagement {
public:
    double calculatePositionSize(double account_balance, double risk_percentage, double entry_price, double stop_loss_price); // Function to calculate position size
};

#endif
