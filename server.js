var express = require("express");
var bodyParser = require("body-parser");

var api_key = "iRkSqE9DLizx5z1cVkk5hAziJRiRAdxQ";
var mongodb = require("mongodb");
// var ObjectID = mongodb.ObjectID;
// var request = require('request');
// var querystring = require("querystring");

var authy = require('/twil')(api_key,'http://sandbox-api.authy.com');




var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
});


    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });


app.post("/api/text", function(req, res) {
    var phone = req.param.phone_number;
    authy.phones().verification_start(phone, "1", {via: 'sms'},
        function (err, eres) {
            res.status(200).json(eres);

        }
    );

});
