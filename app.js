//Packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//Connecting to Local host
mongoose.connect("mongodb://localhost:27017/wikiDB");

//Schema
const articleSchema = new mongoose.Schema({
    name: String,
    content: String
});

//Model or Collection
const Article = mongoose.model("Article", articleSchema);

//Get or Read RESTful API
app.get("/articles", (req, res) => {
    Article.find( (err, foundArticles) => {
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }     
    });  
});

//Post or Create RESTful API
app.post("/articles", (req, res) => {
    const articleDoc = new Article({
        name: req.body.name,
        content: req.body.content 
    });
    articleDoc.save((err) => {
        if(!err){
            res.send("Succesfuly sent post request");
        }
        else{
            res.send(err);
        }
    });
});

//Delete RESTful API
app.delete("/articles", (req, res) => {
    Article.deleteMany((err)=>{
        if(!err){
            res.send("Succesfuly deleted all documents inside Article");
        }
        else{
            res.send(err);
        }
    });
});

//Chained Route to Get, Put, Delete a specific Article
app.route("/articles/:userId")
.get((req, res) => {
    Article.findOne({name: req.params.userId}, (err, foundArticle) => {
        if(foundArticle){
            res.send(foundArticle);
        }
        else {
            res.send("There is no such document");
        }
    })
})
.put((req, res) => {
    Article.updateMany({name: req.params.userId}, {name:req.body.name, content: req.body.content}, (err)=>{
        if(!err){
            res.send("Succesfully updated");
        } else {
            res.send(err);
        }
    })
})
.delete((req, res) => {
    Article.deleteOne({title: req.body.userId},(err)=>{
        if(!err){
            res.send("Succesfully Deleted");
        } else {
            res.send(err);
        }
    })
})

//Listen
app.listen(3000, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Go to 3000 port to see result");
    }
});