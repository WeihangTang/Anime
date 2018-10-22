var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/animes', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var animeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   rating: String
});

var animes = mongoose.model("animes", animeSchema);

// animes.create(
//     {
//     name: "No Game No Life",
//     image: "https://myanimelist.cdn-dena.com/r/50x70/images/anime/5/65187.webp?s=fd1048e7e02d97f7183eb7c5f0c39e70",
//     description: "",
//     rating: "8.39"
//     }, function(err){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("new anime created");
//         }
//     }
// );

// var animes = [
//     {name:"Death Note", image:"https://myanimelist.cdn-dena.com/r/50x70/images/anime/9/9453.webp?s=bcf651aae2cd301a32bcc46e317a98bc"},
//     {name:"Shingeki no Kyojin", image:"https://myanimelist.cdn-dena.com/r/50x70/images/anime/10/47347.webp?s=6b6f0445f6a93276f3cbd98400582612"}
//     ];

app.get("/",function(req, res){
   //res.send("this is your landing page"); 
   res.render("landing");
  
});

app.get("/animes", function(req, res){
   //res.render("animes", {animes:animes});
    animes.find({}, function(err, animes){
       if(err){
           console.log(err);
       }else{
           res.render("index",{animes:animes});
       }
   });
});


app.get("/animes/new", function(req,res){
   //res.send("new anime");
   res.render("newAnime")
});

app.post("/anime", function(req,res){
    //animes.push(req.body);
    //res.redirect("/animes");
    animes.create(req.body,function(err){
       if(err){
           console.log(err);
       } else{
           res.redirect("/animes");
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Anime app started"); 
});
