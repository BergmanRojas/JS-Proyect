async function populateTableRows() { 
    try {
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0');

        if (response.status !== 200) {
            console.log('Error Status Code: ' + response.status);
            return;
        }

        let data = await response.json();
        console.log(data);

        let strTableRows = 
            `<tr>
                <td><span>Summary</span></td>
                <td>${dcapitalize(data["weather"][0]["description"])}</td>
            </tr>
            <tr>
                <td><span>Temperature</span></td>
                <td>${data["main"]["temp"]} °C</td>
            </tr>
            <tr>
                <td><span>Humidity</span></td>
                <td>${data["main"]["humidity"]} %</td>
            </tr>
            <tr>
                <td><span>Pressure</span></td>
                <td>${data["main"]["pressure"]} Pa</td>
            </tr>`;
        
        document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

function dcapitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function changeBackground() {
    let d = new Date();
    let n = d.getHours();
    if (n > 23 || n <= 6) {
        document.querySelector(".theme-js").style.backgroundImage = "url('assets/img/dublin-night.jpg')";
    } else {
        document.querySelector(".theme-js").style.backgroundImage = "url('assets/img/dublin-day.jpg')";
    }
}

changeBackground();
populateTableRows();
