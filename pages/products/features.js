// LIB
import React from 'react'
import styled from 'styled-components'
import { CompactPicker } from 'react-color'

// COMPONENTS
import Emoji from '../../components/Emoji'
import Layout from '../../components/Layout'
import Chatbot from '../../components/Chatbot'
import { EVENTS } from '../../services/events'
import { PageContainer, PageTitle, Center, CompactContainer, CtaButton, ErrorSpan, TextImgGrid, TextImgRow, PaperDivider } from '../../components/_common'
import { colorLight, colorPrimary, transition, colorConfirm, shadowL, colorOffLight, colorOffDark, colorError } from '../../components/_theme'
import { generateID, isEmail } from '../../services/helpers';
import UserService from '../../services/userService';
import CtaCards from '../../components/CtaCards';


const Tabs = styled.div`
    display: flex;
    background-color: #2a2a2a;
    color: ${colorLight};
    border-radius: 4px;
    overflow-x: scroll;

    & > div{
        transition: ${transition};
        cursor: pointer;
        width:25%;    
        min-width: 175px;
        text-align: center;
        padding: 12px 0;

        &:hover, &.active{
            background-color: ${colorPrimary};
            color: ${colorLight};
        }

        &:nth-child(1){
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        &:nth-last-child(1){
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
        }

    }
`

const TabContent = styled.div`
    display: grid;
    grid-template-areas:  "ctrl content";
    grid-template-columns: 2fr 5fr;

    & > div:nth-child(1){
        grid-area: ctrl;
        padding: 1em;
    }
    & > div:nth-child(2){
        grid-area: content;
    }
    &.hidden{ display: none; }

    p{
        line-height: 1.8em;
    }


	@media all and (max-width: 800px){
		& {
            grid-template-areas:  "ctrl" "content";
            grid-template-columns: 1fr;
        }
	}

`

const SlackNotificationStyled = styled.div`
    display: grid;
    grid-template-columns: 50px auto;
    
`

const SlackMessageContainer = styled.div`
    display:grid;
    grid-template-columns: 5px auto;
    margin-top: 7px;
    &> div:nth-child(1){
        border-radius: 2px
    }
    &> div:nth-child(2){
        padding: 0 10px;
    }
`

const BrowserWindow = styled.div`
    border: solid 1px rgba(0,0,0,0.3);
    box-shadow: ${shadowL}; 
    margin: 1.4em 0;
    padding: 0;
    border-radius: 8px;
    width: 80%;
    margin-left: 10%;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px auto auto 20px;

    & > div:nth-child(1){
        background-color:goldenrod;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        display: flex;
        justify-content: center;
    }
    & > div:nth-child(2){
        min-height: 70px;
        background-color:powderblue;
        background-size: cover;
        background-position: center center;
        display: flex;
        justify-content: center;
    }
    & > div:nth-child(3){
        display: grid;
        grid-template-columns: 1fr;
        img{width: 100%;}

    }
    & > div:nth-child(4){
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
`

const SlackNotification = ({emoji, color, event, eventData}) => {
    const d = new Date()
    const time = `${d.getHours()}:${d.getMinutes() < 10 ? '0'+d.getMinutes():d.getMinutes()}` 
    return (
        <SlackNotificationStyled>
            <div>
                <img src='https://purplefacts.com/static/resource-icons/chatbot.svg' width='100%' />
            </div>
            <div>
                <h4 style={{margin:'0'}}>
                    Purple Facts Bot 
                    <span style={{fontSize:'0.6em',margin:'0 10px', padding:'2px 5px', verticalAlign:'2px', color:'rgb(110, 111, 111)', backgroundColor:'#acc3cc', borderRadius:'4px'}} >APP</span> 
                    <span style={{fontSize:'0.9em',margin:'0px', color:'#adadad'}} >{time}</span>
                </h4>

                <SlackMessageContainer>
                    <div style={{background:color}} ></div>
                    <div>
                        <div><Emoji name={emoji}/><span style={{verticalAlign:'-3px', color:'#8e8e8e'}}>Event Notification</span></div>
                        <div>
                            <h4 style={{margin:'3px 0'}} >{EVENTS[event].label}</h4>
                            <span>{EVENTS[event].makeDataLabel ? EVENTS[event].makeDataLabel(eventData) : ''}</span>
                        </div>
                        <div style={{margin: '10px 0'}}>
                            <span style={{fontSize:'0.9em',margin:'0px', color:'#adadad'}}>Today at {time} </span>
                        </div>
                        <button className='simple' style={{fontSize:'0.8em'}}><Emoji name='bolt' /> See on user manager</button>
                    </div>
                </SlackMessageContainer>
            
            </div>
        </SlackNotificationStyled>
    )
}

