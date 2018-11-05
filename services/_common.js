import fetch from 'isomorphic-unfetch'

function getBaseUrlFromRequest(req) {
    if(!req) return window.location.origin
    return req.headers ? `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}` : ''
}

export const defaultErrorHandler = (error, severity='low') => {
    // accepted severities are : low | medium | high
    const actOnSeverity = {
        low : (e) => { /* handle things silently */ },
        med : (e) => {console.warn(e)},
        high : (e) => { /* TODO: notify slack */ },
    }
    
    const handle = actOnSeverity[severity] || actOnSeverity.low
    handle(error)
}

const get = (REQ, authorizationToken='', absoluteUrl=false) => {
    const BASE_URL = absoluteUrl ? '' : getBaseUrlFromRequest(REQ)
    return async function(path){
        try{
            const res = await fetch(`${BASE_URL}${path}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${authorizationToken}` },
            })
            return await res.json()
        }
        catch(e){
            defaultErrorHandler(e)
            return {}
        }
    }
}

const post = (REQ, authorizationToken='', absoluteUrl=false) => {
    const BASE_URL = absoluteUrl ? '' : getBaseUrlFromRequest(REQ)
    return async function(path, payload){
        try{
            const res = await fetch(`${BASE_URL}${path}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${authorizationToken}` 
                },
                body: JSON.stringify(payload)
            })
            return await res.json()
        }
        catch(e){
            defaultErrorHandler(e)
            return {}
        }
    }
}

export const PurpleFactsAPI = {
    get : async (rqstPath, callback, {errHandle, req, token=''}) => {
        const res = await get(req, token)(rqstPath)
    
        if(!res && errHandle){defaultErrorHandler()}
        else if(!res.success){errHandle ? errHandle(res.error) : defaultErrorHandler(res.error, 'med')}
        else {callback(res.data)}
    },

    post : async (rqstPath, payload, callback, {errHandle, req, token=''}) => {
        const res = await post(req, token)(rqstPath, payload)
    
        if(!res && errHandle){defaultErrorHandler()}
        else if(!res.success){errHandle ? errHandle(res.error) : defaultErrorHandler(res.error, 'med')}
        else {callback(res.data)}
    },

    getSync : async (rqstPath, { req, token=''}) => {
        const res = await get(req, token)(rqstPath)
        if(res.success) return res.data
        else return defaultErrorHandler(res.error)
    },

    postSync : async (rqstPath, payload, { req, token=''}) => {
        const res = await post(req, token)(rqstPath, payload)
        if(res.success) return res.data
        else return defaultErrorHandler(res.error)
    },

}

export const MakeRequest = {
    get : async (rqstUrl, callback, {errHandle, req, token=''}) => {
        const res = await get(req, token, true)(rqstUrl)
    
        if(!res && errHandle){errHandle ? errHandle() : defaultErrorHandler(res)}
        else {callback(res)}
    },

    post : async (rqstUrl, payload, callback, {errHandle, req, token=''}) => {
        const res = await post(req, token, true)(rqstUrl, payload)
    
        if(!res && errHandle){errHandle ? errHandle() : defaultErrorHandler(res)}
        else {callback(res)}
    }
}



