const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

 
app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "482a3ff2b48be084f28cff9a6d876094";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
    https.get(url, function(response){
       console.log(response.statusCode);
       response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write("<p>The weather is " + description + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " Celsius<h1>");
            res.write("<img src="+ imageURL + ">");
            res.send();
    })})});

app.listen(3001, function() {
    console.log("oki3001!");
});
