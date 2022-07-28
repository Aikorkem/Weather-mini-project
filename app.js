const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res){

    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=1834c73976db33fc8a0107c15aa97062&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const w_data = JSON.parse(data);
            const temp = w_data.main.temp;
            const desc = w_data.weather[0].description;
            const icon = w_data.weather[0].icon;
            const city = w_data.name;

            const url_img = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            console.log(icon);
            //response.send(temp);
            res.write("<h1 style = \"color: #333366; font-family: Verdana, Arial, Helvetica, sans-serif;\">Weather in Your City</h1>");
            res.write("<h4 style = \"color: #333366; font-family: Verdana, Arial, Helvetica, sans-serif;\">The temperture in " + city + " is " + temp + " degrees Celcius. The weather is described as "  + desc + ".</h4>");
            res.write("<img src="+ url_img + ">");
            res.send();
            
        });
    } );
    //res.send("Hi");
});



app.listen(3000, function(){
    console.log("Server is running on 3000");
});