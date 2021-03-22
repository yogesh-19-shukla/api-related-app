//jshint esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));        //////to run the local static files and get the result
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fiels: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/22b8506b89";
  const options = {
        method: "POST",
        auth: "yogesh19:abdeafe0f5c69398d1bcbf7eb9292f0c-us1"
}


  const request = https.request(url,options,function(response){

        if(response.statusCode===200){
          res.sendFile(__dirname + "/success.html");
        }else{
          res.sendFile(__dirname + "/failure.html");
        }

         response.on("data",function(data){
           console.log(JSON.parse(data));
         });
   });

   request.write(jsonData);
    request.end();


//  console.log(fname,lname,email);
});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT||3000 ,function(){
  console.log("Server started at port 3000");
});




//ApI key
//abdeafe0f5c69398d1bcbf7eb9292f0c-us1

//list id
// 22b8506b89
