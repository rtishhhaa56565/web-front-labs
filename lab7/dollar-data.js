// Функция для получения данных о курсах валют
async function getExchangeRates() {
    try {
        // Получаем актуальные данные с API ЦБ РФ
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        const data = await response.json();
        
        const currentRate = data.Valute.USD.Value;
        const currentDate = new Date(data.Date);
        
        // Формируем массив данных за 10 дней
        const rates = [];
        for (let i = 0; i < 10; i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            
            rates.push({
                date: date.toLocaleDateString('ru-RU'),
                rate: currentRate
            });
        }
        
        // Сортируем по дате (новые сверху)
        return rates.sort((a, b) => new Date(b.date) - new Date(a.date));
        
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
}