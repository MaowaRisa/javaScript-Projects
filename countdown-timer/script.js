const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondEl = document.getElementById("seconds");
const newYears = "1 Jan 2023";

function countdown(){
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate)/1000;
    console.log(totalSeconds);
    const days = Math.floor(totalSeconds / (60*60*24));
    const hours = Math.floor((totalSeconds % (60*60*24))/ (60 * 60));
    const mins = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60)
    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondEl.innerHTML = formatTime(seconds);
    
}
function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

countdown();
setInterval(countdown, 1000);
