var fs = require("fs")
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const db = require('./helpers/db')
const SlackBot = require('./helpers/slackBot')
const Emailer = require('./helpers/emailer')
const Security = require('./helpers/security')
const EventFramework = require('./helpers/eventFramework')



// MOUNT API
var user = express();
user.use(bodyParser.json())
user.on('mount', function (parent) {
    console.log('> User API Mounted');
});

// USER UNSUBSCRIBE FROM EMAIL LIST
// ********************************
user.get('/unsubscribe/:email', (req, res) => {

    db.unsubscribeUser(req.params.email,(data, err)=>{

        if(err) return res.status(500).send(err)

        if(data.user) SlackBot.unsubscribeNotification(data.user.name, data.user.email, data.user.type)

        fs.readFile( path.join(__dirname + '/email_templates/unsubscribed.html'), 'utf8', (err, data) => {
            if(err) res.status(500).send(err)
            else res.send(data)
        })

    })

})


// EVENT AND DATA
// **************

user.post('/event', (req, res) => {

    const { event, eventData, userID } = req.body
    const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    EventFramework.createUserIfNotExist(userID, IP)
    EventFramework.logEvent(userID, event, eventData, (response)=>{res.send(response)})

})

user.post('/data', (req, res) => {

    const { data, userID } = req.body
    db.saveUserData(userID, data, (data, err) => {
        if(err) return res.json({success:false, error:err})
        EventFramework.logEvent(userID, 'userDataUpdate', null)
        res.json({success:true})
    })
    
})


// ADMIN FUNCTIONS
// ***************

user.get('/list', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if( !obj ) return res.json({success:false, error:'The user is not authorized to make this request'})

    db.getUserDataList((data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({success:true, data})
    })

})


user.get('/events/:id', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if( !obj ) return res.json({success:false, error:'The user is not authorized to make this request'})

    const userID = req.params.id
    db.getEventsForUser(userID, (data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({success:true, data})
    })

})


module.exports = user;