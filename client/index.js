const timeElement = document.getElementById("time");

const clock = document.getElementById('clock');
const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');

const timeEventSource = new EventSource("http://localhost:1025/currenttime");

// timeEventSource.onmessage = (event) => {
//     console.log(event.data);
//     timeElement.innerText = event.data;

// }

timeEventSource.addEventListener("message", (event) => {
    timeElement.innerText = event.data;
    setClock(event.data);
});

timeEventSource.addEventListener("color", (event) => {
    timeElement.style.color = event.data;
    clock.style.borderColor = event.data;
    hourHand.style.backgroundColor = event.data;
    minuteHand.style.backgroundColor = event.data;
});

function setClock(str) {
    const [time, period] = str.split(' ');

    
    console.log(time + ' - ' + period);
    
    let [hours, minutes, seconds] = time.split(':').map(Number);

    // Convert the hour to 24-hour format based on AM/PM
    if (period === 'PM' && hours !== 12) {
        hours += 12; // Convert PM to 24-hour format (except 12 PM)
    } else if (period === 'AM' && hours === 12) {
        hours = 0; // Midnight case (12 AM)
    }

    console.log(hours + ':' + minutes + ':' + seconds);
    // Calculate the degree for each hand
    const secondDegrees = ((seconds / 60) * 360) + 270; // Add 270 to offset initial rotation
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 270;
    const hourDegrees = (((hours % 12) / 12) * 360) + ((minutes / 60) * 30) + 270;

    // Apply the rotation to each hand
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    console.log(hourDegrees + ':' + minuteDegrees + ':' + secondDegrees);

}