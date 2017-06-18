/**
 * Created by Moosa on 2017-06-17.
 */
var express = require("express");
var bodyParser = require("body-parser");
var api_key = "iRkSqE9DLizx5z1cVkk5hAziJRiRAdxQ";

var authy = require('authy')(api_key);

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// var params = {
//     via: "sms"
// }

exports.textVerifcation = function(req, res) {

    //
    var phone = req.body.phone_number;

    var phoneTest = {"phone_number":phone}
    // authy.phones().verification_start(phone, "1",
    //     function (err, task) {
    //         if (err){
    //             res.send(err)
    //         }else {
    //             res.json(task);
    //         }
    //     }
    // );
    console.log(req.body); // populated!
    console.log(req.params);

    authy.phones().verification_start(phone, '1',

        function(err, task) {
            if (err){

                res.send(err)

            }else {
                res.json(task);
            }

    });

    };


exports.textCode = function(req, res) {

    var phone = req.param("phone_number");
    var code = req.param("verification_code");

    authy.phones().verification_check(phone, '1', code

        , function(err, task) {
            if (err){

                res.send(err)

            }else {
                res.json(task);
            }
    });

}