var express= require("express");
var app=express();
var request = require("request");
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("search");
});

app.get("/results", function(req,res){
    var topic=req.query.topic;
    var date=req.query.date;
   var url = 'https://newsapi.org/v2/everything?q='+topic +
          '&from='+date+'&' +
          'sortBy=popularity&' +
          'apiKey=04fc62374861487797ba0f8374644fbc';
   //var url = 'https://newsapi.org/v2/top-headlines?' +
     //     'country=us&' +
       //   'apiKey=04fc62374861487797ba0f8374644fbc';//for live updates
   request(url,function(error,respose,body)
    {
       if(!error&& respose.statusCode==200)
       {
           var data=JSON.parse(body)//making an object for body
           res.render("results",{data:data});
       }
    });
});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("News app has started");
});