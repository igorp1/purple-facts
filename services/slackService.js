import fetch from 'isomorphic-unfetch'

export function reportBug() {
    pingSlack({
        fallback : `User reported a bug on ${window.location.href}`,
        color : '#DE2436',
        author_name : `User reported a bug`,
        author_icon : 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/lady-beetle_1f41e.png',
        title : window.location.href,
        title_link : window.location.href,
        ts : Math.floor(((new Date).getTime()) / 1000)
    })
}

export function pingSlack(payload) {
    const url = "https://hooks.slack.com/services/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";
    
    try{
        const res = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ attachments : [ payload ] })
        })
        return await res.json()
    }
    catch(e){
        console.log(e)
        return {}
    }
    
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = function() {
        if (xhr.status !== 200) console.error("Slack Hook failed");
    };
    
    xhr.send(JSON.stringify());
}
