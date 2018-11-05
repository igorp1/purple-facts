const fetch = require('isomorphic-unfetch')
const helpers = require('./helpers')


// SENDS OUT TO SYSTEM ADMIN, THE CLIENT
const adminWebhook = require('../../purplefacts.config').CLIENT_SLACK_HOOK
// SENDS OUT TO DEV, PURPLE FACTS
const developerWebHook = require('../../purplefacts.config').PF_SLACK_HOOK

// reusabel constants, get creative
const Emoji = {
    bomb : {
        utf : "💣", url : "https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/bomb_1f4a3.png"
    },
    bot : {
        utf : "🤖", url : 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/robot-face_1f916.png'
    },
    tada : {
        utf : "🎉", url : "https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/party-popper_1f389.png"
    },
    wave : {
        utf : "👋", url : "https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/waving-hand-sign_1f44b.png"
    },
    checkmark : {
        utf : "✅", url : "https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/white-heavy-check-mark_2705.png"
    },
    smile : {
        utf : "😁", url : "https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/grinning-face-with-smiling-eyes_1f601.png" 
    },
    sad : {
        utf : "😰", url : 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/face-with-open-mouth-and-cold-sweat_1f630.png'
    },
    bell : {
        utf : "🔔", url : 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/129/bell_1f514.png'
    },
    bolt : {
        utf : "⚡️", url : "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/129/high-voltage-sign_26a1.png"
    }
}
module.exports.Emoji = Emoji

const Colors = {
    brown : '#B88152',
    red : '#CC3444',
    purple : '#a956bf',
    green : '#3EEDA6',
    black : '#171717'
}
module.exports.Colors = Colors

// POST request sent here
const sendAdminNotification = (payload) => {
    console.log('SENDING NOTIFICATION')
    fetch(adminWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attachments : [payload]})
    })
}
module.exports.sendAdminNotification = sendAdminNotification

const sendDevNotification = (payload) => {
    fetch(developerWebHook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attachments : [payload]})
    })
}
module.exports.sendDevNotification = sendDevNotification

// builds message attachent from obj
const createFieldsFromObject = (obj) => {
    if(!obj) return []
    return [...Object.keys(obj).filter(key=>obj[key]).map(key => {
        return {
            title: key,
            value: JSON.stringify(obj[key]),
            short: false
        }
    }), { 
        title: 'DB query',
        value : `<${require('../../purplefacts.config').CLIENT_SITE}/admin/users#${obj._id}|See on User Manager>`,
        short: false
    }]
} 

// ~~> build functions
const sendErrorNotification = (error) => {
    sendDevNotification({
        fallback : `${emoji || Emoji.bomb.utf} Error Notification`,
        author_name : `Error Notification`,
        color : (color || Colors.black),
        author_icon : Emoji.bomb.url,
        title : `There was an error on ${require('../../purplefacts.config').CLIENT_SITE.replace('https://', '')}`,
        text : message,
        ts : helpers.getTimeStamp(),
        actions : [
            {
                text :`${Emoji.bolt.utf} Visit site`,
                type : "button",
                url : require('../../purplefacts.config').CLIENT_SITE
            }
        ]
    })
}

const sendSimpleNotification = (message, {title, color, emoji}) => {
    sendAdminNotification({
        fallback : `${emoji || Emoji.bell.utf} Site Notification`,
        author_name : `Site Notification`,
        color : (color || Colors.black),
        author_icon : Emoji.bell.url,
        title : title,
        text : message,
        ts : helpers.getTimeStamp()
    })
}

const sendEventNotification = (userID, eventKey, eventData) => {
    const event = require('../../services/events').EVENTS[eventKey]
    if(!event) sendErrorNotification(`Event ${event} not known for user \`${userID}\``)

    sendAdminNotification({
        fallback : `${Emoji.tada.utf} Event Notification`,
        author_name : `Event Notification`,
        color : event.color,
        author_icon : Emoji.tada.url,
        title : event.label,
        text : event.makeDataLabel ? event.makeDataLabel(eventData) : '',
        ts : helpers.getTimeStamp(),
        actions : [
            {
                text :`${Emoji.bolt.utf} See on user manager`,
                type : "button",
                url : `${require('../../purplefacts.config').CLIENT_SITE}/admin/users#${userID}`
            }
        ]
    })
}

const SlackBot = {
    sendErrorNotification,
    sendSimpleNotification,
    sendEventNotification
}
module.exports.SlackBot = SlackBot