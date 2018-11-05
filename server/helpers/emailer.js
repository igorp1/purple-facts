const nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')

const EMAIL_CONFIG = {
    user : `igor@purplefacts.com`,
    email : `contact@purplefacts.com`,
    clientId : `437548498996-os066jsj2sbcn4sde523hl2ku57vgqfp.apps.googleusercontent.com`,
    clientSecret : `qqjXJjxsgJY5QrmobwmeVGlH`,
    refreshToken : `1/ZAQ7euf6S7Z14QygnWY1RfoACAjJR1PSqg9mne7KF1I`,
    accessToken : `ya29.GlsNBtVKdhedGpXdGJs3OIcWvdmYFxA8jv64mcV8Vl6d9X8zrXli5ulsoRmc3nCGYEghCH0_ulBJxA1R9zJIsmFC_j_XDd9RRs3C7A_p1CC5ZLXOonNm87s9izlr`
}

String.prototype.replaceAll = function(search, replacement) {
    const target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}

function emailFileTemplate(fileName){
    return path.join(__dirname, `../email_templates/${fileName}.html`)
}

const loadEmailTemplates = {

    sellerWelcome : (params) => {
        // load template 
        let html = fs.readFileSync( emailFileTemplate('seller_welcome'), 'utf8')
        html = html.replaceAll('{{NAME}}',params.name)
        html = html.replaceAll('{{EMAIL}}',params.email)

        return {
            subject : 'Sell your home with Purple Facts',
            body : html
        }

    },

    'sellerWelcome-noname' : (params) => {
        // load template 
        let html = fs.readFileSync( emailFileTemplate('seller_welcome'), 'utf8')
        html = html.replaceAll(' {{NAME}}','!')
        html = html.replaceAll('{{EMAIL}}',params.email)

        return {
            subject : 'Sell your home with Purple Facts',
            body : html
        }

    },

    investorWelcome : (params) => {
        // load template 
        let html = fs.readFileSync( emailFileTemplate('investor_welcome'), 'utf8')
        html = html.replaceAll('{{NAME}}',params.name)
        html = html.replaceAll('{{EMAIL}}',params.email)

        return {
            subject : 'Start investing with Purple Facts',
            body : html
        }
    },

    personalQuoteRequest : (params) => {

        // load template 
        let html = fs.readFileSync( emailFileTemplate('personal_quote_request'), 'utf8')
        html = html.replaceAll('{{NAME}}',params.name)
        html = html.replaceAll('{{ADDRESS}', params.propertyAddress)

        return {
            subject : `Purple Facts: Getting started with your quote`,
            body: html
        }

    },

    personalContact : (params) => {

        // load template 
        let html = fs.readFileSync( emailFileTemplate('personal_initial_contact'), 'utf8')
        html = html.replaceAll('{{NAME}}',params.name+',')

        return {
            subject : `Purple Facts: Getting started with your quote`,
            body: html
        }

    },

    'personalContact-noname' : (params) => {

        // load template 
        let html = fs.readFileSync( emailFileTemplate('personal_initial_contact'), 'utf8')
        html = html.replaceAll(' {{NAME}}','!')

        return {
            subject : `Purple Facts: Getting started with your quote`,
            body: html
        }

    }

}

module.exports = {

    isValidEmail : (email)=>{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    },

    getEmailFromTemplate : (templateName, params) => {
        return loadEmailTemplates[templateName](params)
    },

    sendEmail : (to, subject, html, options) => {
        /*
            OPTIONS =>
            personal : true | false => sends email from igor@purplefacts.com instead of contact@purplefacts.com
            delay : minutes => delays sending email, ideal for personal email 
        */
        options = options || {}

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: EMAIL_CONFIG.user,
                clientId: EMAIL_CONFIG.clientId,
                clientSecret : EMAIL_CONFIG.clientSecret,
                refreshToken : EMAIL_CONFIG.refreshToken,
                accessToken: EMAIL_CONFIG.accessToken,
                expires: 3575
            }
        })
        
        let mailOptions = {
            from    :   `${options.personal ? 'Igor de Paula' : 'Purple Facts'} <${options.personal ? EMAIL_CONFIG.user : EMAIL_CONFIG.email}>`,
            subject :   subject,
            to      :   to,
            html    :   html
        }

        setTimeout(()=>{
            transporter.sendMail(mailOptions, (err,res) =>{ if(err) console.log(err) })
        }, (options.delay ? options.delay*60000 : 0) )
        

    },


}