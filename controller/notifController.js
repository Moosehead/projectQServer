/**
 * Created by marcusedwards on 2017-08-17.
 */
var firebase = require('firebase');
var express = require('express');
var twilio = require('twilio');

var app = express();

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
    firebase.initializeApp(config);

    var accountSid = 'AC0f3e56279282b0e241bf4929d020c1d1';
    var authToken = '8822593550195cf816cfc9864c1f608c';
    var client = new twilio(accountSid, authToken);

    var company = req.query.company;
    var name = req.query.name;

    DBLineRef = 'lines/' + company + '/' + name;

    firebase.database().ref(DBLineRef).once('value').then(function (snapshot) {
        if (snapshot.val() != 1) {
            firebase.database().ref(DBLineRef + '/current').on('value', function (snapshot) {
                if ((snapshot != null) && (snapshot.val() != 1)) {
                    var serving = snapshot.val().current;
                    firebase.database().ref('users/' + serving).once('value').then(function (snapshot) {
                        if ((snapshot !== null) && (snapshot.val().phone !== null)) {
                            var number = txt.match(/\d/g);
                            number = '+' + number.join("");
                            client.messages.create({
                                body: 'You are next in line at ' + company + '!',
                                to: number,
                                from: '+6479526696'
                            });
                        }
                    });
                }
            });
        }
    });
};