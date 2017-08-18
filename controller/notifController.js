/**
 * Created by marcusedwards on 2017-08-17.
 */
var firebase = require('firebase');
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var logger = require('heroku-logger');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

exports.startNotifs = function(req, res) {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAiGOoGNw1d8vZ7phWh4J78MmcsVuwZzrM",
        authDomain: "next-80843.firebaseapp.com",
        databaseURL: "https://next-80843.firebaseio.com",
        projectId: "next-80843",
        storageBucket: "next-80843.appspot.com",
        messagingSenderId: "244563636043"
    };
    if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
    }

    var accountSid = 'AC0f3e56279282b0e241bf4929d020c1d1';
    var authToken = '8822593550195cf816cfc9864c1f608c';
    var senderNumber = '+16479526696';
    var client = new twilio(accountSid, authToken);

    var company = req.body.company;
    var name = req.body.name;

    DBLineRef = 'lines/' + company + '/' + name;

    logger.info('LINE REF: ' + DBLineRef);

    firebase.database().ref(DBLineRef).once('value').then(function (snapshot) {
        if ((snapshot.val() != null) && (snapshot.val() != 1)) {
            logger.info('snapshot 1 successful');
            firebase.database().ref(DBLineRef + '/current').on('value', function (snapshot) {
                if ((snapshot.val() != null) && (snapshot.val() != 1)) {
                    var serving = snapshot.val().current;
                    logger.info('now serving : ' + serving);
                    firebase.database().ref('users/' + serving).once('value').then(function (snapshot) {
                        if ((snapshot.val() !== null) && (snapshot.val().phone !== null)) {
                            var phone = snapshot.val().phone;
                            var number = phone.match(/\d/g);
                            number = '+1' + number.join("");
                            logger.info('texting : ' + number);
                            client.messages.create({
                                body: 'You are first in line at ' + company + '!',
                                to: number,
                                from: senderNumber
                            }, function(err, message) {
                                if (err) {
                                    logger.info(err.message);
                                }
                            });
                        }
                    });
                }
                firebase.database().ref(DBLineRef).orderByKey().once('value').then(function (snapshot) {
                    if ((snapshot.val() !== null) && (snapshot.val() != 1)) {
                        var customerArr = [];
                        snapshot.forEach(function (childSnapshot) {
                            var item = childSnapshot.val().key;
                            customerArr.push(item);
                        });
                        if(customerArr.length > 1) {
                            var second = customerArr[1];
                            firebase.database().ref('users/' + second).once('value').then(function (snapshot) {
                                if ((snapshot.val() !== null) && (snapshot.val().phone !== null)) {
                                    var phone = snapshot.val().phone;
                                    var number = phone.match(/\d/g);
                                    number = '+1' + number.join("");
                                    logger.info('texting : ' + number);
                                    client.messages.create({
                                        body: 'You are second in line at ' + company + '!',
                                        to: number,
                                        from: senderNumber
                                    });
                                }
                            });
                        }
                        if(customerArr.length > 2) {
                            var third = customArr[2];
                            firebase.database().ref('users/' + third).once('value').then(function (snapshot) {
                                if ((snapshot.val() !== null) && (snapshot.val().phone !== null)) {
                                    var phone = snapshot.val().phone;
                                    var number = phone.match(/\d/g);
                                    number = '+1' + number.join("");
                                    logger.info('texting : ' + number);
                                    client.messages.create({
                                        body: 'You are third in line at ' + company + '!',
                                        to: number,
                                        from: senderNumber
                                    });
                                }
                            });
                        }
                    }
                });
            });
        }
    });
};