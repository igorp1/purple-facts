// LIB
import React from 'react' 

// COMPONENTS
import { logos } from './_theme';

const JsonLd = ({json}) => (
    <div id='rich-data-snippet' dangerouslySetInnerHTML={ {__html: `<script type="application/ld+json">${JSON.stringify(json)}</script>` } } >
    </div>
)
export default JsonLd


export const JsonLdArticle = ({article}) => {

    return <JsonLd json={
        {
            "@context": "http://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://google.com/article"
            },
            "headline": article.title,
            "image": [
                article.thumb
            ],
            "datePublished": (new Date(article.created)).toISOString(),
            "dateModified": (new Date(article.created)).toISOString(),
            "author": {
                "@type": "Person",
                "name": `${ article.author || 'Igor de Paula' }`
            },
            "publisher": {
                "@type": "Organization",
                "name": "Purple Facts",
                "logo": {
                    "@type": "ImageObject",
                    "url": `https://purplefacts.com${logos.png.purple}`
                }
            },
            "description": article.summary
            }
    } />
}








