INSERT INTO users VALUES (100, 'davis', 'aaa');
INSERT INTO users VALUES (200, 'noah', 'aaa');
INSERT INTO users VALUES (300, 'liz', 'aaa');
INSERT INTO users VALUES (400, 'jon', 'aaa');

INSERT INTO Portfolio VALUES (1, 100, 'DaBestStocks', '2023-10-14');
INSERT INTO Portfolio VALUES (2, 200, 'NoahsNuclearStocks', '2023-10-13');
INSERT INTO Portfolio VALUES (3, 300, 'STONKS', '2023-10-12');
INSERT INTO Portfolio VALUES (4, 400, 'BullMarketMaker', '2023-10-11');

INSERT INTO Stocks VALUES (1, 'TSLA', 'Tesla Inc.', '448.20');
INSERT INTO Stocks VALUES (2, 'APPL', 'Apple', '105.25');
INSERT INTO Stocks VALUES (3, 'BTC', 'Bitcoin', '30448.80');
INSERT INTO Stocks VALUES (4, 'DOGE', 'Dogecoin', '0.01');

INSERT INTO Transactions VALUES (1, 100, 1, 1, 'buy', '2023-11-14'::DATE, 100.00);
INSERT INTO Transactions VALUES (2, 100, 1, 2, 'buy', '2023-11-14'::DATE, 50.00);
INSERT INTO Transactions VALUES (3, 100, 1, 3, 'buy', '2023-11-14'::DATE, 25.00);
INSERT INTO Transactions VALUES (4, 100, 1, 4, 'buy', '2023-11-14'::DATE, 125.00);

INSERT INTO Transactions VALUES (5, 200, 2, 1, 'buy', '2023-11-14'::DATE, 100.00);
INSERT INTO Transactions VALUES (6, 200, 2, 2, 'buy', '2023-11-14'::DATE, 50.00);
INSERT INTO Transactions VALUES (7, 200, 2, 3, 'buy', '2023-11-14'::DATE, 25.00);
INSERT INTO Transactions VALUES (8, 200, 2, 4, 'buy', '2023-11-14'::DATE, 125.00);

INSERT INTO Transactions VALUES (9, 300, 3, 1, 'buy', '2023-11-14'::DATE, 100.00);
INSERT INTO Transactions VALUES (10, 300, 3, 2, 'buy', '2023-11-14'::DATE, 50.00);
INSERT INTO Transactions VALUES (11, 300, 3, 3, 'buy', '2023-11-14'::DATE, 25.00);
INSERT INTO Transactions VALUES (12, 300, 3, 4, 'buy', '2023-11-14'::DATE, 125.00);

INSERT INTO Transactions VALUES (13, 400, 4, 1, 'buy', '2023-11-14'::DATE, 100.00);
INSERT INTO Transactions VALUES (14, 400, 4, 2, 'buy', '2023-11-14'::DATE, 50.00);
INSERT INTO Transactions VALUES (15, 400, 4, 3, 'buy', '2023-11-14'::DATE, 25.00);
INSERT INTO Transactions VALUES (16, 400, 4, 4, 'buy', '2023-11-14'::DATE, 125.00);

INSERT INTO Transactions VALUES (17, 100, 1, 1, 'sell', '2023-11-14'::DATE, 50.00);
INSERT INTO Transactions VALUES (18, 100, 1, 2, 'sell', '2023-11-14'::DATE, 10.00);
INSERT INTO Transactions VALUES (32, 100, 1, 3, 'sell', '2023-11-14'::DATE, 20.00);
INSERT INTO Transactions VALUES (19, 100, 1, 4, 'sell', '2023-11-14'::DATE, 35.00);

INSERT INTO Transactions VALUES (20, 200, 2, 1, 'sell', '2023-11-14'::DATE, 70.00);
INSERT INTO Transactions VALUES (21, 200, 2, 2, 'sell', '2023-11-14'::DATE, 12.00);
INSERT INTO Transactions VALUES (22, 200, 2, 3, 'sell', '2023-11-14'::DATE, 39.00);
INSERT INTO Transactions VALUES (23, 200, 2, 4, 'sell', '2023-11-14'::DATE, 90.00);

INSERT INTO Transactions VALUES (24, 300, 3, 1, 'sell', '2023-11-14'::DATE, 70.00);
INSERT INTO Transactions VALUES (25, 300, 3, 2, 'sell', '2023-11-14'::DATE, 30.00);
INSERT INTO Transactions VALUES (26, 300, 3, 3, 'sell', '2023-11-14'::DATE, 1.00);
INSERT INTO Transactions VALUES (27, 300, 3, 4, 'sell', '2023-11-14'::DATE, 34.00);

INSERT INTO Transactions VALUES (28, 400, 4, 1, 'sell', '2023-11-14'::DATE, 87.00);
INSERT INTO Transactions VALUES (29, 400, 4, 2, 'sell', '2023-11-14'::DATE, 39.00);
INSERT INTO Transactions VALUES (30, 400, 4, 3, 'sell', '2023-11-14'::DATE, 27.00);
INSERT INTO Transactions VALUES (31, 400, 4, 4, 'sell', '2023-11-14'::DATE, 90.00);
