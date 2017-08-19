/**
 * Created by Moosa on 2017-06-17.
 */

module.exports = function(app) {

    var authy = require('../controller/authyController');
    var notif = require('../controller/notifController');
    var cors = require('cors');

    app.use(cors({credentials: true, origin: true}));

    app.route('/api')
        .get(authy.textCode)
        .post(authy.textVerifcation);

    app.route('/line')
        .post(notif.startNotifs);

};
