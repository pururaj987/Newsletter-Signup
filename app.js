const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.post("/" , function (req, res) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  const data = {
    members : [
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us2.api.mailchimp.com/3.0/lists/uniqueListId";

  const options = {
    method: "POST",
    auth: "pururaj:apiKey-us2"
  }

  const request = https.request(url , options , function(response) {
    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure" , function (req, res) {
  res.redirect("/")
})

app.listen(process.env.PORT , function () {
  console.log("Sever running on port 3000");
})

app.get("/" , function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});





