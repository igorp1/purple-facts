// LIB
import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { animateScroll } from 'react-scroll'
import styled, { css, keyframes } from 'styled-components'

// COMPONENTS
import { Dot } from './_common';
import Emoji from './Emoji';
import { colorConfirm, colorPrimary, colorPrimaryLight, shadowL, colorError } from './_theme';

// SERVICE
import UserService from '../services/userService';
import { isEmail, isPhoneNumber } from '../services/helpers';

/***************************

    MainContainer 
    +---------------------------+    ^
    |   |                   |   |    |
    | . | ChatBotInterface  | . |  100vh
    |   |                   |   |    |
    +---------------------------+    v
    < - - - - - 100vw - - - - - >

    ChatBotInterface
    +---------------------------+    ^
    |             .             |   5vh >> DEFAULT_PADDING
    +---------------------------+    .
    |         HeaderBar         |    >> HEADER_BAR_FULL/HEADER_BAR_MOBILE
    +---------------------------+    .
    |      ScrollableWindow     |    >> calculated 80vh - HEADER_BAR - USER_BAR
    +---------------------------+    .
    |     UserInteractionBar    |    >> USER_BAR_FULL/USER_BAR_MOBILE
    +---------------------------+    .
    |             .             |   5vh
    +---------------------------+    v >> total : 
    < - - - - - 100vw - - - - - >


/***************************/

const DEFAULT_PADDING = '5vh'
const HEADER_BAR_FULL = '45px'
const HEADER_BAR_MOBILE = '40px'
const USER_BAR_FULL = '50px'
const USER_BAR_MOBILE = '50px'

// STYLES : MAIN CONTAINERS
const MainContainer = styled.div`

    display: grid;
    height: 100vh;
    grid-template-areas : ". conversation .";
    grid-template-columns : 1fr 5fr 1fr;
    @media all and (max-width: 895px) {
        grid-template-columns : 1fr 8fr 1fr;
    }
    @media all and (max-width: 700px) {
        grid-template-columns : 1fr 20fr 1fr;
    }
`

const ChatBotInterface = styled.div`
    max-height:100%;
    grid-area: conversation;
    padding: ${DEFAULT_PADDING} 0;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: ${HEADER_BAR_MOBILE} auto ${USER_BAR_MOBILE};
    grid-template-areas: "header" "convo" "user"; 

    @media all and (min-width: 500px) {
        grid-template-rows: ${HEADER_BAR_FULL} auto ${USER_BAR_FULL};
    }

`

// SYLES : INTERFACE CONTAINERS
const HeaderBar = styled.div`
    width: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    border: 1px solid rgba(0,0,0,.3);   
    border-radius: 8px; 
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;

    background-color: rgba(255,255,255,1);

    .bot-image{
        height: 100%;
        width: 50px;
        text-align: center;
        img{
            height: 100%;
            background-color: white;
            border-radius: 100%;
        }
    }
    .info{
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-transform: uppercase;
        font-weight: bolder;
        font-size: 0.7em;
    }
    
`

const UserFreeInputContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 5px;
    .input-validation-warn{
        position: absolute;
        color: ${colorError};
        margin-top: -1.6em;
        font-size:0.8em;
    }
    .form-div{
        background-color: white;
        height:100%;
        border-radius: 12px;
        display: grid;
        grid-template-areas: "input go";
        grid-template-columns: auto 45px;
        box-shadow: ${shadowL};
        input{
            padding:0;
            padding-left: 8px;
            font-size: 1em;
            margin-left: 5px;
            background-color: transparent;
            border: none;
        }
        .go-container{
            display: flex;
            justify-content: center;
            align-items: center;
            button{
                height:28px;
                box-sizing:border-box;
                padding:0;
                width:30px;
                background-color: #171717;
                color: white;
                border-radius: 20px;
                border-bottom-right-radius: 3px;
            }
        }
    }
`

const UserInteractionBar = styled.div`

    border: 1px solid rgba(0,0,0,.3);   
    border-top: none;
    border-radius: 8px; 
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;

    background-color: rgba(255,255,255,0.9);

    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;

    flex-wrap: nowrap;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;    

`

const ScrollableWindow = styled.div`
    overflow: scroll;
    border: 1px solid rgba(0,0,0,.3);   
    box-sizing: border-box;
    border-top: none;
    border-bottom: none;
    padding-bottom: 30px;
    padding-top: 10px;
    background-color: rgba(255,255,255,0.9);
    height: calc(100vh - ${DEFAULT_PADDING} - ${DEFAULT_PADDING} - ${HEADER_BAR_MOBILE} - ${USER_BAR_MOBILE});

    @media all and (min-width: 500px) {
        height: calc(100vh - ${DEFAULT_PADDING} - ${DEFAULT_PADDING} - ${HEADER_BAR_FULL} - ${USER_BAR_FULL});
    }

    &::-webkit-scrollbar { 
        display: none; 
    }

