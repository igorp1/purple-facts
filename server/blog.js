const express = require('express')
const db = require('./helpers/db')

// MOUNT API
var blog = express();
blog.on('mount', function (parent) {
    console.log('> Blog API Mounted')
});

// DEFINE ROUTES

blog.get('/articles/featured', (req, res) => {
    
    db.getFeaturedArticles((data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({ success : true, data })
    })

});

blog.get('/articles/common', (req, res) => {
    
    db.getCommonArticles((data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({ success : true, data })
    })

})

blog.get('/article/:slug', (req, res) => {
    
    db.getArticleBySlug(req.params.slug, (data, err)=>{
        if(err) return res.json({success:false, error:err})
        res.json({ success : true, data })
    })

})

module.exports = blog;