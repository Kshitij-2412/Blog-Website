//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent ="Welcome to Daily Journal, where knowledge meets inspiration! Our mission is to provide a platform that ignites your curiosity, fuels your imagination, and empowers you with valuable insights. Our dedicated team of writers and experts covers a wide range of topics, including technology, science, personal development, arts and culture, and more. Immerse yourself in captivating articles that offer deep dives into fascinating subjects, practical tips for enhancing your daily life, and thought-provoking perspectives that challenge the status quo. We believe that learning should be a collaborative experience, so we encourage you to actively engage with our content by leaving comments, sharing your thoughts, and joining the vibrant discussions that take place within our community.";

const aboutContent ="At Daily Journal,we're passionate about sharing valuable information, insights, and inspiration with our readers. Our goal is to provide a platform where you can explore a diverse range of topics, discover new ideas, and engage in meaningful conversations.Our team of dedicated writers and contributors consists of experts in various fields, including technology, lifestyle, health and wellness, travel, finance, and more. We strive to deliver high-quality, well-researched content that is both informative and entertaining.";

const contactContent = "We'd love to hear from you! If you have any questions, suggestions, or feedback regarding our blog or any of our articles, please don't hesitate to reach out to us. Your input is valuable to us, and we're committed to continually improving and providing a better experience for our readers.";
let posts=[];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//render

app.get("/",function(req,res){
  res.render("home",{startingContent:homeStartingContent,newPosts:posts});

  // console.log(posts);
})


app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})


app.post("/compose",function(req,res){
  
  const postInfo={
    title: req.body.title,
    postData:  req.body.postData
  };

  posts.push(postInfo);

  res.redirect("/");
  // console.log(info);
})

app.get("/posts/:topic",function(req,res){
  
  const topicName=_.lowerCase(req.params.topic);
  posts.forEach(function(post){

    const postTitle=_.lowerCase(post.title);
    if(topicName==postTitle){
      // console.log("match found");
      res.render("post",{postTitle:post.title , postContent:post.postData});
    }
  })

  
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
