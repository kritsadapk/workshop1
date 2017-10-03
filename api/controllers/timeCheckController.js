const Sequelize = require('sequelize')
const sequelize = new Sequelize('timecheck', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

const User = sequelize.define('users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    fname: Sequelize.STRING,
    lname: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
})
exports.login = function(req, res) {
    sequelize.sync()
        .then(() => User.findAll({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })).then((r) => {
            // console.log(r)
            res.json(r).status(200)
        }).catch((err) => {
            console.log(err)
        })
}