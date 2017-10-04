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
})

const Timecheck = sequelize.define('timechecks', {
    checkin: Sequelize.DATE,
    checkout: Sequelize.DATE,
    users: Sequelize.INTEGER
})
User.hasMany(Timecheck, { foreignKey: 'users' })
Timecheck.belongsTo(User, { foreignKey: 'id' })


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

exports.checkin = function(req, res) {
    sequelize.sync()
        .then(() => Timecheck.create({
            users: req.body.userid,
            checkin: new Date()
        })).then((r) => {
            res.json(r).status(200)
        }).catch((err) => {
            console.log(err)
        })
}

exports.checkout = function(req, res) {
    sequelize.sync()
        .then(() => Timecheck.update({ checkout: new Date() }, {
            where: {
                users: req.body.userid,
                id: req.body.id
            }
        })).then((r) => {
            res.json(r).status(200)
        }).catch((err) => {
            console.log(err)
        })
}

exports.history = function(req, res) {
    sequelize.sync()
        .then(() => Timecheck.findAll({
            where: {
                users: req.params.id
            }
        })).then((r) => {
            // console.log(r)
            res.json(r).status(200)
        }).catch((err) => {
            console.log(err)
        })
}