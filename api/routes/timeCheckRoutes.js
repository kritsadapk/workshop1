module.exports = function (app) {
  let timeCheck = require('../controllers/timeCheckController')
  app.route('/login').post(timeCheck.login)
//   app.route('/login').post(timeCheck.login)
//   app.route('/checkin')
//         .post(timeCheck.checkin)
//     // .get(todoList.read_a_task)
//     // .put(todoList.update_a_task)
//     // .delete(todoList.delete_a_task)
//   app.route('/checkout')
//         .post(timeCheck.checkout)
//   app.route('/history')
//         .get(timeCheck.history)
}