let currentIndex = 0;
        let currentAmount = 1000000;
        let shares = 0;
        let buyIndex;
        let sellIndex;
        let step = 1;
        let numShares = 1;

        // Get the output element
        const quantitySelector = document.getElementById("quantitySelector").value;
        const slider = document.getElementById("slider");
        const sliderValue = document.getElementById("sliderValue");

        // Display the default value on page load
        sliderValue.innerHTML = slider.value;

        // Update the displayed value as the slider is moved
        slider.addEventListener("input", function() {
            sliderValue.innerHTML = this.value;
            step = parseInt(this.value);
            updateChart();
        });

        function iterateAndDisplay() {
            // Increment the index for the next click
            currentIndex = (currentIndex + step) % stockCandleData.openPrices.length;

            // Update the labels and data for the chart
            const labels = stockCandleData.timestamps
                .slice(0, currentIndex + 1)
                .map(timestamp => new Date(timestamp * 1000).toLocaleDateString());

            const data = stockCandleData.openPrices.slice(0, currentIndex + 1);

            // Display the current value
            document.getElementById('outputContainer').innerHTML = `
                <p>Open Price: ${stockCandleData.openPrices[currentIndex]}</p>
                <p>Time Stamp: ${new Date(stockCandleData.timestamps[currentIndex] * 1000).toLocaleString()}</p>
                <p>Iterator Count: ${currentIndex}</p>
            `;

            // Update the chart with the new data
            stockChart.data.labels = labels;
            stockChart.data.datasets[0].data = data;
            stockChart.update();
            updatePriceAndGainLoss();
        }

        

        function buyShares() {
            // Moved the declaration inside the function
            const quantitySelector = document.getElementById("quantitySelector").value;

            buyIndex = currentIndex;
            if ((currentAmount - shares * stockCandleData.openPrices[buyIndex]) > 0) {
                if (quantitySelector.toLowerCase() === "max") {
                    numShares = Math.floor(currentAmount / stockCandleData.openPrices[buyIndex]);
                } else {
                    numShares = Math.min(parseInt(quantitySelector), Math.floor(currentAmount / stockCandleData.openPrices[buyIndex]));
                }

                shares += numShares;
                currentAmount -= numShares * stockCandleData.openPrices[buyIndex];
            }

            // Ensure the value doesn't go negative
            currentAmount = Math.max(currentAmount, 0);

            const formattedAmount = currentAmount.toLocaleString();
            document.getElementById('graph-caption').innerText = `$${formattedAmount}`;
            document.getElementById('buyPrice').innerText = `Buy price: ${stockCandleData.openPrices[currentIndex].toFixed(2)}`;
            document.getElementById('shareAmount').innerText = `Total Shares: ${shares}`;
            updatePriceAndGainLoss();
        }

        function sellShares() {
            // Moved the declaration inside the function
            const quantitySelector = document.getElementById("quantitySelector").value;

            sellIndex = currentIndex;
            if (shares > 0) {
                if (quantitySelector.toLowerCase() === "max") {
                    numShares = shares;
                } else {
                    numShares = Math.min(parseInt(quantitySelector), shares);
                }

                currentAmount += numShares * stockCandleData.openPrices[sellIndex];
                shares -= numShares;
            }

            // Ensure the value doesn't go negative
            currentAmount = Math.max(currentAmount, 0);

            const formattedAmount = currentAmount.toLocaleString();
            document.getElementById('graph-caption').innerText = `$${formattedAmount}`;
            document.getElementById('sellPrice').innerText = `Sell Price: ${stockCandleData.openPrices[currentIndex].toFixed(2)}`;
            document.getElementById('shareAmount').innerText = `Total Shares: ${shares}`;
            updatePriceAndGainLoss();
        }

        function updatePriceAndGainLoss() {
            const currentPrice = stockCandleData.openPrices[currentIndex];
            const buyPrice = stockCandleData.openPrices[buyIndex];

            // Calculate gain/loss percentage
            const gainLossPercentage = ((currentPrice - buyPrice) / buyPrice) * 100;
            const formattedGainLoss = gainLossPercentage.toFixed(2);

            // Display current price
            document.getElementById('currentPrice').innerText = `Current Price: ${currentPrice.toFixed(2)}`;

            // Display gain/loss with color based on positivity/negativity
            const gainLossElement = document.getElementById('gainLoss');
            gainLossElement.innerText = `Gain/Loss: ${formattedGainLoss}%`;

            // Set color based on gain or loss
            if (gainLossPercentage > 0) {
                gainLossElement.style.color = '#00cc00'; // Green for gain
            } else if (gainLossPercentage < 0) {
                gainLossElement.style.color = '#cc0000'; // Red for loss
            } else {
                gainLossElement.style.color = ''; // Default color if no gain or loss
            }
        }

    document.getElementById('iterateButton').addEventListener('click', function () {
        iterateOrSimulate(false);
    });

    document.getElementById('simulateButton').addEventListener('click', function () {
        iterateOrSimulate(true);
    });

    function iterateOrSimulate(isSimulation) {
        const iterations = isSimulation ? parseInt(slider.value) : 1;

        function performStep(i) {
            currentIndex = (currentIndex + 1) % stockCandleData.openPrices.length;

            // Update the labels and data for the chart
            const labels = stockCandleData.timestamps
                .slice(0, currentIndex + 1)
                .map(timestamp => new Date(timestamp * 1000).toLocaleDateString());

            const data = stockCandleData.openPrices.slice(0, currentIndex + 1);

            // Display the current value
            document.getElementById('outputContainer').innerHTML = `
                <p>Open Price: ${stockCandleData.openPrices[currentIndex]}</p>
                <p>Time Stamp: ${new Date(stockCandleData.timestamps[currentIndex] * 1000).toLocaleString()}</p>
                <p>Iterator Count: ${currentIndex}</p>
            `;

            // Update the chart with the new data
            stockChart.data.labels = labels;
            stockChart.data.datasets[0].data = data;
            stockChart.update();
            updatePriceAndGainLoss();

            // Continue to the next step if not the last iteration
            if (i < iterations - 1) {
                setTimeout(function () {
                    performStep(i + 1);
                }, isSimulation ? 700 : 0);
            }
        }

        // Start the iteration or simulation
        performStep(0);
    }

    // Add this line to call the function after updating the chart
        

        // Add click event listener to the button
        document.getElementById('iterateButton').addEventListener('click', iterateAndDisplay);
        document.getElementById('buyButton').addEventListener('click', () => {buyShares();});
        document.getElementById('sellButton').addEventListener('click', () => {sellShares();});

        
        const stockCandleData = {
            openPrices: <%= JSON.stringify(stockCandleData.openPrices) %>,
            closePrices: <%= JSON.stringify(stockCandleData.closePrices) %>,
            timestamps: <%= JSON.stringify(stockCandleData.timestamps) %>,
        };

        function createStockChart() {
            const ctx = document.getElementById('stockChart').getContext('2d');
            const stockChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: stockCandleData.timestamps.map(timestamp => new Date(timestamp * 1000).toLocaleDateString()),
                    datasets: [{
                        label: 'Open Prices',
                        data: stockCandleData.openPrices,
                        borderColor: 'rgba(255, 99, 132, 1)', // Default color
                        borderWidth: 2,
                        fill: false,
                        pointBorderColor: (context) => {
                            const index = context.dataIndex;
                            if (index === currentIndex) {return '#cc0000';}
                            else if (buyIndex !== undefined && index === buyIndex) {return '#00cc00';}
                            else {return 'rgba(255, 99, 132, 1)';}
                        },
                        pointBackgroundColor: 'rgba(255, 99, 132, 0)', // Transparent fill
                        pointRadius: (context) => {
                            const index = context.dataIndex;
                            return index === currentIndex || index === buyIndex ? 5 : 0;
                        },
                        pointHoverRadius: (context) => {
                            const index = context.dataIndex;
                            return index === currentIndex || index === buyIndex ? 8 : 0;
                        },
                    }],
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                            },
                        }],
                    },
                    animation: false,
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                },
            });
            return stockChart;
        }

        function updateChart() {
            if (stockChart) {stockChart.destroy();}
            stockChart = createStockChart();
        }
        let stockChart = createStockChart();
        