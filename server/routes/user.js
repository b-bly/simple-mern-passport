const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')
const Channel = require('../database/models/channel')

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)

        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username,
            userID: req.user._id
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    User.find({}).populate("channels").then(function(response) {
        console.log(response)
        
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({response: response, user: req.user})
    } else {
        res.json({ user: null })
    }
})
})
router.get('/:userID', (req, res) => {
    User.findById(req.params.userID).populate('channels').then(function(response) {
        res.send(response)
    })
})
router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

router.get('/invite/:username/:channelID', (req, res) => {
    console.log('User req params')
    console.log(req.params)
    User.findOne({username: req.params.username})
    .then(function(response) {
        console.log("response")
        console.log(response)
        if (response) {
            res.send({status: 200})
        }
        else {
            res.send({status: 404})
        }
        User.findOneAndUpdate({ _id: response._id }, { $push: { channels: req.params.channelID } }, { new: true })
        .then(function(updatedUser) {
            console.log('updatedUser')
            console.log(updatedUser)
            Channel.findOneAndUpdate({ _id: req.params.channelID }, { $push: { users: updatedUser._id } }, { new: true })
            .then(function(updatedChannel) {
                console.log("updatedChannel")
                console.log(updatedChannel)
                res.send(updatedChannel)
            })
        })
    })
})

module.exports = router