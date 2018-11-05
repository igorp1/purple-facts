const SlackBot = require('./slackBot')
const Emailer = require('./emailer')
const db = require('./db')
const helpers = require('./helpers')

module.exports.handleConversationDone = (triggerKey, userData) => {
    
    let welcomeEmail, quoteRequestEmail, personalContactEmail

    // userData.email = 'igordepaula1@gmail.com' // for debugging

    switch(triggerKey){
        case 'user-registered' :
            personalContactEmail = Emailer.getEmailFromTemplate('personalContact', userData)
            const emailBody = `Hello ${userData.name},
%0D%0A%0D%0A
Thank you for registering for the introductory call! My name is Igor de Paula,
I'm Purple Facts CEO and I'll be working with you to get your site off the ground and answer any questions you may have.
%0D%0A%0D%0A
I see you were looking to schedule the call ${userData['schedule-request']} (${userData.ip_region} time).
<continue here>
%0D%0A%0D%0A
Lookinng forward to connecting with you!
%0D%0A%0D%0A
Best,
%0D%0A%0D%0A
~ Igor de Paula
            `
            SlackBot.sendAdminNotification({
                fallback : `${SlackBot.Emoji.tada.utf} Event Outcome`,
                author_name : `Event Outcome`,
                color : SlackBot.Colors.red,
                author_icon : SlackBot.Emoji.tada.url,
                title : 'User Registered',
                title_link : `mailto:${userData.email}?subject=Thank you for registering!&&body=${emailBody}`,
                text : `A user just registered(${userData.email}), send a follow up email to schedule the intro call.`,
                ts : helpers.getTimeStamp(),
                actions : [
                    {
                        name: 'data',
                        text :`${SlackBot.Emoji.bolt.utf} See on user manager`,
                        type : "button",
                        url : `${require('../../purplefacts.config').CLIENT_SITE}/admin/users#${userData._id}`
                    }
                ]
            })
        break;
        case 'quote-requested':
        case 'simple-signup':
        case 'contact-email':
        case 'contact-text':
        case 'contact-chat':
        case 'contact-call-now':
        case 'contact-call-scheduled':
            // 👍 no action required, not using these outcomes on this code base
    }
    
}