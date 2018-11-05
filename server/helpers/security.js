const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('./db')
const config = require('../_res/config.json')

 // 🌊 DONE
const isAuthorizationHeaderValid = (authorizationHeader) => {
    if(!authorizationHeader) return false
    
    const splitHeader =  authorizationHeader.split(' ')
    if(splitHeader.length !== 2) return false
    if(splitHeader[0] !== 'Bearer') return false

    return isJWTValid(splitHeader[1])
}
module.exports.isAuthorizationHeaderValid = isAuthorizationHeaderValid 

 // 🌊 DONE
const isJWTValid = (token) => {
    if(!token) return null
    
    try{
        const decodedToken = jwt.verify(token, config.adminJWTSecret)
        return decodedToken
    }
    catch (e){
        return null
    }
}
module.exports.isJWTValid = isJWTValid 

// 🌊 DONE
const isApiKeyValid = (apiKey) => {
    return apiKey === config.adminApiKey
}
module.exports.isApiKeyValid = isApiKeyValid

// 🌊 DONE
const buildToken = (payload) => {
    if(!payload) return null
    var token = jwt.sign(payload, config.adminJWTSecret, {
        expiresIn : "10 days" // expires in 10 days
    })
    return token
}
module.exports.buildToken = buildToken

// 🌊 DONE
const registerAdminUser = (user, pass, passTokenCallback) => {

    // hash password
    const SALT = `$2a$10$${config.hashSalt}:${user}` // SALT: $Vers$log2(NumRounds)$saltvalue
    const hash = bcrypt.hashSync( pass, SALT ) 
    
    db.registerAdminUser(user, hash, (userPayload, err)=>{
        passTokenCallback(buildToken(userPayload), err)
    })

}
module.exports.registerAdminUser = registerAdminUser

// 🌊 DONE
const authenticate = (user, pass, passTokenCallback) => {

    // get user info ~~>
    db.getUserByUsername(user, (rawUserObj, err)=>{
        
        // handle errs
        if(err) 
            return passTokenCallback(null, err)

        // verify password
        if(!bcrypt.compareSync(pass, rawUserObj.passHash))
            return passTokenCallback(null, 'The password was wrong')

        // generate token
        const token = buildToken({
            id:  rawUserObj._id,
            user : rawUserObj.user,
            role : rawUserObj.role
        })

        passTokenCallback(token)

    })
    
}
module.exports.authenticate = authenticate


// 🌊 DONE
const isAuthenticatedRequest = (request) => {
    const authorizationHeader = request.get('Authorization')
    
    decodedToken = isAuthorizationHeaderValid(authorizationHeader)
    return decodedToken

}
module.exports.isAuthenticatedRequest = isAuthenticatedRequest


// 🌊 DONE
const isAuthorizedRequest = (role, request) => {
    const decodedToken = isAuthenticatedRequest(request)
    if(!decodedToken) { return null }
    if(decodedToken.role !== role) { return null }
    return decodedToken
}
module.exports.isAuthorizedRequest = isAuthorizedRequest