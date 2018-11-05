const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

const helpers = require('./helpers')
const config = require('../_res/config.json')

// CONNECT TO DB ~~=>
const CONN_STR = `mongodb://${config.mongo.user}:${config.mongo.password}@localhost:27017/${config.mongo.db}`

// BUILD FUNCTIONS
const buildMongoFunction = (func) => {
    
    return function() {
        // Collect arguments for later use
        const MAIN_ARGUMENTS = arguments

        MongoClient.connect(CONN_STR, { useNewUrlParser: true }, function(err, client) {
            if(err) { console.log(err); return }
            
            // RUN FUNCTION
            func.apply(null, [client.db(config.mongo.db), ()=>{client.close()} , ...MAIN_ARGUMENTS] )
            
        });
    }

}


// BUILD FUNCTIONS ~~>
const getTests = buildMongoFunction((db, closeConn, animal, callback)=>{
    
    db.collection('test').findOne({ key: animal}, (err, data)=>{
        if(err){ closeConn(); callback(null, err.errmsg) }
        else callback(data || {})
        closeConn()
    })
})

const registerAdminUser = buildMongoFunction((db, closeConn, user, passHash, callback)=>{
    
    const adminCollection = db.collection('admin')

    adminCollection.find({user}).count((err, res)=>{
        if(err){closeConn(); return callback(null, err.errmsg) }
        if(res !== 0){closeConn(); return callback(null, "This user already exits") }

        // create new record
        adminCollection.insert({ user, passHash, role:'admin' },()=>{
            if(err){closeConn(); return callback(null, err.errmsg) }
            callback({user})
            closeConn()
        })
        
    })
})


const getUserByUsername = buildMongoFunction((db, closeConn, user, callback)=>{

    db.collection('admin').findOne({user}, (err, data)=>{

        if(err){ closeConn(); return callback(null, err.errmsg) }        
        if(!data){ closeConn(); return callback(null, `The user (${user}) does not exist`) }
        
        callback(data)
        closeConn()
    })
})


const getArticlePreviews = buildMongoFunction((db, closeConn, callback)=>{
    
    const articlesCollection = db.collection('cms:articles') 
    const articleCursor = articlesCollection.aggregate([
        { $sort: { created: -1 } },
        { $sort: { archived: 1 } },
        { $sort: { featured: -1 } },
    ])
    
    articleCursor.toArray((err, data) => {
        if(err) callback(null, err.errmsg)
        else callback(data.map( article => { return {
                _id: article._id,
                title : article.title,
                summary : article.summary,
                thumb: article.thumb,
                published : article.published,
                featured : article.featured,
                archived : article.archived,
                slug : article.slug,
        }}))

        closeConn()
    })
    
})

const getArticleById = buildMongoFunction((db, closeConn, id, callback)=>{
    
    db.collection('cms:articles').findOne( { _id : new mongo.ObjectID(id) } , (err, data)=>{

        if(err){ closeConn(); return callback(null, err.errmsg) }        
        if(!data) return callback(null, `The article (${id}) does not exist`)

        callback(data)
        closeConn()

    })
})

const getArticleBySlug = buildMongoFunction((db, closeConn, slug, callback)=>{
    
    db.collection('cms:articles').findOne( { slug } , (err, data)=>{

        if(err){ closeConn(); return callback(null, err.errmsg) }        
        if(!data) return callback(null, `The article (${slug}) does not exist`)

        callback(data)
        closeConn()

    })
})


const updateArticle = buildMongoFunction((db, closeConn, articleObj, callback)=>{
    
    articleObj['_id'] = new mongo.ObjectID(articleObj._id)
    db.collection('cms:articles').save(articleObj, (err, res) => {

        if(err) callback(null, err.errmsg) 
        else callback(true)

        closeConn()

    })
})

const createArticle = buildMongoFunction((db, closeConn, articleObj, callback)=>{

    db.collection('cms:articles').insert(articleObj, (err, res) => {

        if(err) callback(null, err.errmsg) 
        else callback(res.ops[0]._id)

        closeConn()

    })
})

const setArticleBool = buildMongoFunction((db, closeConn, articleId, field, bit, callback)=>{

    if(!['published', 'featured', 'archived'].includes(field)) throw 'This field is not valid for this function'   
    let updatedField = {}; updatedField[field] = bit

    db.collection('cms:articles').update({ _id: new mongo.ObjectID(articleId) }, { $set :updatedField}, (err, res) => {

        if(err) callback(null, err.errmsg) 
        else callback(res.result.ok===1)

        closeConn()

    })

})

const deleteArticle = buildMongoFunction((db, closeConn, articleId, callback) => {

    db.collection('cms:articles').deleteOne({ _id: new mongo.ObjectID(articleId) }, (err, res) => {

        if(err) callback(null, err.errmsg) 
        else callback(res.result.ok===1)

        closeConn()

    })

})


