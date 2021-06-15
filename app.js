const express = require("express");
const request = require("request")
const bodyParser = require("body-parser")
const https = require("https")

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_feilds:{
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  }

  const jsonData = JSON.stringify(data)
  const url = "https://us1.api.mailchimp.com/3.0/lists/6c8f7fe0c8"
  const options = {
    method:"POST",
    auth:"bcrasto:d82f309b28cbd82e1f2bd3c4ef177b9b-us1"
  }


  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      // res.send("sucessfully subscribed")
      res.sendFile(__dirname+"/sucess.html")
    }
    else{
      // res.send("error")
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data",function(data){
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req,res){
  res.redirect("/")

})


app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000")


})


// api key
// d82f309b28cbd82e1f2bd3c4ef177b9b-us1

// list id
// 6c8f7fe0c8
