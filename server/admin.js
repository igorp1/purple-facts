const express = require('express')
const bodyParser = require('body-parser')

const db = require('./helpers/db')
const Security = require('./helpers/security')

//////
////// MOUNT API
var admin = express()
admin.use(bodyParser.json())
admin.on('mount', function (parent) {
    console.log('> Admin API Mounted')
});

//////
////// AUTH ROUTES

/* 
    pass api key and register user with role admin
    http://localhost:3000/api/admin/auth/register/:API_KEY
    API_KEY : api key, can be found in config file
    body : {
        user: 'USERNAME',
        password: 'PASS'
    }
*/
admin.post('/auth/register/:adminApiKey', (req, res)=>{

    const adminApiKey = req.params.adminApiKey
    
    if( !Security.isApiKeyValid(adminApiKey) ){
        res.status(401).json({ 
            success: false, 
            message: `The given api key (${adminApiKey}) is not valid.` 
        })
        return res.end()
    }

    // get body ~~>
    const {user, password} = req.body
    Security.registerAdminUser(user, password, (token, err)=>{
        if(err) {
            res.status(400).json({ success: false, error : err })
            return res.end()
        }
        else{
            res.json({ token, success : true })
        }
    })

})

/* 
    log in admin user
    http://localhost:3000/api/admin/auth/login
    body : {
        user: 'USERNAME',
        pass: 'PASS'
    }
*/
admin.post('/auth/login', (req, res)=>{
    
    const {user, password} = req.body
    Security.authenticate(user, password, (token, err)=>{
        if(err) {
            res.status(400).json({ success: false, error : err })
        }
        else{
            res.json({ data:{token}, success : true })
        }
    })


})

/* 
    log in admin user
    http://localhost:3000/api/admin/auth/login
    body : {
        user: 'USERNAME',
        pass: 'PASS'
    }
*/
admin.get('/auth/tokencheck', (req, res)=>{
    
    if(Security.isAuthenticatedRequest(req)){
        res.json({ success : true })
    }
    else{
        res.json({ success: false, error : 'The token is not valid' })
    }

})


//////
////// CMS ROUTES

/* 
    🌊 DONE
    [protected] returns all articles on the cms in preview format
    http://localhost:3000/api/admin/cms/articles
    res : [
        {
            _id: <string>,
            title : <string>,
            summary : <string>,
            thumb: <url>,
            published : <bool>,
            featured : <bool>,
            archived : <bool>,
            slug : <string>,
        }, ...
    ]
*/
admin.get('/cms/articles', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        message : "You are not authorized to make this request."
    })
    
    db.getArticlePreviews((data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({ success : true, data })
    })

})


/* 
    🌊 DONE
    [protected] returns articles that matches id
    http://localhost:3000/api/admin/cms/article/:id
    id : article id
    res : {
        _id: <string>,
        title : <string>,
        slug : <string>,
        summary : <string>,
        thumb : <string>,
        body : <string>,
        author : <string>,
        published :  <bool>,
        featured : <bool>,
        archived : <bool>,
        created : <epoch>
    }
*/
admin.get('/cms/article/:id', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })
    
    db.getArticleById(req.params.id, (data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({ success : true, data })
    })

})


/* 
    🌊 DONE
    [protected] returns articles that matches slug
    http://localhost:3000/api/admin/cms/article/slug/:id
    slug : article slug
    res : {
        _id: <string>,
        title : <string>,
        slug : <string>,
        summary : <string>,
        thumb : <string>,
        body : <string>,
        author : <string>,
        published :  <bool>,
        featured : <bool>,
        archived : <bool>,
        created : <epoch>
    }
*/
admin.get('/cms/article/slug/:slug', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })
    
    db.getArticleBySlug(req.params.slug, (data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({ success : true, data })
    })

})

/* 
    🌊 DONE
    [protected] Updates an article
    http://localhost:3000/api/admin/cms/article/update
    body : {
        _id : <string>,
        title : <string>,
        slug : <string>,
        summary : <string>,
        thumb : <string>,
        body : <string>,
        author : <string>,
        published :  <bool>,
        featured : <bool>,
        archived : <bool>,
        created : <epoch>
    }
*/
admin.post('/cms/article/update', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })

    // get body ~~>
    const articleObj = req.body
    
    db.updateArticle(articleObj, (data, err) => {
        if(err) return res.json({success:false, error:err})
        res.json({success : true })
    })
    
})

/* 
    🌊 DONE
    [protected] log in admin user
    http://localhost:3000/api/ams/article/new
    body : {
        title : <string>,
        slug : <string>,
        summary : <string>,
        thumb : <string>,
        body : <string>,
        author : <string>,
        published :  <bool>,
        featured : <bool>,
        archived : <bool>,
        created : <epoch>
    }
    res._id : new document id 
*/

admin.post('/cms/article/new', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })

    // get body ~~>
    const article = req.body

    db.createArticle(article, (id, err) => {
        if(err) return res.json({success:false, error:err})
        res.json({success : true, _id: id })
    })
    
})

/* 
    🌊 DONE
    [protected] toggle published
    http://localhost:3000/api/admin/cms/article/:id/toggle/published/:toggleValue
    id : id for the article you want to update 
    toggleValue : true | false

*/
admin.get('/cms/article/:id/toggle/published/:toggleValue', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })
    
    db.setArticleBool(req.params.id, 'published', req.params.toggleValue==1, (data, err) => {
        if(err) return res.json({success:false, error:err})
        res.json({success : data })
    })
    
})

/* 
    🌊 DONE
    [protected] toggle featured
    http://localhost:3000/api/admin/cms/article/:id/toggle/featured/:toggleValue
    toggleValue : true | false
*/
admin.get('/cms/article/:id/toggle/featured/:toggleValue', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })
    
    db.setArticleBool(req.params.id, 'featured', req.params.toggleValue==1, (data, err) => {
        if(err) return res.json({success:false, error:err})
        res.json({success : data })
    })
    
})

/* 
    🌊 DONE
    [protected] toggle archived
    http://localhost:3000/api/admin/cms/article/:id/toggle/archived/:toggleValue
    toggleValue : true | false
*/
admin.get('/cms/article/:id/toggle/archived/:toggleValue', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })

    db.setArticleBool(req.params.id, 'archived', req.params.toggleValue==1, (data, err) => {
        if(err) return res.json({success:false, error:err})
        res.json({success : data })
    })
    
})


/* 
    🌊 DONE
    [protected] delete post forever
    http://localhost:3000/api/admin/cms/article/:id/toggle/archived/:toggleValue
    toggleValue : true | false
*/
admin.get('/cms/article/:id/delete', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })

    db.deleteArticle(req.params.id, (data, err) => {
        if(err) return res.json({success:false, error:err})
        res.json({success : data })
    })
    
})


/* 
    🌊 DONE
    [protected] returns a list of signnedup users
    http://localhost:3000/api/admin/users
    toggleValue : true | false
*/
admin.get('/users', (req, res)=>{
    let obj = Security.isAuthorizedRequest('admin',req)
    if(!obj) return res.status(403).json({
        success:false,
        error : "You are not authorized to make this request."
    })

    db.listUsers((data,err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({success:true, data })
    })
    
})


module.exports = admin;