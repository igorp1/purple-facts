import Router from 'next/router'
import { PurpleFactsAPI } from './_common'

const API_BASE = '/api/admin' 

const AdminService = {
    
    requiresAuth : ( onSuccessFn, onFailFn ) => {
        const token = localStorage.getItem('admin:token')
        const fail = ()=>{
            localStorage.removeItem('admin:token')
            if(onFailFn) onFailFn() 
            else Router.push('/admin')
        }
        if( token ){
            PurpleFactsAPI.get(
                `${API_BASE}/auth/tokencheck`, 
                onSuccessFn,
                { token, errHandle:fail }
            )
        }
        else{
            fail()
        }   
    },

    login : (user, password, callback, errHandle) => {
        PurpleFactsAPI.post(`${API_BASE}/auth/login`,{user, password}, 
            ({token}) =>{
                localStorage.setItem('admin:token', token)
                callback(token)
            }, 
            {errHandle}
        )
    },

    registerAdmin : (user, password, adminKey, callback, errHandle) => {
        PurpleFactsAPI.post(`${API_BASE}/auth/register/${adminKey}`,{user, password}, callback, errHandle)
    }


}

export default AdminService


