import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello HEP");
});

const colors = ["red", "green", "blue", "yellow", "pink", "purple"];

app.get("/currenttime", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();

    const intervalId = setInterval(() => {
        res.write(`data: ${new Date().toLocaleTimeString()} \n\n`);
        res.write(`event: color\ndata: ${getRandomColor()} \n\n`);
    }, 1000);

    res.on("close", () => {
        clearInterval(intervalId);
    });
});

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

app.listen(1025, () => {
    console.log("server is running in port 1025");
});