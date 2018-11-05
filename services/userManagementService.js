import { PurpleFactsAPI } from './_common'

const API_BASE = '/api/user'

const UserManagementService = {

    getUsers : (callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/list`, callback, {errHandle, token})
    },
    
    getEventsForUser : (userID, callback, errHandle) => {
        const token = localStorage.getItem('admin:token')
        PurpleFactsAPI.get(`${API_BASE}/events/${userID}`, callback, {errHandle, token})
    },

}

export default UserManagementService