const getFeaturedArticles = buildMongoFunction((db, closeConn, callback)=>{
    
    const articlesCollection = db.collection('cms:articles') 
    const articleCursor = articlesCollection.aggregate([
        { $match: { $and : [ 
            { archived : false }, 
            { published : true },
            { featured : true } 
            ]}
        },
        { $sort: { created: -1 } },
    ])
    
    articleCursor.toArray((err, data) => {
        if(err) callback(null, err.errmsg)
        else callback(data.map( article => { return {
                _id: article._id,
                title : article.title,
                summary : article.summary,
                thumb: article.thumb,
                published : article.published,
                featured : article.featured,
                archived : article.archived,
                created: article.created,
                readingTime : article.readingTime,
                slug : article.slug,
        }}))

        closeConn()
    })
    
})

const getCommonArticles = buildMongoFunction((db, closeConn, callback)=>{
    
    const articlesCollection = db.collection('cms:articles') 
    const articleCursor = articlesCollection.aggregate([
        { $match: { archived : false } },
        { $match: { published : true } },
        { $match: { featured : false } },
        { $sort: { created: -1 } },
    ])
    
    articleCursor.toArray((err, data) => {
        if(err) callback(null, err.errmsg)
        else callback(data.map( article => { return {
                _id: article._id,
                title : article.title,
                summary : article.summary,
                thumb: article.thumb,
                published : article.published,
                featured : article.featured,
                archived : article.archived,
                created: article.created,
                readingTime : article.readingTime,
                slug : article.slug,
        }}))

        closeConn()
    })
    
})


const doesUserExist = buildMongoFunction((db, closeConn, userID, callback)=>{

    const userCollection = db.collection('user:data')
    userCollection.find({_id: new mongo.ObjectID(userID) }).count((err, res)=>{ callback(res !== 0 ); closeConn() })

})

const saveUserData = buildMongoFunction((db, closeConn, userID, data, callback)=>{
    
    const dataCollection = db.collection('user:data')
    
    const _id = new mongo.ObjectID(userID)
    const $set = data
    $set.lastUpdate = new Date
    
    dataCollection.update({_id}, {$set}, {upsert:true}, (err, data)=>{

        if(err) callback(null, err.errmsg)
        else callback(data)

        closeConn()

    })
    
})

const logUserEvent = buildMongoFunction((db, closeConn, userID, event, eventData, callback)=>{
    
    const eventCollection = db.collection('user:events')
    
    const user = new mongo.ObjectID(userID)
    const date = new Date

    eventCollection.insert({ user, event, eventData, date }, (err, data)=>{

        if(err) callback(null, err.errmsg)
        else callback(data)

        closeConn()

    })
    
})

const getUserData = buildMongoFunction((db, closeConn, userID, callback)=>{

    const dataCollection = db.collection('user:data')

    dataCollection.findOne({ _id: new mongo.ObjectID(userID) }, (err, data)=>{
        if(err) callback(null, err.errmsg)
        else callback(data)

        closeConn()
    })

})

const getUserDataList = buildMongoFunction((db, closeConn, callback)=>{
    
    const dataCollection = db.collection('user:data')
    const userCursor = dataCollection.aggregate([
        { $sort: { lastUpdate: -1 } },
    ])
    
    userCursor.toArray((err, data) => {
        if(err) callback(null, err.errmsg)
        else callback(data)

        closeConn()
    })
    
})

const getEventsForUser = buildMongoFunction((db, closeConn, userID, callback)=>{

    user = new mongo.ObjectID(userID)

    const dataCollection = db.collection('user:events')
    const userCursor = dataCollection.aggregate([
        { $match: { user } },
        { $sort: { date: -1 } },
    ])
    
    userCursor.toArray((err, data) => {
        if(err) callback(null, err.errmsg)
        else callback(data)

        closeConn()
    })

})


const unsubscribeUser = buildMongoFunction((db, closeConn, email, callback)=>{
    
    const userCollection = db.collection('users')

    userCollection.findOneAndUpdate({ email }, { $set : { receiveEmails:false }}, (err, res)=>{

        if(err) callback(null, err.errmsg)
        else callback({ 
            user: res.value
        })
        
        closeConn()

    })
    
})


// LIST EXPORTED METHODS HERE ~~>
module.exports = {
    // TEST
    getTests,

    // AUTH
    registerAdminUser,
    getUserByUsername,

    // CMS : ARTICLES
    getArticlePreviews,
    getArticleById,
    getArticleBySlug,
    updateArticle,
    createArticle,
    setArticleBool,
    deleteArticle,

    // BLOG 
    getFeaturedArticles,
    getCommonArticles,

    // USER
    saveUserData,
    logUserEvent,
    doesUserExist,
    getUserData,
    getUserDataList,
    getEventsForUser,
    unsubscribeUser,
    

}