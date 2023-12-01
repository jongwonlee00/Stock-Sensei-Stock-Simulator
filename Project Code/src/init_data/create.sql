
-- User Table --
CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   username VARCHAR(500) UNIQUE NOT NULL,
   password VARCHAR(500) NOT NULL
);


-- Stock Table --
CREATE TABLE Stocks (
   stock_id INT PRIMARY KEY,
   name VARCHAR(10) UNIQUE NOT NULL
);

-- Transaction Table --
CREATE TABLE Transactions (
   transaction_id INT PRIMARY KEY,
   user_id INT,
   stock_id INT,
   transaction_type VARCHAR(10) NOT NULL,
   transaction_date DATE,
   transaction_price DECIMAL(10, 2),
   FOREIGN KEY (user_id) REFERENCES users(user_id), 
   FOREIGN KEY (stock_id) REFERENCES Stocks(stock_id)
);
