var express = require("express");
var bodyParser = require("body-parser");

var api_key = "iRkSqE9DLizx5z1cVkk5hAziJRiRAdxQ";
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var request = require('request');
var querystring = require("querystring");
var authy = require('/server')(apikey,'http://sandbox-api.authy.com');




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


app.post("/api/contacts", function(req, res) {
    exports.phones = {
        verification_starts: {
            without_via: function (test) {
                test.expect(1);
                authy.phones().verification_start("111-111-1111", "1",
                    function (err, res) {
                        test.ok(res);
                        test.done();
                    }
                );
            },

            with_via: function (test) {
                test.expect(1);
                authy.phones().verification_start("111-111-1111", "1", "sms",
                    function (err, res) {
                        test.ok(res);
                        test.done();
                    }
                );
            },

            with_params: function (test) {
                test.expect(1);
                var params = {
                    via: "sms",
                    locale: "pl",
                    custom_message: "This is a custom message"
                }
                authy.phones().verification_start("111-111-1111", "1", params,
                    function (err, res) {
                        test.ok(res);
                        test.done();
                    }
                );
            },

            with_params_locale_only: function (test) {
                test.expect(1);
                var params = {
                    locale: "pl"
                }
                authy.phones().verification_start("111-111-1111", "1", params,
                    function (err, res) {
                        test.ok(res);
                        test.done();
                    }
                );
            }
        },

        verification_check: function (test) {
            test.expect(1);
            authy.phones().verification_check("111-111-1111", "1", "0000",
                function (err, res) {
                    test.ok(res);
                    test.done();
                }
            );
        },

        info: function (test) {
            test.expect(1);
            authy.phones().info("7754615609", "1",
                function (err, res) {
                    test.ok(res);
                    test.done();
                }
            );
        }
    }
});
