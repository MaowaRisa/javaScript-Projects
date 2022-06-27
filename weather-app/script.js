const apikey = 'd541117b84d36dbae9493711e330a3f2';
const main = document.getElementById("main");
const form = document.getElementById('form');
const search = document.getElementById('search');
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
async function getWeatherByLocation(city){
    const resp = await fetch(url(city),{
        origin: 'cors'
    });
    const respData = await resp.json();

    // console.log(respData, KtoC(respData.main.temp));
    console.log(respData);
    addWeatherToPage(respData);
}
getWeatherByLocation("Sydney");
function KtoC(K){
    return (K - 273.15).toFixed();
}
function convertTime(unix){
    let date = new Date(unix * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return hours + ":" + minutes.toString().substring(-2) + ':' + seconds.toString().substring(-2);
}

function addWeatherToPage(data){
    const temp = KtoC(data.main.temp);
    let sunrise = convertTime(data.sys.sunrise);
    let sunset = convertTime(data.sys.sunset);

    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <table id="weather-table">
        <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Status</th>
            <th>City</th>
            <th>Sunrise</th>
            <th>Sunset</th>
        </tr>
        <tr>
            <td><h2>${data.sys.country}</h2></td>
            <td><h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2></td>
            <td><h2>${data.weather[0].main}</h2></td>
            <td><h2>${data.name}</h2></td>
            <td><h2>${sunrise}</h2></td>
            <td><h2>${sunset}</h2></td>
        </tr>
        </table>
        
        
        
    `;
    //cleanup
    main.innerHTML = "";
    main.appendChild(weather);
}
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const city = search.value;

    if(city){
        getWeatherByLocation(city);
    }

});
