const db = require('./db')
const fetch = require('isomorphic-fetch')
const ChatbotHelpers = require('./chatbotHelper')
const SlackBot = require('./slackBot').SlackBot

const getCityFromIP = async (IP) => {
    let ipData = await (await fetch(`https://ipapi.co/${IP}/json`)).json()
    if(!ipData.city) return {}
    return {
        ip_city: ipData.city,
        ip_region : ipData.region,
        ip_postalCode : ipData.postal, 
        ip_ISP: ipData.org 
    }
}

const createUserIfNotExist = (userID, IP) => {
    db.doesUserExist(userID, async (exists)=>{
        let userData = await getCityFromIP(IP)
        userData.IP = IP
        if(!exists){ db.saveUserData(userID, userData, ()=>{}) }
    })
}


const triggerEventOutcome = (userID, event, eventData) => {
    
    // DBEUGGINNG
    // console.log('EVENT OUTCOME TRIGGERED')
    // console.log(`user : ${userID} | event : ${event}`)
    // console.log(eventData)

    const withUserData = (callback) => {
        db.getUserData(userID, (userData, err) => {
            if(err) return console.warn(`Something went wrong on triggerEventOutcome for ${userID} on event '${event}'`)
            callback(userData)
        })
    }

    switch (event) {
        case 'firstSiteVisit' : 
        case 'startLeadFormEngagement' :
        case 'leadFormSubmission' :
        case 'startBotConversation' :
            SlackBot.sendEventNotification(userID, event, eventData)
            break
        case 'botConversationDone' :
            withUserData((userData)=>{ console.log(userData); ChatbotHelpers.handleConversationDone(eventData.outcome, userData) })
            SlackBot.sendEventNotification(userID, event, eventData)
            break
        case 'navigation' :
        case 'returnSiteVisit' : 
        case 'callToAction' :
        case 'userDataUpdate' :
        default:
            console.log(`Event ${event} has no known outcome`)
    }

}


const logEvent = (userID, event, eventData, callback) => {
    db.logUserEvent(userID, event, eventData, (data, err) => {
        if(callback){
            if(err) callback({success:false, error:err})
            callback({success:true})
            triggerEventOutcome(userID, event, eventData)
        }
    })
}


module.exports = {
    createUserIfNotExist,
    logEvent,
    triggerEventOutcome
}
