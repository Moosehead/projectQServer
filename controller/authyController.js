/**
 * Created by Moosa on 2017-06-17.
 */

var api_key = "iRkSqE9DLizx5z1cVkk5hAziJRiRAdxQ";

var authy = require('../twil')(api_key,'http://sandbox-api.authy.com');


exports.textVerifcation = function(req, res) {
    var phone = req.body.phone_number;
    authy.phones().verification_start(phone, "1", "sms",
        function (err, task) {
            if (err){
                res.send(err)
            }else {
                res.json(task);
            }
        }
    );
};
