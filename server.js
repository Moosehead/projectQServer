var express = require("express");
var bodyParser = require("body-parser");

// var api_key = "iRkSqE9DLizx5z1cVkk5hAziJRiRAdxQ";
// var mongodb = require("mongodb");

// var authy = require('/twil')(api_key,'http://sandbox-api.authy.com');


var app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;


function initCrossDomain(app) {
    app.use(cors());
    app.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');

        next();
    });
}

// // Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
//     if (err) {
//         console.log(err);
//         process.exit(1);
//     }
//
//     // Save database object from the callback for reuse.
//     db = database;
//     console.log("Database connection ready");
// });



// port = process.env.PORT || 3000;
//
// app.listen(port);
//
// console.log('todo list RESTful API server started on: ' + port);

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });

function init() {
    var app = express();
    initCrossDomain(app);
    return app;
}

var routes = require('./routes/routes');
routes(app);


app.post("/api/text", function(req, res) {

    var phone = req.param.phone_number;
    authy.phones().verification_start(phone, "1", {via: 'sms'},
        function (err, res) {


        }
    );

});