`

const ConvoContainer = styled.div`
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    background-color: rgba(255,255,255,0.9);
`

// STYLES : UI COMPONENTS
const showTextBalloon = keyframes`    
  0%{
	opacity: 0;
	transform: scale(.25);
  }
  40%{
	opacity: .5;
	transform: scale(0.5);
  }
  70%{
	opacity: .75;
	transform: scale(0.75);
  }
  100%{
	opacity: 1;
	transform: scale(1);
  }
`

const BubbleOptionsContainer = styled.div`
height: 100%;
width: 100%;
.flex-container{
    overflow:auto;
    height: 100%;
    display:flex;
    flex-direction: row-reverse;
    align-items: center;
    box-sizing: border-box;   
    span:last-child{
        color: transparent;
    }    
}
`

const OptionBubble = styled.span`
    cursor:pointer;
    margin-right: 12px;
    padding: 2px 8px;
    border-radius: 10px;
    border-bottom-right-radius: 2px;
    white-space: nowrap;

    font-size: 15px;
    box-shadow: ${shadowL};
    border: solid 1px #171717;
    animation: ${showTextBalloon} 0.2s ease-in 0s 1 normal;

    ${props => props.highlight && css`
        border-color: ${colorPrimary};
        background-color: ${colorPrimaryLight};
    `}
    user-select: none !important; 
`

const ConvoRow = styled.div`
    display:flex;
    margin: 3px 10px;
    ${props => props.side && props.side==='left' && css`
        justify-content: flex-start;
    `}
    ${props => props.side && props.side==='right' && css`
        justify-content: flex-end;
    `}
`


const Balloon = styled.div`

    border-radius: 20px;
    width: fit-content;
    max-width: 60%;
    padding: 7px 20px;
    text-align: center;
    display: inline-block;
    background-color: #313131;
    color: whitesmoke;
    animation: ${showTextBalloon} 0.2s ease-in 0s 1 normal;

    
    h1{margin:0;font-size: 20px;}
    h2{margin:0;font-size: 17px;}
    span{font-size: 15px;}

    @media all and (min-width: 500px) {
        h1{font-size: 20px;}
        h2{font-size: 17px;}
        span{font-size: 15px;}
    }

    @media all and (min-width: 900px) {
        h1{font-size: 23px;}
        h2{font-size: 19px;}
        span{font-size: 17px;}
    }

    ${props => props.side && props.side==='left' && css`
        border-top-left-radius: 4px;
        background-color: #e8e8e8;
        color: black;
        text-align: left;
    `}
    ${props => props.side && props.side==='right' && css`
        border-top-right-radius: 4px;
        background-color: #313131;
        color: whitesmoke;
        text-align: right;
    `}    

    ${props => props.transparent && css`
        background-color: transparent;
        font-size: 20px;
        padding-left: 5px;
    `}

    ${props => props.color && css`
        background-color: ${props.color};
    `}
    ${props => props.highlight && css`
        background-color: ${colorPrimary};
        color: white;
    `}
    
    ${props => props.img && css`
        background-image : url('${props.img}');
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;    
    `}

