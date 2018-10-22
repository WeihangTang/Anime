var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var animes = [
    {name:"Death Note", image:"https://myanimelist.cdn-dena.com/r/50x70/images/anime/9/9453.webp?s=bcf651aae2cd301a32bcc46e317a98bc"},
    {name:"Shingeki no Kyojin", image:"https://myanimelist.cdn-dena.com/r/50x70/images/anime/10/47347.webp?s=6b6f0445f6a93276f3cbd98400582612"}
    ];

app.get("/",function(req, res){
   //res.send("this is your landing page"); 
   res.render("index");
});

app.get("/animes", function(req, res){
   res.render("animes", {animes:animes});
});


app.get("/animes/new", function(req,res){
   //res.send("new anime");
   res.render("newAnime")
});

app.post("/anime", function(req,res){
    animes.push(req.body);
    res.redirect("/animes");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Anime app started"); 
});
