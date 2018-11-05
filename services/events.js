
module.exports.EVENTS = {
    'firstSiteVisit' : {
        label : 'First time visiting the site',
        color : '#35B560', // green
        dataKeys : new Set(['page']),
        makeDataLabel : (data) => `page ~> ${data.page}`
    },
    'returnSiteVisit' : {
        label : 'Returned to the site after first visit',
        color : '#E5A538', // yellow
        dataKeys : new Set([ 'visit_number', 'page' ]),
        makeDataLabel : (data) => `Visit #${data.visit_number} on ${data.page}`
    },
    'navigation': {
        label : 'Navigated to page',
        color : '#C45112', // orange
        dataKeys : new Set(['page']),
        makeDataLabel : (data) => `page ~> ${data.page}`
    },
    'callToAction' : {
        label : 'User clicked on call to action button',
        color : '#C74446', // tomato
        dataKeys : new Set(['cta_label', 'page']),
        makeDataLabel : (data) => `"${data.cta_label}" CTA on ${data.page}`
    },
    'startLeadFormEngagement' : {
        label : 'User started engaging with lead form',
        color : '#35B560', // green
        dataKeys : new Set([])
    }, 
    'leadFormSubmission' : {
        label : 'User submitted lead form',
        color : '#3F7FC7', // blue
        dataKeys : new Set([])
    }, 
    'userDataUpdate' : {
        label : 'User data has been updated',
        color : '#6A3CA8', // purple
        dataKeys : new Set([])
    },
    'startBotConversation' : {
        label : 'User started conversation with chatbot',
        color : '#35B560', // green
        dataKeys : new Set([ 'choice' ]),
        makeDataLabel : (data) => `user said : "${data.choice}"`
    },
    'botConversationDone' : {
        label : 'User finished conversation with chatbot',
        color : '#3F7FC7', // blue
        dataKeys : new Set([ 'outcome' ]),
        makeDataLabel : (data) => `outcome ~> ${data.outcome}`
    },
    'readBlog' : {
        label : 'User started reading blog post',
        color : '#E5601D', // orange
        dataKeys : new Set([ 'post' ]),
        makeDataLabel : (data) => `post ~> ${data.post}`
    },
    'read-guidebook' : {
        label : 'User clicked to read guidebook',
        color : '#4654BD', // orange
        dataKeys : new Set([ ]),
    }       
}