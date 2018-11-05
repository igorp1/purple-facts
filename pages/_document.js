import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'
import Helmet from 'react-helmet'

import { shadowL, shadowM, mainFont, transition, colorOffDark, colorDark, colorLink, colorError, colorConfirm, logos,  } from '../components/_theme'

/// SET GLOBAL STYLES =>
injectGlobal`
    body {
        margin:0;
        padding:0;    
        font-family: ${mainFont};
        color: ${colorDark};
        overflow-x:hidden;
    }
    i.material-icons{vertical-align : middle;}
    a{text-decoration:underline;}
    button{
        border: none;
        outline: none;
        cursor: pointer;
        padding: .5em 1em;
        border-radius: .1em;
        box-shadow: ${shadowL};
        transition: ${transition};
        font-family: ${mainFont};
        &.simple{
            box-shadow:none;
            border-radius:4px; 
            border:solid 1px #c5c5c5;
            &:hover{ box-shadow: ${shadowL}; }
            &:active{ box-shadow: none; }
        }
        &:hover{
            box-shadow: ${shadowM};
        }
        &:active{
            box-shadow: ${shadowL};
        }
    }
    input{
        box-sizing : border-box;
        border: 0.05em solid ${colorOffDark};
        padding: .2em 0.5em;
        border-radius: .2em;
        outline: none;
        transition: ${transition};
        font-family: ${mainFont};
    }
    p{ line-height: 2.25em; }
    li{line-height: 1.7em; }

    b, strong{ font-weight: bolder; }

    hr{
        border: .5px solid rgba(0,0,0,.5);
        width: 50%;
        min-width: 280px;
    }

    a{
        outline:none;
        cursor: pointer;
        color: ${ colorLink };
        transition: ${transition};
        &:hover{
            text-decoration: underline;
        }
    }

    img.framed{
        border-radius: 3px;
        box-shadow: ${shadowM};
    }

    .noselect {
        user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
    }
`

/// DEFINE RENDER DOCUMENT =>
export default class MyDocument extends Document {
    
    /*
     * ON INIT
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    static getInitialProps ({ renderPage }) {
        const sheet = new ServerStyleSheet()
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
        const styles = sheet.getStyleElement()
        const helmet = Helmet.renderStatic();
        return { ...page, styles, helmet }
    }

    /*
     * REACT-HELMET SETUP
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    get helmetHtmlAttrComponents () {
        return this.props.helmet.htmlAttributes.toComponent()
    }
    get helmetBodyAttrComponents () {
        return this.props.helmet.bodyAttributes.toComponent()
    }
    get helmetHeadComponents () {
        return Object.keys(this.props.helmet)
        .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
        .map(el => this.props.helmet[el].toComponent())
    }
    get defaultHelmet() {
        return (
            <Helmet>
                <title>Purple Facts | Real Estate Investing in the Age of Technology</title>
                <meta property="og:image" content={logos.banner} />
                <meta property='og:site_name' content='Purple Facts' />
            </Helmet>
        )
    }

    /*
     * PLUGINS
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    get plugins() {
        return (
            <div>
                {this.googleAnalytics}
                {this.facebookPixel}
                {this.tawkAPI}
            </div>
        )
    }

    get tawkAPI() {
        return (
            <script async src="/static/plugins/tawk.js" type="text/javascript"></script>   
        )   
    }
    
    get googleAnalytics() {
        return (
            <div>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-123365196-1"></script>
                <script async src="/static/plugins/googleanalytics.js" type="text/javascript"></script>
            </div>
        )
    }

    get facebookPixel() {
        return( <div>
            <script async src="/static/plugins/facebookpixel.js" type="text/javascript"></script>
            <noscript>
                <img height="1" width="1" src="https://www.facebook.com/tr?id=252062405410621&ev=PageView&noscript=1" />
            </noscript>
        </div>)
    }
    

    /*
     * RENDER DOC COMPONENT
     * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    render () {
        return (
            <html {...this.helmetHtmlAttrComponents}>
                <head>
                    
                    {/* 🧢 DEFAULTS */}
                    <meta charSet="utf-8" />
                    <link rel="canonical" href="/" />
                    <meta property='viewport' name='viewport' content='width=device-width,minimum-scale=1' />

                    <meta property="og:locale" name="og:locale" content="en_US" />
                    <meta property="mobile-web-app-capable" name="mobile-web-app-capable" content="yes" />

                    {/* 🍭 META EYE CANDY */}
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/logo/favicon.png" />
                    <meta name='og:image' property='og:image' content='/static/logo/dark_banner.png' />

                    {/* 💅🏻 FONTS */}
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet" />
                    
                    {/* 🔌 PLUGS */}
                    { this.defaultHelmet }
                    { this.helmetHeadComponents }
                    { this.props.styles }
                    { this.plugins }

                </head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}