class CustomizationShowcase extends React.Component{
    state = {
        color : '#CCCCCC',
        cta: 'Get your cash offer now!',
        logo : ''
    }

    get browserWindow() {
        return (
            <BrowserWindow>
                <div style={{backgroundColor:this.state.color}}>
                    <div style={{width:'100%', textAlign:'center', display:'grid' }}>
                        <img style={{ marginLeft: '10px',padding: '2px', boxSizing: 'border-box', height: '100%', display: 'block'}} src={this.state.logo || 'https://www.finalcall.com.au/site/img/agency_logo_placeholder.png'} />
                    </div>
                </div>
                <div style={{backgroundImage:'url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Boston_Skyline%2C_SONY_NEX-5_Panorama_Mode_%284765830049%29.jpg/1800px-Boston_Skyline%2C_SONY_NEX-5_Panorama_Mode_%284765830049%29.jpg)'}}>
                    <h3 style={{width:'fit-content', maxWidth:'90%', padding: '0 6px', background: this.state.color, lineHeight: 'calc(1em + 12px)', borderRadius: '4px'}}>
                        {this.state.cta}
                    </h3>
                </div>
                <div style={{padding: '1em'}}>
                    <div style={{width:'40%', height:'0.7em', marginBottom:'0.8em', borderRadius:'10px', background:this.state.color}}></div>
                    <div>
                        <div style={{width:'30%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                        <div style={{width:'10%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                        <div style={{width:'15%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                    </div>
                    <div>
                        <div style={{width:'16%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                        <div style={{width:'10%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                        <div style={{width:'25%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                    </div>
                    <div>
                        <div style={{width:'10%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                        <div style={{width:'12%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                        <div style={{width:'7%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                        <div style={{width:'10%', height:'0.5em', borderRadius:'10px', background:'#171717', display:'inline-block', marginRight:'4px'}}></div>
                    </div>
                    <div style={{margin:'1em 0'}}>
                        <div style={{width:'14%', height:'1em', borderRadius:'4px', border:'solid 2px', borderColor:this.state.color, display:'inline-block', marginRight:'4px'}}></div>
                    </div>
                        
                </div>
                <div style={{textAlign:'center', fontSize:'0.7em'}}>
                    <a>Home</a> | <a>About</a> | <a>Contact</a>
                </div>
            </BrowserWindow>

        )
    }

    get controls(){
        return (
            <div>

                <span>Call to action: </span><br />
                <input style={{minWidth:'40%', fontSize:'0.9em', marginTop:'0.2em'}} value={this.state.cta} onChange={(e)=>{this.setState({cta:e.target.value})}}  />
                
                <br /><br />

                <span>Your Company Logo: </span><br />
                <input placeholder='enter a url' style={{minWidth:'40%', fontSize:'0.9em', marginTop:'0.2em'}} value={this.state.logo} onChange={(e)=>{this.setState({logo:e.target.value})}}  />

                <br /><br />

                <span>Your Brand Primary Color: </span><br />
                <CompactPicker 
                    color={ this.state.color }
                    onChangeComplete={ (c)=>{this.setState({color:c.hex})} }
                />

            </div>
        )
    }

    render(){return (
        <CompactContainer>
            {this.browserWindow}
            <hr style={{marginBottom:'1.5em'}} />
            {this.controls}
        </CompactContainer>
    )}
}

class DataSyncShowcase extends React.Component{
    state = {
        id: '',
        name: '',
        email : '',
        city : ''
    }

    componentDidMount(){
        let savedData = JSON.parse(localStorage.getItem('user:data-sync-demo'))
        if(!savedData){
            savedData = {
                id: generateID(6),
                name: '',
                email : '',
                city : ''
            }
            localStorage.setItem('user:data-sync-demo', JSON.stringify(savedData))
        }
        
        this.setState(savedData)

    }

    deleteData = () => {
        const newModel = {
            id: generateID(6),
            name: '',
            email : '',
            city : ''
        }
        localStorage.setItem('user:data-sync-demo', JSON.stringify(newModel))
        this.setState(newModel)
    }

    handleChange = (key, data) => {
        const stateUpdate = {}
        stateUpdate[key] = data
        this.setState(stateUpdate)

        // persist =>
        let savedData = JSON.parse(localStorage.getItem('user:data-sync-demo'))
        savedData[key] = data
        localStorage.setItem('user:data-sync-demo', JSON.stringify(savedData))

    }

    render(){return (
        <CompactContainer>
        <div style={{display:'grid', gridTemplateColumns:'1fr'}} >
            
            <div>
                <div style={{padding: '1em', paddingBottom:'0'}}>
                    <h3>On the server <a onClick={this.deleteData} style={{fontSize:'0.6em', marginLeft:'1em'}}>Delete data</a>  </h3>
                    <table><tbody>
                        <tr>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace'}}><i style={{color:'dodgerblue'}} className="material-icons">accessibility_new</i> UserID</td>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace', paddingLeft:'15px'}}>{this.state.id}</td>
                        </tr>
                        <tr>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace'}}><i style={{color:'#ffc616'}} className="material-icons">assignment_ind</i> Name</td>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace', paddingLeft:'15px'}}>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace'}}><i style={{color:'tomato'}} className="material-icons">email</i> Email</td>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace', paddingLeft:'15px'}}>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace'}}><i style={{color:'limegreen'}} className="material-icons">location_on</i> City</td>
                            <td style={{paddingBottom:'1em', fontFamily:'Ubuntu Mono, monospace', paddingLeft:'15px'}}>{this.state.city}</td>
                        </tr>
                    </tbody></table>
                </div>
                <div style={{padding: '1em'}}>
                    <h3 style={{marginTop:'0'}}>Data Form</h3>

                    <div>
                        <label>Name:</label><br/>
                        <input style={{fontSize:'0.9em', marginBottom:'1em', marginTop:'0.3em', width:'200px', maxWidth:'100%', boxShadow:shadowL, borderColor:'#ffc616'}} value={this.state.name} onKeyDown={this.handleSpecialKeys} onChange={(e)=>{this.handleChange('name', e.target.value)}} /> 
                    </div>
                    <div>
                        <label>Email:</label><br/>
                        <input style={{fontSize:'0.9em', marginBottom:'1em', marginTop:'0.3em', width:'200px', maxWidth:'100%', boxShadow:shadowL, borderColor:'tomato'}} value={this.state.email} onKeyDown={this.handleSpecialKeys} onChange={(e)=>{this.handleChange('email', e.target.value)}} /> 
                    </div>
                    <div>
                        <label>City:</label><br/>
                        <input style={{fontSize:'0.9em', marginBottom:'1em', marginTop:'0.3em', width:'200px', maxWidth:'100%', boxShadow:shadowL, borderColor:'limegreen'}} value={this.state.city} onKeyDown={this.handleSpecialKeys} onChange={(e)=>{this.handleChange('city', e.target.value)}} /> 
                    </div>
                    <button style={{fontSize:'0.9em'}}>Submit</button>

                </div>
            </div>
           
        </div>
        
        
        </CompactContainer>
    )}
}

class EventShowcase extends React.Component {

    state = {
        emoji : 'tada',
        color : '#7B64FF',
        event : 'firstSiteVisit',
        eventData : {page:'/home'}
    }

    get emojiControl(){
        return ['tada', 'smile', 'house', 'money', 'rocket', 'chart', 'computer', 'satellite', 'trex' ].map(x=>(
            <button key={x} onClick={()=>{this.setState({emoji:x})}} style={{marginRight:'0.4em', backgroundColor:(this.state.emoji===x ? colorConfirm : '') }}>
                <Emoji name={x} size='1.5em' />
            </button>
        ))
    }

    get colorControl(){
        return (
            <CompactPicker 
                color={ this.state.color }
                onChangeComplete={ (c)=>{this.setState({color:c.hex})} }
            />
        )
    }

    changeCurrentEvent = (event) => {

        // update eventData
        const E = EVENTS[event]
        if(E.makeDataLabel){
            let eventData = {}
            switch (event){
                case 'firstSiteVisit':
                    eventData.page = '/home'
                    break
                case 'returnSiteVisit':
                    eventData.page = '/home'
                    eventData.visit_number = 2
                    break
                case 'navigation':
                    eventData.page = '/about'
                    break
                case 'callToAction':
                    eventData.page = '/sell'
                    eventData.cta_label = 'Get Cash Offer'
                    break
                case 'startBotConversation':
                    eventData.choice = 'I want my cash offer'
                    break
                case 'botConversationDone':
                    eventData.outcome = 'Call Scheduled'
                    break
                case 'readBlog':
                    eventData.post = '/repair-cost'
                    break
            }
            this.setState({ eventData })
        }


        this.setState({event})
    }

    updateEventData = (key, value) => {
        let eventData = this.state.eventData
        eventData[key] = value
        this.setState({ eventData })
    }

    get eventControl(){
        return (
            <div>
                <select value={this.state.event} onChange={(e)=>{ this.changeCurrentEvent(e.target.value) }}>
                    {Object.keys(EVENTS).map(k=>(<option key={k} value={k}>{EVENTS[k].label}</option>))}
                </select>
                <br /><br />
                <div hidden={!EVENTS[this.state.event].makeDataLabel}>
                    <table><tbody>
                    {[...EVENTS[this.state.event].dataKeys].map(x=>(
                        <tr key={x}>
                            <td style={{paddingRight:'10px'}}>{x.replace('_', ' ')}</td> 
                            <td><input value={this.state.eventData[x]} onChange={(e)=>this.updateEventData(x,e.target.value)} /></td>
                        </tr>
                    ))}
                    </tbody></table>
                </div>
            </div>
        )
    }

    render(){
        return (
            <CompactContainer nocenter>
                <div style={{marginTop: '2em'}}>
                    <SlackNotification 
                        emoji={this.state.emoji}
                        color={this.state.color}
                        event={this.state.event} 
                        eventData={this.state.eventData} 
                    />
                </div>
                <hr style={{margin:'2em 0 1em 0', width: '100%'}} />
                <h3 style={{marginTop:'0'}}>Controls</h3>
                <div>
                    <div style={{marginBottom:'1em'}} >{this.emojiControl}</div>
                    <div style={{marginBottom:'1em'}} >{this.colorControl}</div>
                    <div style={{marginBottom:'1em'}} >{this.eventControl}</div>
                </div>
            </CompactContainer>
        )
    }

}

class FeatureShowcase extends React.Component {

    state = {
        activeTab : 'chatbot'
    }

    componentDidMount() {
        if(window.location.hash==='#data-sync'){
            this.setState({activeTab:'data'})
        }
    }

    render(){
        return (
            <div>

                <Tabs>
                    <div onClick={()=>{this.setState({activeTab:'chatbot'})}} className={this.state.activeTab==='chatbot' ? 'active' : ''} >
                        <img src='/static/features/icons/robot.svg' style={{height: '1.5em', verticalAlign: 'middle', marginRight:'5px'}} /> 
                        CHATBOT
                    </div>
                    <div onClick={()=>{this.setState({activeTab:'events'})}} className={this.state.activeTab==='events' ? 'active' : ''} >
                        <img src='/static/features/icons/lightning.svg' style={{height: '1.5em', verticalAlign: 'middle', marginRight:'5px'}} /> 
                        EVENTS
                    </div>
                    <div onClick={()=>{this.setState({activeTab:'data'})}} className={this.state.activeTab==='data' ? 'active' : ''} >
                        <img src='/static/features/icons/sync.svg' style={{height: '1.5em', verticalAlign: 'middle', marginRight:'5px'}} /> 
                        DATA SYNC
                    </div>
                    <div onClick={()=>{this.setState({activeTab:'customization'})}} className={this.state.activeTab==='customization' ? 'active' : ''} >
                        <img src='/static/features/icons/customize.svg' style={{height: '1.5em', verticalAlign: 'middle', marginRight:'7px'}} /> 
                        CUSTOMIZATION
                    </div>
                </Tabs>
                <div>

                    <TabContent className={this.state.activeTab!=='chatbot' ? 'hidden' : ''}>
                        <div>
                            <Center>
                                <img src='/static/features/icons/bot.svg' style={{height: '80px', verticalAlign: 'middle', margin:'30px 0'}} /> 
                            </Center>
                            <p>
                                The chatbot is designed to engage users and have a highly customizable data model in the background.
                            </p>
                            <p>
                                Try it out first hand to start thinking about what you would be able to do with it!
                            </p>
                        </div>
                        <div>
                            <Chatbot model='demo' height='75vh' initialStep='step-1' />
                        </div>
                    </TabContent>
                    
                    <TabContent className={this.state.activeTab!=='events' ? 'hidden' : ''} >
                        <div>
                            <Center>
                                <img src='/static/features/icons/events.svg' style={{height: '80px', verticalAlign: 'middle', margin:'30px 0'}} /> 
                            </Center>
                            <p>
                                Every time a user engages with your site in a meaningful way we call that an <i>event</i>. 
                                Events are always tracked and site admins can receive event notifications based on their preferences. 
                            </p>
                            <p>
                                Events not only gives you a real time inisght of your client base but also allows you to engage with clients in a timely fashion.
                            </p>
                        </div>
                        <div>
                            <EventShowcase />
                        </div>
                    </TabContent>
                    
                    <TabContent className={this.state.activeTab!=='data' ? 'hidden' : ''} >
                        <div>
                            <Center>
                                <img src='/static/features/icons/data-sync.svg' style={{height: '80px', verticalAlign: 'middle', margin:'30px 0'}} /> 
                            </Center>
                            <p>
                                Data is the most precious resource you have. 
                                Whether it's a name, email or address we make no data gets lots because of poor connections
                                or even if the user gives up halfway through completing a form.
                            </p>
                            <p>
                                Relevant user's data is inteligently sync'd with our servers in a safe and efficient manner.  
                            </p>
                            <button style={{fontSize:'0.9em'}} onClick={()=>{
                                window.location.hash = 'data-sync'
                                window.location.reload()
                            }} >Refresh to see data persistence</button>
                        </div>
                        <div>
                            <DataSyncShowcase />
                        </div>
                    </TabContent>
                    
                    <TabContent className={this.state.activeTab!=='customization' ? 'hidden' : ''}>
                        <div>
                            <Center>
                                <img src='/static/features/icons/software.svg' style={{height: '80px', verticalAlign: 'middle', margin:'30px 0'}} /> 
                            </Center>
                            <p>
                                The entire site is built with reusable, fully customizable components. 
                                It's easy to set your brand identity well and improve the user experience to get the best results from your landing pages.
                            </p>
                            <p>
                                The modular - plug and play - code design allows for easier and faster development with more robust and consistent results.   
                            </p>
                        </div>
                        <div>
                            <CustomizationShowcase />
                        </div>
                    </TabContent>
                </div>

            </div>
        )
    }

}

const DowloadPanelStyled = styled.div`
    margin:3em 0;
    background-color: ${colorOffLight};
    padding: 1em 0;
    align-items: center;
    h2{font-size:2em;}
    p{font-size:1.5em; margin-top:0; text-align:center;}
` 
export class GuideBookDownload extends React.Component {

    state = {
        showEmailInput : false,
        userEmail : '',
        validationError : '',
        showEmailSubmitted : false
    }

    askEmail = () => {
        this.setState({showEmailInput:true})
    }

    removeValidationWarning = ()=>{
        this.setState({validationError:''})
    }
    
    validateInput = () => {
        if(!isEmail(this.state.userEmail)){
            this.setState({validationError:'Please make sure to enter a valid email'})
            return false
        }
        else{
            UserService.updateUserData({email:this.state.userEmail})
            return true
        }
    }

    startDownload = ()=>{
        this.setState({showEmailSubmitted:true,showEmailInput:false })
    }

    handleSpecialKey = (e) => {
        if(e.key == 'Enter' && this.validateInput()){
            this.startDownload()
        }
    }

    get emailInput(){
        return (
            <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <input  
                    style={{fontSize:'0.9em', minWidth:'65%', borderColor:( this.state.validationError ? colorError : '')}}
                    placeholder='email'
                    type='email'
                    value={this.state.userEmail} 
                    onBlur={this.validateInput}
                    onFocus={this.removeValidationWarning}
                    onChange={(e)=>{this.setState({userEmail:e.target.value})}} 
                    onKeyDown={this.handleSpecialKey} />
                <ErrorSpan style={{lineHeight: '1.7em', fontSize:'0.6em'}}>{this.state.validationError}</ErrorSpan>
                <button
                    onClick={this.startDownload}
                    disabled={this.state.validationError || !this.state.userEmail}
                    style={{fontSize:'0.8em', display:'block', marginTop:'20px' }}
                >START DOWNLOAD</button>
            </div>
        )
    }

    get emailSubmitted(){
        return (
            <p style={{fontSize:'0.7em'}}>
                <i style={{color:colorConfirm}} className='material-icons'>done_outline</i> Thank you! 
                <br /><a href='/static/files/PurpleFacts - Product Guidebook.pdf' target='_blank'>Your download is available here</a>
            </p>
        )
    }

    get currentControl(){
        if(this.state.showEmailInput){return this.emailInput }
        else if(this.state.showEmailSubmitted){return this.emailSubmitted}
        else{return <CtaButton onClick={this.askEmail} style={{fontSize:'0.9em'}}><i style={{verticalAlign: '-5px', marginRight: '10px'}} className='material-icons'>cloud_download</i> FREE DOWNLOAD</CtaButton>}
    }

    render(){
        return (
            <DowloadPanelStyled>
                <CompactContainer style={{padding:'0 1em'}}>
                    <h2>DOWNLOAD THE GUIDEBOOK</h2>
                    <p style={{lineHeight:'1.5em'}}>
                        Our guidebook offers a thorough showcase of our service model, 
                        comparison reference to other technologies and all features including screenshots 
                        and value proposition.
                    </p>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', fontSize:'1.5em'}} >{this.currentControl}</div>
                </CompactContainer>
            </DowloadPanelStyled>
        )
    }

}


export default class ProductsFeatures extends React.Component {



    render(){
        return (
            <Layout>
                <PageContainer>
                    <PageTitle style={{marginBottom:'1em'}} >FEATURES</PageTitle>
                    <FeatureShowcase />
                    <br />
                </PageContainer>
                <GuideBookDownload />
                <PageContainer>
                    <TextImgGrid>
                        <TextImgRow>
                            <div>
                                <h2>DEVELOPER AGILITY</h2>
                                <p>
                                    The ability to quickly fix and improve existing features as well as integrating 
                                    new ones is essential. We work on very fast development cycles being able to test 
                                    and validate features as quickly as less than a week. While more traditional companies
                                    have to work around their technology in order to get a product of the ground we built our 
                                    system prioritizing it's flexibility modularity and customizable nature. Thanks to that, we can deliver 
                                    features in less time with consistently high quality results.
                                </p>
                            </div>
                            <div>
                                <img title="Illustration by Dan Palmer" alt="Illustration by Dan Palmer" src='/static/features/img/Dan Palmer.gif' width="270px" />
                            </div>
                        </TextImgRow>
                        <TextImgRow flip>
                            <div>
                                <h2>PERFORMANCE</h2>
                                <p>
                                    A fast website is essential to look good for search engines and even more so 
                                    to keep users engaged. However, beyond that, being able to use up resources 
                                    efficiently and keep tech overhead low means you are spending on improving your 
                                    platform rather than maintaining it. all of our features are build with that in mind and
                                    by establishing a solid foundation to our code base we enforce good coding practices and 
                                    inherit performance improvements. 
                                </p>
                            </div>
                            <div>
                                <img title="Illustration by Fabricio Rosa Marques" alt="Illustration by Fabricio Rosa Marques" src='/static/features/img/Fabricio Rosa Marques.gif' width="270px" />
                            </div>
                        </TextImgRow>
                        <TextImgRow>
                            <div>
                                <h2>USER EXPERIENCE</h2>
                                <p>
                                    Users don’t read much, want quick solutions and want engaging and beautiful user experience. 
                                    Very few companies can prioritize this concern in face of years old technical debt or 
                                    technical constraints like working on a Wordpress platform. An elegant and engaging 
                                    user experience was a primary concern when building Purple Facts. We improved on proven 
                                    design patterns and features that contribute to building trust and directing user engagement 
                                    but also kept in mind the need to improve.
                                </p>
                            </div>
                            <div>
                                <img title="Illustration by isaacanthonyza" alt="Illustration by isaacanthonyza" src='/static/features/img/isaacanthonyza.gif' width="270px" />
                            </div>
                        </TextImgRow>
                    </TextImgGrid>

                    <PaperDivider />
                    <CtaCards/>
                    <PaperDivider />

                </PageContainer>
            </Layout>
        )
    }

}


