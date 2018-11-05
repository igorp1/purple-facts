import { PurpleFactsAPI } from './_common'
import { generateID } from './helpers'
import { EVENTS } from './events'

const API_BASE = '/api/user'
const LOG_ADMIN_EVENTS = true 
const SAVE_ADMIN_DATA = true

const getUserId = () => {
    let id = localStorage.getItem('user:id')
    if(!id){
        id = window.location.origin.includes('localhost') ? '0'.repeat(24) : generateID()
        localStorage.setItem('user:id', id)
    }
    return id 
}

export const eventDataValid = (event, eventData) => {
    if(!eventData)
        return !EVENTS[event].dataKeys || EVENTS[event].dataKeys.size===0
    
    if( EVENTS[event].dataKeys.size !== Object.keys(eventData).length ){ return false }

    return Object.keys( eventData ).map( x=> EVENTS[event].dataKeys.has(x) ).every(x=>x===true)
}


const UserService = {

    logEvent : (event, eventData, callback, errHandle) => {

        if(localStorage.getItem('admin:token') || !LOG_ADMIN_EVENTS) {
            console.log(`🤖 EVENT LOG ~~> ${event}`)
            if(eventData) console.log(eventData)
            console.log('.  .  .  .  .  .  .')
            return 
        }

        if(!callback) callback = ()=>{}

        if(!EVENTS[event]) throw `The event name (${event}) is not recognized.`
        if(!eventDataValid(event, eventData)) throw `The event data is not valid`
        
        PurpleFactsAPI.post(
            `${API_BASE}/event`,
            { event, userID:getUserId(), eventData },
            callback, {errHandle}
        )

    },

    updateUserData : (data, callback, errHandle) => {
        if(!Object.keys(data)) throw `The given data object is empty.`
        if(!callback) callback = ()=>{}

        if(localStorage.getItem('admin:token') || !SAVE_ADMIN_DATA) {
            console.log(`🤖 DATA UPDATE ~~>`)
            console.log(data)
            console.log('.  .  .  .  .  .  .')
            return 
        }

        PurpleFactsAPI.post(
            `${API_BASE}/data`,
            { data , userID:getUserId() },
            callback, {errHandle}
        )
    },

    incrementVisit : () => {
        let visit = localStorage.getItem('user:visit') || 0
        localStorage.setItem('user:visit', Number(visit)+1)
        return Number(visit)+1
    }

}

export default UserService
