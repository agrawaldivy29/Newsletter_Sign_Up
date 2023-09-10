const { urlencoded, json } = require("express");
const express = require("express");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(req.body.fName);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/list/7a3e4d9f67";

    const options = {
        method: "post",
        auth: "divy:6544ee862accfdf2f5de108b540d9dab-us8"
    }

    const request = https.request(url, options, (response) => {

        console.log(response.statusCode);
        response.on("data", (data) => {
            // console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

    res.send("Hurray! You are signed up")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, () => {
    console.log("Server has started");
})

// My Key
// 6544ee862accfdf2f5de108b540d9dab-us8

//List ID
// 7a3e4d9f67