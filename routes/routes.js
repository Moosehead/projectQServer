/**
 * Created by Moosa on 2017-06-17.
 */

module.exports = function(app) {
    var authy = require('../controller/authyController');


    // todoList Routes
    app.route('/api')
        .get(authy.textCode)
        .post(authy.textVerifcation);

    //
    // app.route('/tasks/:taskId')
    //     .get(todoList.read_a_task)
    //     .put(todoList.update_a_task)
    //     .delete(todoList.delete_a_task);
};
