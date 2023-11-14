-- User Table --
CREATE TABLE User (
    user_id INT PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(50)
);

-- Portfolio Table --
CREATE TABLE Portfolio (
    portfolio_id INT PRIMARY KEY,
    user_id INT,
    portfolio_name VARCHAR(20) NOT NULL,
    creation_date DATE,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Stock Table --
CREATE TABLE Stock (
    stock_id INT PRIMARY KEY,
    name VARCHAR(10) UNIQUE NOT NULL,
    company_name VARCHAR(50) NOT NULL,
    current_price DECIMAL(10, 2),
    last_updated TIMESTAMP
);

-- Transaction Table --
CREATE TABLE Transaction (
    transaction_id INT PRIMARY KEY,
    user_id INT,
    portfolio_id INT,
    stock_id INT,
    transaction_type VARCHAR(10) NOT NULL,
    transaction_date DATE,
    transaction_price DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (portfolio_id) REFERENCES Portfolio(portfolio_id),
    FOREIGN KEY (stock_id) REFERENCES Stock(stock_id)
);
