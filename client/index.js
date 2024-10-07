const timeElement = document.getElementById("time");

const timeEventSource = new EventSource("http://localhost:1025/currenttime");

// timeEventSource.onmessage = (event) => {
//     console.log(event.data);
//     timeElement.innerText = event.data;
    
// }

timeEventSource.addEventListener("message", (event) => {
    timeElement.innerText = event.data;
});

timeEventSource.addEventListener("color", (event) => {
    timeElement.style.color = event.data;
});