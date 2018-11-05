var Tawk_API= Tawk_API || {}, Tawk_LoadStart=new Date();

Tawk_API.onChatStarted = function(){
    sendPayloadToSlackTawk({
        text : "🌱 Customer just started a chat! <https://dashboard.tawk.to/#/dashboard|Open Dashboard>"
    })
}

Tawk_API.onChatMaximized = function(){
    sendPayloadToSlackTawk({
        text : "👀 Customer just maximized the chat! <https://dashboard.tawk.to/#/dashboard|Open Dashboard>"
    })
};

Tawk_API.onChatEnded = function(){
    sendPayloadToSlackTawk({
        text : "🚨 Customer just ended a chat! <https://dashboard.tawk.to/#/dashboard|Open Dashboard>"
    })
}

Tawk_API.onLoad = () => {
    Tawk_API.minimize()
}

function sendPayloadToSlackTawk(payload){
    const url = "https://hooks.slack.com/services/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";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.error("Slack Hook failed");
        }
    };
    xhr.send(JSON.stringify(payload));
}

// LOAD TAWK ON PAGE
(
    function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5b4142cc4af8e57442dc6d41/default';
        s1.charSet='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    }
)();