`

const CommonUserOptions = {
    'name' : (nextStep) => { return {
        type: 'input',
        dataKey: 'name',
        inputPlaceholder : 'your name',
        oninputSubmit : nextStep,
        inputValidation : (name) => {return name.length > 0},
        inputValidationWarning : 'Please make sure you enter your name',
        addInputResponseToConvo : (name) => <span>Nice to meet you, {name} <Emoji name='smile'/></span>,
    }},
    'email' : (nextStep) => { return {
        type: 'input',
        dataKey: 'email',
        inputPlaceholder : 'your email',
        oninputSubmit : nextStep,
        inputValidation : (email) => {return isEmail(email) },
        inputValidationWarning : 'Please make sure you enter a valid email',
    }},
    'phone' : (nextStep) => { return {
        type: 'input',
        dataKey: 'phone',
        inputPlaceholder : 'your phone number',
        oninputSubmit : nextStep,
        inputValidation : (number) => {return isPhoneNumber(number)  },
        inputValidationWarning : 'Please make sure you enter a valid phone number',
    }}

}


class Chatbot extends React.Component {

    // MODELS
    // *****************************
    SavedConvoModels =  {
        'seller-lead-1' : {

            // ====== GREET======
            'initial' : {
                botSays : [
                    <span>Hi!</span>,
                    <span>Carol and Isaiah just recently sold their home to us!</span>,
                    { convoObjItem: 'img', content: '/static/testimonial/sold/martha-isaiah.jpg' },
                    { convoObjItem : 'highlight', content: <h2>I'm here to help you get a quote on your house.</h2> },
                    <span>It's super easy and totally free! Ready to give it a try?</span>,
                    { convoObjItem: 'helper-arrow' }
                ],
                userOptions : {
                    options :[
                        { txt: `I want my property quote!`, highlight:true, leadsTo: 'get-quote-1' },
                        { txt: `I'm not ready yet`, leadsTo: 'not-ready' },
                    ]
                }
            },  
        
            // ====== USER INNTENT ======
            'not-ready' : {
                botSays : [
                    <span>I understand. What can I help you with?</span>
                ],
                userOptions : {
                    options :[
                        { txt: `I want to know how this works first`, leadsTo: 'how-it-works-1' },
                        { txt: `I want to speak to a person`, leadsTo: 'talk-to-human' },
                    ]
                }
            },
            'talk-to-human' :{
                botSays : [
                    <span>Sounds good!</span>,
                    <span>What's the best way for us to connect?</span>
                ],
                userOptions : {
                    dataKey: 'contactMethod', 
                    options :[
                        { txt: `Email`, leadsTo: 'contact-email-1'},
                        { txt: `Text/SMS`, leadsTo: 'contact-text-1' },
                        { txt: `Call`, leadsTo: 'contact-call-1' },
                        { txt: `Online Chat`, leadsTo: 'contact-chat' },
                    ]
                }
            },
        
            // ====== CONTACT : CHAT ======
            'contact-chat' : {
                botSays : [
                    <span>You can get started with your message on the chat below.</span>,
                    <span>Our account manager, Igor, will be with you shortly!</span>
                ],
                executeAction : () => {
                    setTimeout(()=>{ Tawk_API.maximize() }, 2500)
                },
                triggerDone : 'contact-chat'
            },
        
            // ====== CONTACT : EMAIL ======
            'contact-email-1' : {
                botSays : [
                    <span>Great!</span>, 
                    <span>What's your name?</span>
                ],
                userOptions : CommonUserOptions.name('contact-email-2')
            },
            'contact-email-2' : {
                botSays : [
                    <span>What's your email?</span>
                ],
                userOptions : CommonUserOptions.email('contact-email-done')
            },
            'contact-email-done' : {
                botSays : [
                    <span>Thank you!</span>
                ],
                triggerDone : 'contact-email'
            },
        
            // ====== CONTACT : TEXT ======
            'contact-text-1' : {
                botSays : [
                    <span>Great!</span>, 
                    <span>What's your name?</span>
                ],
                userOptions : CommonUserOptions.name('contact-text-2')
            },
            'contact-text-2' : {
                botSays : [
                    <span>What's your mobile number?</span>
                ],
                userOptions :  CommonUserOptions.phone('contact-text-3')
            },
            'contact-text-3' : {
                botSays : [
                    <span>Great!</span>,
                    <span>One last thing...</span>,
                    <span>What's your email?</span>
                ],
                userOptions : CommonUserOptions.email('contact-text-done')
            },
            'contact-text-done' : {
                botSays : [
                    <span>Perfect, you are all set!</span>,
                    <span>Our account manager, Igor, will text you shortly!</span>,  
                    <span>Thank you!</span>
                ],
                triggerDone : 'contact-text'
            },
        
            // ====== CONTACT : CALL ======
            'contact-call-1' : {
                botSays : [
                    <span>Great!</span>, 
                    <span>What's your name?</span>
                ],
                userOptions : CommonUserOptions.name('contact-call-2')
            },
            'contact-call-2' : {
                botSays : [
                    <span>What's your phone number?</span>
                ],
                userOptions :  CommonUserOptions.phone('contact-call-3')
            },
            'contact-call-3' : {
                botSays : [
                    <span>When is the best time for us to call?</span>
                ],
                userOptions : {
                    type: 'options',
                    dataKey: 'callOption',
                    options: [
                        { txt: `Now!`, leadsTo: 'contact-call-now' },
                        { txt: `Later`, leadsTo: 'contact-call-schedule-1' },
                    ]
                }
            },
        
            // ====== CONTACT : CALL NOW ======
            'contact-call-now' : {
                botSays : [
                    <span>Great!</span>,
                    <span>One last thing...</span>,
                    <span>What's your email?</span>
                ],
                userOptions : CommonUserOptions.email('contact-call-now-done')
            },
            'contact-call-now-done' : {
                botSays : [
                    <span>Perfect, you are all set!</span>,
                    <span>Our account manager, Igor, will give you a call shortly!</span>,  
                    <span>Thank you!</span>
                ],
                triggerDone : 'contact-call-now'
            },
        
            // ====== CONTACT : CALL SCHEDULED ======
            'contact-call-schedule-1' : {
                botSays : [
                    <span>All good!</span>,
                    <span>When would it be a good time for us to call?</span>
                ],
                userOptions : {
                    type: 'input',
                    dataKey: 'scheduleCallDateTime',
                    inputPlaceholder : 'date/time for the call',
                    oninputSubmit : 'contact-call-schedule-2',
                    inputValidation : (str) => {return str.length>0},
                    inputValidationWarning : 'Please make sure you enter a time',
                    addInputResponseToConvo : (when) => <span>That works! We'll reach out <span style={{textTransform:'lowercase'}}>{when}</span></span>
                }
            },
            'contact-call-schedule-2' : {
                botSays : [
                    <span>One last thing...</span>,
                    <span>What's your email?</span>
                ],
                userOptions : CommonUserOptions.email('contact-call-schedule-done')
            },
            'contact-call-schedule-done' : {
                botSays : [
                    <span>Perfect, you are all set!</span>,
                    <span>Our account manager, Igor, will give you a call!</span>,
                    <span>Thank you!</span>
                ],
                triggerDone : 'contact-call-scheduled'
            },
        
            // ====== LEARN MORE ======
            'how-it-works-1' : {
                botSays : [
                    <span>First we need to learn some basic information about your property</span>
                ],
                userOptions : {
                    options :[
                        { txt: `Like what?`, leadsTo: 'how-it-works-2' },
                        { txt: `Makes sense!`, leadsTo: 'how-it-works-2' },
                    ]
                }
            },
            'how-it-works-2' : {
                botSays : [
                    <span>We look at comparable properties in the neighborhood to appraise yours</span>,
                    <span>We consider your property's conditions to estimate the repair and modernization cost</span>,
                    <span>We must take into account any debt on the property, like back taxes and remaining mortgage payments.<br/>You are not going to have to worry about that.</span>
                ],
                userOptions : {
                    options :[
                        { txt: `How does that work?`, leadsTo: 'how-it-works-3' },
                        { txt: `What comes next?`, leadsTo: 'how-it-works-next' },
                    ]
                }
            },
            'how-it-works-3' : {
                botSays : [
                    (<span>You can fill out <a href="/resources/request-property-quote">this form</a></span>),
                    <span>Or reach out to our account managers on <a href="mailto:contact@purplefacts.com">contact@purplefacts.com</a></span>,
                    <span>Or I can help you get started!</span>
                ],
                userOptions : {
                    options :[
                        { txt: `Got it, what comes next?`, leadsTo: 'how-it-works-next' },
                        { txt: `I'm ready to get my property quote`, highlight:true, leadsTo: 'get-quote-1' },
                    ]
                }
            },
            'how-it-works-next' : {
                botSays : [
                    <span>Once we have your property information, we can get started on research.</span>,
                    <span>We'll then reach out with a quote.</span>,
                    <span>If you decide to move forward, we can close within 7 days in most cases.</span>,
                    <span>You can read more about it in detail below!</span>,
                ],
                userOptions : {
                    options :[
                        { txt: `I'm ready to get my property quote`, highlight:true, leadsTo: 'get-quote-1' },
                        { txt: `I don't want to do this now.`, leadsTo: 'need-time-1' },
                        { txt: `I want to speak to a person.`, leadsTo: 'talk-to-human' },
                    ]
                }
            },
        
            // ====== SIMPLE SIGNUP ======
            'need-time-1' : {
                botSays : [
                    <span>No worries! We'd like to follow up, if that works for you.</span>, 
                    <span>What's your name?</span>
                ],
                userOptions : CommonUserOptions.name('need-time-2')
            },
            'need-time-2' : {
                botSays : [
                    <span>What's your email?</span>
                ],
                userOptions : CommonUserOptions.email('need-time-done')
            },
            'need-time-done' : {
                botSays : [
                    <span>Thank you!</span>,
                    <span>We'll send you an email shortly to help you get started.</span>,
                    <span>If you have any questions don't hesitate to <a href="/contact">reach out</a></span>
                ],
                triggerDone : 'simple-signup'
            },
        
            // ====== GET QUOTE ======
            'get-quote-1' : {
                botSays : [
                    <span>Awesome!</span>, 
                    <span>What's your name?</span>
                ],
                userOptions : CommonUserOptions.name('get-quote-2')
            },
            'get-quote-2' : {
                botSays : [
                    <span>And what's your email?</span>
                ],
                userOptions : CommonUserOptions.email('get-quote-3')
            },
            'get-quote-3' : {
                botSays : [
                    <span>Thank you</span>,
                    <span>What's the property's address?</span>
                ],
                userOptions : {
                    type: 'input',
                    dataKey: 'propertyAddress',
                    inputPlaceholder : 'property address',
                    oninputSubmit : 'get-quote-4',
                    inputValidation : (val) => {return val.length > 0},
                    inputValidationWarning : 'Please make sure you enter the property\'s address'
                }
            },
            'get-quote-4' : {
                botSays : [
                    <span>Ok!</span>,
                    <span>Just to make sure...</span>,
                    <span>What's the city and state?</span>
                ],
                userOptions : {
                    type: 'input',
                    dataKey: 'cityState',
                    inputPlaceholder : 'city, state',
                    oninputSubmit : 'get-quote-5',
                    inputValidation : (val) => {return val.length > 0},
                    inputValidationWarning : 'Please make sure you enter the city and state'
                }
            },
            'get-quote-5' : {
                botSays : [
                    <span>Thanks!</span>,
                    <span>What's your ideal quote?</span>
                ],
                userOptions : {
                    type: 'input',
                    dataKey: 'requestedQuote',
                    inputPlaceholder : 'your ideal quote ($)',
                    oninputSubmit : 'get-quote-6',
                    inputValidation : (val) => {return val.length > 0},
                    inputValidationWarning : 'Please make sure you enter your ideal quote'
                }
            },
            'get-quote-6' : {
                botSays : [
                    <span>Ok, we'll keep that in mind</span>,
                    <span>How would you describe the overall property conditions?</span>
                ],
                userOptions : {
                    type: 'options',
                    dataKey: 'propertyConditions',
                    options: [
                        {txt: 'modern', leadsTo:'get-quote-7'},
                        {txt: 'needs some work', leadsTo:'get-quote-7'},
                        {txt: 'needs a lot of work', leadsTo:'get-quote-7'},
                        {txt: 'needs a full rehab', leadsTo:'get-quote-7'},
                    ]
                }
            },
            'get-quote-7' : {
                botSays : [
                    <span>Noted!</span>,
                    <span>Is there any debt on the property?</span>,
                    <span>That includes mortgages, back taxes, violations, etc</span>,
                    <span>Really, any type of financial responsibility that falls upon the owner.</span>
                ],
                userOptions : {
                    type: 'options',
                    dataKey: 'hasPropertyDebt',
                    options: [
                        {txt: 'Yes', leadsTo:'get-quote-7-1'},
                        {txt: 'Maybe', leadsTo:'get-quote-7-1'},
                        {txt: 'No', leadsTo:'get-quote-8'},
                    ]
                }
            },
            'get-quote-7-1' : {
                botSays : [
                    <span>That's totally fine!</span>,
                    <span>If you decide to work with us, we'll be responsible for that.</span>,
                    <span>How much are we talking about?</span>
                ],
                userOptions : {
                    type: 'input',
                    dataKey: 'propertyDebt',
                    inputPlaceholder : 'property debt ($)',
                    oninputSubmit : 'get-quote-8',
                    inputValidation : (val) => {return val.length > 1},
                    inputValidationWarning : 'Please make sure you enter your the amount of debt'
                }
            },
            'get-quote-8' : {
                botSays : [
                    <span>Last thing!</span>,
                    <span>Is there anything else, you'd like us to know?</span>
                ],
                userOptions : {
                    type: 'options',
                    options: [
                        {txt: 'Yes', leadsTo:'get-quote-9'},
                        {txt: 'No', leadsTo:'get-quote-done'},
                    ]
                }
            },
            'get-quote-9' : {
                botSays : [
                    <span>I'll make sure to let your account manager know.</span>
                ],
                userOptions : {
                    type: 'input',
                    dataKey: 'notes',
                    inputPlaceholder : 'your notes',
                    oninputSubmit : 'get-quote-done',
                    inputValidation : (val) => {return val.length > 0},
                    inputValidationWarning : 'Please make sure you enter your notes'
                }
            },
            'get-quote-done' : {
                botSays : [
                    <span>Sounds good, you are all set!</span>,
                    <span>Our account manager, Igor, will send you an email soon.</span>,
                    <h2>Thank you</h2>
                ],
                triggerDone : 'quote-requested'
            }
        },
        'demo' : {
            'initial' : {
                botSays : [
                    <span>Hi! I'm the Purple Fact's chatbot.</span>
                ],
                userOptions : {
                    options :[
                        { txt: `I'm highlighted, click me!`, highlight:true, leadsTo: 'step-1-h' },
                        { txt: `What can you do?`, leadsTo: 'step-1' },
                    ]
                }
            },  
            'initial-again' : {
                botSays : [
                    <span>Hi again! I'm the Purple Fact's chatbot.</span>
                ],
                userOptions : {
                    options :[
                        { txt: `I'm highlighted, click me!`, highlight:true, leadsTo: 'step-1-h' },
                        { txt: `What can you do?`, leadsTo: 'step-1' },
                    ]
                }
            },  
            'step-1' : {
                botSays : [
                    <span>I was built to engage user with simple and engaging conversation flows.</span>,
                    <span>By customizing my backend you can have multiple conversation branches and outcomes.</span>,
                ],
                userOptions : {
                    options :[
                        { txt: `I want to try!`, leadsTo: 'step-2' }
                    ]
                }
            },
            'step-1-h' : {
                botSays : [
                    { convoObjItem : 'emoji', content: <span><Emoji name='tada' size='2em' c={3}/></span> },
                    <span>I was built to engage user with simple and engaging conversation flows.</span>,
                    <span>By customizing my backend you can have multiple conversation branches and outcomes.</span>,
                ],
                userOptions : {
                    options :[
                        { txt: `I want to try!`, leadsTo: 'step-2' }
                    ]
                }
            },
            'step-2' : {
                botSays : [
                    <span>What would you like to see?</span>
                ],
                userOptions : {
                    options :[
                        { txt: `Show me a cool image`, leadsTo: 'img' },
                        { txt: `What's your name?`, leadsTo: 'name' },
                        { txt: `How do I get this on my site?`, leadsTo: 'ready' },
                    ]
                }
            },
            'img' : {
                botSays : [
                    { convoObjItem: 'img', content: 'https://cdn.dribbble.com/users/102505/screenshots/3638176/elixir_final_db.gif' },
                    <span>Cool right!</span>,
                    <span>What about something more interactive?</span>
                ],
                userOptions : {
                    options :[
                        { txt: `Sure! What's your name?`, leadsTo: 'name' },
                    ]
                }
            },
            'name' : {
                botSays : [
                    <span>My name is PB!</span>, 
                    <span>What's your name?</span>
                ],
                userOptions : CommonUserOptions.name('get-started'),
            },
            'get-started' : {
                botSays : [
                    <span>You can ask all sorts of questions to engage your clients!</span>,
                ],
                userOptions : {
                    options: [
                        { txt: `How do I get started?`, leadsTo: 'ready' },
                        { txt: `I want to try this conversation again`, leadsTo: 'ready' },
                    ]
                }
            },
            'ready' : {
                botSays : [
                    <span>It's really simple! just <Link href='/get-started'><a>click on this link</a></Link></span>,
                    <span>Would you like to try this again?</span>
                ],
                userOptions : {
                    options: [
                        { txt: `Yes!`, leadsTo: 'initial-again' },
                    ]
                }
            }




        },
        'register' : {

            'initial' : {
                botSays : [
                    <span>Hi!</span>,
                    <span>The first step of our on boarding process is to sign you up for a short introductory call.</span>,
                    <span>The call is commitment free and doesn't cost anything.</span>,
                    <span>Are you ready to start?</span>
                ],
                userOptions : {
                    options :[
                        { txt: `Yes!`, highlight:true, leadsTo: 'register-1' },
                        { txt: `Not yet`, leadsTo: 'not-ready' },
                    ]
                }
            },
            'not-ready' : {
                botSays : [
                    <span>I understand</span>,
                    <span>How can I help?</span>,
                ],
                userOptions : {
                    options :[
                        { txt: `What is the call for?`, leadsTo: 'call-info' },
                        { txt: `I need more information`, leadsTo: 'information' },
                    ]
                }
            },
            

            // ====== BASIC INFO ======
            'call-info' : {
                botSays : [
                    <span>The introductory call lets us gather information about your expectations and needs.</span>,
                    <span>If all goes well and you'd like to move forward, we setup your Purple Facts environment.</span>,
                    <span>With the environment setup we’ll schedule a training session to walk you through all admin features and how to best take advantage of the platform.</span>
                ],
                userOptions : {
                    options :[
                        { txt: `That makes sense, let's start`, leadsTo: 'register-1' },
                    ]
                }
            },
            'information' : {
                botSays : [
                    <span>The most thorough resource we have is our platform guidebook.</span>,
                    <span>I recommend downloading that!</span>
                ],
                userOptions : {
                    options : [
                        { txt: `Sounds good!`, leadsTo: 'download-1' },
                        { txt: 'No, thank you', leadsTo: 'info-list' }
                    ]
                }
            },
            'info-list' : {
                botSays : [
                    <span>Ok, here's some useful links:</span>,
                    <span>If you want to learn more about our company go to the <Link href='/about'><a>about page</a></Link>.</span>,
                    <span>To play around with our favorite features and learn more about our platform go to the <Link href='/products/features'><a>features page</a></Link>.</span>,
                    <span>To learn about pricing and products go to the <Link href='/products'><a>products page</a></Link>.</span>
                ], 
                userOptions : {
                    options : [
                        { txt: `I'm ready to register`, leadsTo: 'register-1' },
                        { txt: `I want the guidebook`, leadsTo: 'download-1' },
                    ]
                }
            },

            // ====== DONWLOAD ======
            'download-1' : {
                botSays : [
                    <span>Nice! First I need your email, is that ok?</span>,
                ],
                userOptions : {
                    options : [
                        { txt: `Of course!`, leadsTo: 'download-2' },
                        { txt: `No, thanks`, leadsTo: 'info-list' },
                    ]
                }
            },
            'download-2' : {
                botSays : [
                    <span>Ready when you are</span>,
                ],
                userOptions : CommonUserOptions.email('download-3')
            },
            'download-3' : {
                botSays : [
                    <span>Thank you!</span>,
                    <span><a href='/static/files/PurpleFacts - Product Guidebook.pdf' target='_blank'>Here's your download link!</a></span>,
                    <span>Let me know if you are ready to get started!</span>
                ],
                userOptions : {
                    options : [
                        { txt: `I'm ready to start!`, leadsTo: 'register-1' },
                    ]
                }
            },

            // ====== REGISTER ======
            'register-1' : {
                botSays : [
                    <span>Let's get started!</span>,
                    <span>What's your name?</span>   
                ],
                userOptions : CommonUserOptions.name('register-2')
            },
            'register-2' : {
                botSays : [
                    <span>What's your email?</span>   
                ],
                userOptions : CommonUserOptions.email('register-3')
            },
            'register-3' : {
                botSays : [
                    <span>When would it be a good time to have a 15-30 minute call?</span>
                ],
                userOptions : {
                    type: 'input',
                    dataKey: 'schedule-request',
                    inputPlaceholder : 'day - time',
                    oninputSubmit : 'register-done',
                    inputValidation : (schedule) => {return schedule.length > 0},
                    inputValidationWarning : 'Please make sure you enter a suggested time.',
                
                }
            },
            'register-done' : {
                botSays : [
                    <span>That's it! <Emoji name='tada' /></span>,
                    <span><a href='mailto:igor@purplefacts.com'>Igor</a> will reach out soon to confirm your call.</span>,
                    <span>Thank you!</span>
                ],
                triggerDone : 'user-registered'
            }


        }
    }
    
    // INIT
    // *****************************
    conversationModel = {}
    state = {
        currentConvoStep : '',
        conversation : [],
        userOptions : {},
        currentUserInput : '',
        savedUserData : {}
    }

    componentDidMount(){
        this.initModel(this.props.initialStep )
    }
    
    initModel = (initialStep='initial') => { 
        this.conversationModel = this.SavedConvoModels[this.props.model]
        this.setupNextConvoStep(initialStep)
    }


    // STATE CONTROL : currentConvoStep
    // *****************************
    setupNextConvoStep = (convoStepID, userConvoItems=[]) => {

        // get next step
        const nextStep = this.conversationModel[convoStepID]
        if(!nextStep) return 

        // put up convo items
        const upcomingConvoItems = [...userConvoItems, ...nextStep.botSays.map(txt=>{return{txt, from:'bot'}}) ]
        this.addToConversation( upcomingConvoItems )

        // get previous step
        const previousConvoStepKey = this.state.currentConvoStep
        if(previousConvoStepKey === 'initial') this.logConvoStarted(userConvoItems[0].txt)

        // set current convo step
        this.setState({currentConvoStep:convoStepID})

        if(nextStep.executeAction) nextStep.executeAction()

        if(nextStep.triggerDone){ this.logConvoEnded(nextStep.triggerDone) }

        // show new user options =>
        if(nextStep.userOptions){
            const userOptionDelay = 800*(upcomingConvoItems.length )+400
            setTimeout(()=>{ this.showUserOptions(nextStep.userOptions) }, userOptionDelay)
        }

    }


    // USER TRIGGERED
    // *****************************    
    submitInputValue = () => {

        // validate input 
        if( !this.state.userOptions.inputValidation(this.state.currentUserInput) ){
            this.setState({inputValidationWarning:this.state.userOptions.inputValidationWarning})
            return 
        }

        // remove current userOptions
        const savedState = Object.assign({}, this.state)
        this.removeCurrentOptions()

        // prepare nextConvoItems
        let nextConvoItems = [ { txt: savedState.currentUserInput, from:'human'} ] 
        if(savedState.userOptions.addInputResponseToConvo){
            nextConvoItems.push({ txt: savedState.userOptions.addInputResponseToConvo(savedState.currentUserInput) , from:'bot' })
        }

        // setup convo step
        this.setupNextConvoStep(savedState.userOptions.oninputSubmit, nextConvoItems)

        // update user data
        if(savedState.userOptions.dataKey){
            this.updateUserData( savedState.userOptions.dataKey, savedState.currentUserInput )
            this.serverDataUpdate(savedState.savedUserData)
        }
        
    }

    selectOption = (option) => {

        // remove current options
        const savedState = Object.assign({}, this.state)
        this.removeCurrentOptions()

        // prepare nextConvoItems
        const nextConvoItems = [ { txt: option.txt, from:'human' } ]

        // setup convo step
        this.setupNextConvoStep(option.leadsTo, nextConvoItems)

        // update user data
        if(savedState.userOptions.dataKey){
            this.updateUserData( savedState.userOptions.dataKey, option.txt )
            this.serverDataUpdate(this.state.savedUserData)
        }

    }


    // STATE CONTROL : conversation
    // *****************************
    addToConversation = (convoItems) => {
        convoItems.map( (x,i) => setTimeout(()=>{this.pushToConvoArray(x)}, 800*i ) )
    }

    pushToConvoArray = (convoItem) => {
        if(!this.state) return
        let state = this.state
        state.conversation.push(convoItem)
        this.setState(state)
        this.scrollConvoContainerToBottom()
    }


    // STATE CONTROL : userOptions
    // *****************************
    removeCurrentOptions = () => {
        this.setState({
            userOptions:{},
            inputValidationWarning : '',
            currentUserInput : ''
        }) 
    }

    showUserOptions = (userOptions) => {
        this.setState({userOptions})
        if(userOptions.type === 'input'){
            document.getElementById('user-input').focus()
        }
    }


    // STATE CONTROL : savedUserData
    // *****************************
    updateUserData = (key, value) => {
        let savedUserData = this.state.savedUserData
        this.state.savedUserData[key] = value 
        this.setState({savedUserData})
    }


    // TALK TO SERVER
    // *****************************
    serverDataUpdate = (data) => {
        if(this.state.savedUserData != data) throw 'The data obect passed to `serverDataUpdate` must match `this.state.savedUserData`'
        UserService.updateUserData(data)
    }

    logConvoStarted = (choice) => {
        const lastUserChoice = this.state.conversation[this.state.conversation.length-1].txt
        UserService.logEvent('startBotConversation', { choice })
    }

    logConvoEnded = (outcome) => {
        UserService.logEvent('botConversationDone', { outcome })
    }

    // UI CONTROLS
    // *****************************
    scrollConvoContainerToBottom = () => {
        if(!document.getElementById('convo-container')) return
        animateScroll.scrollToBottom({ containerId: "convo-container" });
    }

    detectUserInputChange = (e) => {
        this.setState({currentUserInput: e.target.value})
        this.scrollConvoContainerToBottom()
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.submitInputValue()
        }
    }

    scrollToTypePosition = () => {
        this.scrollConvoContainerToBottom()
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            animateScroll.scrollTo(document.getElementById('input-container').offsetTop - h*0.45 )
        }
    }


    // HEADER BAR
    // *****************************
    get header() {
        return (
            <HeaderBar>
                <div className="bot-image">
                    <img src="/static/resource-icons/chatbot.svg" />
                </div>
                <div className="info">
                    <span><Dot color={colorConfirm} /> CHATBOT ONLINE</span>
                </div>
            </HeaderBar>
        )
    }


    // CONVERSATION AREA
    // *****************************
    get conversation(){
        return (
            <ScrollableWindow id="convo-container" style={{height:`calc(${this.props.height} - ${DEFAULT_PADDING} - ${DEFAULT_PADDING} - ${HEADER_BAR_MOBILE} - ${USER_BAR_MOBILE})`}}>
                <ConvoContainer>
                    { this.state.conversation.map(this.renderConvoRow) }
                </ConvoContainer>
            </ScrollableWindow>
        )
    }

    renderConvoRow = (convoItem, i) => {
        switch(convoItem.txt.convoObjItem){
        case 'emoji':
            return (
                <ConvoRow key={i} side={ convoItem.from==='bot' ? 'left' : 'right' }>   
                    <Balloon style={{backgroundColor:'transparent', paddingLeft: '0.5em'}} side={ convoItem.from==='bot' ? 'left' : 'right' }>{
                        convoItem.txt.content
                    }</Balloon> 
                </ConvoRow>
            )
        case 'img':
            return (
                <ConvoRow key={i} side={ convoItem.from==='bot' ? 'left' : 'right' }>   
                    <Balloon alt={`Conversation Image: ${convoItem.txt.content}`} img={convoItem.txt.content} side={ convoItem.from==='bot' ? 'left' : 'right' }></Balloon> 
                </ConvoRow>
            )
        case 'highlight':
            return (
                <ConvoRow key={i} side={ convoItem.from==='bot' ? 'left' : 'right' }>
                    <Balloon highlight side={ convoItem.from==='bot' ? 'left' : 'right' }>{convoItem.txt.content}</Balloon> 
                </ConvoRow>
            )
        case 'helper-arrow':
            return <ConvoRow key={i} side="right">
                <img alt='pointing to call to action' src="/static/resource-icons/point-finger.png" height="80px" style={{marginRight:'15px', marginTop:'15px'}} />
            </ConvoRow>
        default:
            return (
                <ConvoRow key={i} side={ convoItem.from==='bot' ? 'left' : 'right' }>
                    <Balloon side={ convoItem.from==='bot' ? 'left' : 'right' }>{convoItem.txt}</Balloon> 
                </ConvoRow>
            )
        }
    }


    // USER INTERACTION BAR
    // *****************************
    get userInteraction() {
        return (
            <UserInteractionBar id="input-container">
                {Object.keys(this.state.userOptions || {}).length ?
                    this.state.userOptions.type === 'input' ? 
                        this.renderInput : 
                        this.renderOptions
                : this.renderIdle}    
            </UserInteractionBar>
        )
    }

    get renderInput(){ 
        return (
            <UserFreeInputContainer onClick={this.scrollToTypePosition} >
                <span className="input-validation-warn">{this.state.inputValidationWarning}</span>
                <form style={{height:'100%'}} ><div className="form-div">
                    <input autoComplete="off" id="user-input" type="text" placeholder={ this.state.userOptions.inputPlaceholder} value={this.state.currentUserInput} onChange={this.detectUserInputChange} onKeyPress={this.handleKeyPress} />
                    <div className="go-container">
                        <button>
                            <i className="material-icons" onClick={this.submitInputValue}>arrow_upward</i>
                        </button>
                    </div>
                </div></form>
            </UserFreeInputContainer> 
        )
    }

    get renderOptions(){
        return (
            <BubbleOptionsContainer>{
                <div className="flex-container">{
                    this.state.userOptions.options.map( (x,i) => (
                        x.spacer ?
                        <span key={i}>&nbsp;</span>
                        : <OptionBubble key={i} highlight={x.highlight} onClick={()=>{ this.selectOption(x) }} >{x.txt}</OptionBubble>
                    ))
                }<span>Hi</span></div>
            }</BubbleOptionsContainer>
        )
    }

    get renderIdle(){
        return (
            <div style={{height: '100%', width:'100%', display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                <span style={{marginRight: '20px'}} >...</span>
            </div>
        )
    }


    // FULL RENDER
    // *****************************
    render(){
        return (
            <MainContainer  style={{height:this.props.height}}>
                <ChatBotInterface id="chatbot-interface">
                    {this.header}
                    {this.conversation}
                    {this.userInteraction}
                </ChatBotInterface>
            </MainContainer>
        )
    }

}

export default Chatbot
