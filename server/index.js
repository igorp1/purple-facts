var fs = require("fs")
const path = require('path')
const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000


const CLIENT_SITE = require('../purplefacts.config').CLIENT_SITE
console.log(CLIENT_SITE)

app.prepare()
.then(() => {
    const server = express()
    
    // REGISTER CLEAN URLs 
    const pages = {
        '/sell' : { 
            masked : '/sell-my-house-fast', 
            params : []    
        },
        '/sell/city' : { 
            masked : '/sell-my-house-fast-in-:city', 
            params : ['city']    
        },
        
        '/blog/post' : { 
            masked : '/blog/:slug', 
            params : ['slug']    
        },
        '/admin/cms/edit' : { 
            masked : '/admin/cms/edit/:slug', 
            params : ['slug']    
        },
        '/admin/cms/preview' : { 
            masked : '/admin/cms/preview/:slug', 
            params : ['slug']    
        }
    }
    Object.keys(pages).map( page => {
        server.get(pages[page].masked, (req, res) => {
            const actualPage = page
            const queryParams = {}
            pages[page].params.map( param => { queryParams[param]=req.params[param] } )
            app.render(req, res, actualPage, queryParams)
        })
    })
    
    // REGISTER APIs
    server.use(['/api/user'], require('./user'));
    server.use(['/api/blog'], require('./blog'));
    server.use(['/api/admin'], require('./admin'));
    
    // SPECIAL FILES
    server.use(['/humans.txt'],(req, res, next)=>{
        res.set({'Content-type': 'text/plain'})
        fs.readFile( path.join(__dirname, '/_res/humans.txt'), 'utf8', (err, data) => {
            if(err) res.status(500).send(err)
            else res.send(data)
        })
    })

    server.use(['/robots.txt'],(req, res, next)=>{
        res.set({'Content-type': 'text/plain'})
        fs.readFile( path.join(__dirname, '/_res/robots.txt'), 'utf8', (err, data) => {
            if(err) res.status(500).send(err)
            else res.send(data)
        })
    })

    server.use(['/sitemap.xml'],(req, res, next)=>{
        res.set({'Content-type': 'application/xml'})
        fs.readFile( path.join(__dirname, '/_res/sitemap.xml'), 'utf8', (err, data) => {
            if(err) res.status(500).send(err)
            else res.send(data)
        })
    })

    server.use(['/googlee3685ed189271429.html'],(req, res, next)=>{
        res.set({ 'Content-Type' : 'text/html' })
        res.send('google-site-verification: googlee3685ed189271429.html')
    })

    


    // REGISTER HANDLER
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    // START LISTENING
    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})