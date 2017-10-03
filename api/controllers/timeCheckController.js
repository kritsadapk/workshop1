const Sequelize = require('sequelize')
const sequelize = new Sequelize('test_db', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
})
exports.login = function (req, res) {
  sequelize.sync()
        .then(() => User.findAll({
          where: {
            username: req.body.username,
            password: req.body.password
          }
        })).then((r) => {
          console.log(r)
          res.json(r).status(200)
        }).catch((err) => {
          console.log(err)
        })
}
