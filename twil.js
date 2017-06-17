/**
 * Created by Moosa on 2017-06-16.
 */
var request = require('request');
var querystring = require("querystring");
var VERSION = "1.1"


module.exports = function (api_key, api_url) {
    return new Authy(api_key, api_url);
};

function Authy(apiKey, api_url) {
    this.apiKey = apiKey;
    this.apiURL = api_url || "https://api.authy.com";
}


Authy.prototype.phones = function() {
    
    self = this;
    return {
        verification_start: function(phone_number, country_code, params, callback) {
            if (arguments.length == 3) {
                callback = params;
                params = {}
            } else if (typeof params !== "object") {
                params = {via: params}
            }

            options = {
                phone_number: phone_number,
                country_code: country_code,
                via: params.via || "sms",
                locale: params.locale,
                custom_message: params.custom_message
            };

            self._request("post", "/protected/json/phones/verification/start", options, callback);
        },

        verification_check: function(phone_number, country_code, verification_code, callback) {
            options = {
                phone_number: phone_number,
                country_code: country_code,
                verification_code: verification_code
            };
            self._request("get", "/protected/json/phones/verification/check", options, callback);
        },

        info: function(phone_number, country_code, callback) {
            options = {
                phone_number: phone_number,
                country_code: country_code
            };
            self._request("get", "/protected/json/phones/info", options, callback);
        }
    };
};