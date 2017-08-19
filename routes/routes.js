/**
 * Created by Moosa on 2017-06-17.
 */

module.exports = function(app) {

    var authy = require('../controller/authyController');
    var notif = require('../controller/notifController');
    var cors = require('cors');

    var app = express();
    app.use(cors({credentials: true, origin: true}));

    app.route('/api')
        .get(authy.textCode)
        .post(authy.textVerifcation);

    app.route('/line')
        .post(notif.startNotifs);

    //
    // app.route('/tasks/:taskId')
    //     .get(todoList.read_a_task)
    //     .put(todoList.update_a_task)
    //     .delete(todoList.delete_a_task);
};
