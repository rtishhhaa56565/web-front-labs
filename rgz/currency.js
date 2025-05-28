document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущий курс с API ЦБ РФ
    async function fetchExchangeRates() {
        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при получении курсов валют:', error);
            return null;
        }
    }

    // Инициализация графика
    let currencyChart;
    async function initChart() {
        const ratesData = await fetchExchangeRates();
        if (!ratesData) return;

        // Здесь должна быть логика получения исторических данных за месяц
        // Для примера используем фиктивные данные
        const historicalData = {
            labels: Array.from({length: 30}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (30 - i));
                return date.toLocaleDateString();
            }),
            datasets: [{
                label: 'HUF/RUB',
                data: Array.from({length: 30}, () => Math.random() * 0.3 + 0.2),
                backgroundColor: '#005b9f',
                borderColor: '#003d6b',
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById('currencyChart').getContext('2d');
        currencyChart = new Chart(ctx, {
            type: 'bar',
            data: historicalData,
            options: {
                responsive: true,
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const date = historicalData.labels[index];
                        const rate = historicalData.datasets[0].data[index];
                        
                        document.getElementById('chart-info').innerHTML = `
                            <p><strong>Дата:</strong> ${date}</p>
                            <p><strong>Курс:</strong> 1 HUF = ${rate.toFixed(4)} RUB</p>
                        `;
                        
                        // Подсветка выбранного столбца
                        currencyChart.data.datasets[0].backgroundColor = 
                            historicalData.labels.map((_, i) => i === index ? '#ff5722' : '#005b9f');
                        currencyChart.update();
                    }
                }
            }
        });
    }

    // Конвертация валют
    document.getElementById('convert-btn').addEventListener('click', async function() {
        const amount = parseFloat(document.getElementById('amount').value);
        if (isNaN(amount)) return;

        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;
        
        const ratesData = await fetchExchangeRates();
        if (!ratesData) return;

        let result;
        if (fromCurrency === 'RUB' && toCurrency === 'HUF') {
            const rate = ratesData.Valute.HUF.Value / ratesData.Valute.HUF.Nominal;
            result = amount / rate;
        } else if (fromCurrency === 'HUF' && toCurrency === 'RUB') {
            const rate = ratesData.Valute.HUF.Value / ratesData.Valute.HUF.Nominal;
            result = amount * rate;
        } else {
            result = amount;
        }

        document.getElementById('conversion-result').textContent = result.toFixed(2);
    });

    // Инициализация
    initChart();
});