function fetchCurrencyRate() {
    const currencyCode = document.getElementById('currencyCode').value.toUpperCase();
    const resultDiv = document.getElementById('currencyResult');

    if (!currencyCode) {
        resultDiv.innerHTML = '<div class="alert alert-danger">Пожалуйста, введите код валюты.</div>';
        return;
    }

    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(response => response.json())
        .then(data => {
            if (data.Valute[currencyCode]) {
                const rate = data.Valute[currencyCode].Value.toFixed(4).replace('.', ',');
                resultDiv.innerHTML = `<div class="alert alert-success">1 ${currencyCode} = ${rate} руб.</div>`;
            } else {
                resultDiv.innerHTML = `<div class="alert alert-danger">Валюта с кодом ${currencyCode} не найдена.</div>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = '<div class="alert alert-danger">Ошибка при получении данных.</div>';
            console.error(error);
        });
}

function CBR_XML_Daily_Ru(rates) {
    // function trend(current, previous) {
    //     if (current > previous) return ' ▲';
    //     if (current < previous) return ' ▼';
    //     return '';
    // }
        
    var USDrate = rates.Valute.USD.Value.toFixed(2).replace('.', ',');
    var USD = document.getElementById('USD');
    USD.innerHTML = USD.innerHTML.replace('00,0000', USDrate);
    var EURrate = rates.Valute.EUR.Value.toFixed(2).replace('.', ',');
    var EUR = document.getElementById('EUR');
    EUR.innerHTML = EUR.innerHTML.replace('00,0000', EURrate);
    var GBPrate = rates.Valute.GBP.Value.toFixed(2).replace('.', ',');
    var GBP = document.getElementById('GBP');
    GBP.innerHTML = GBP.innerHTML.replace('00,0000', GBPrate);
    var CNYrate = rates.Valute.CNY.Value.toFixed(2).replace('.', ',');
    var CNY = document.getElementById('CNY');
    CNY.innerHTML = CNY.innerHTML.replace('00,0000', CNYrate);
}