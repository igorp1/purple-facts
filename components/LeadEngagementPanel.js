import React from 'react'
import styled from 'styled-components'
import { gEvent } from '../services/googleAnalytics'


import { FullWindow, CompactContainer, CleanList, ErrorSpan } from "./_common";
import { colorConfirm, colorError, transition } from './_theme';
// import { consolidateFormSignupData, triggerFormSubmit } from '../services/userService';
import Emoji from './Emoji';
import { isEmail } from '../services/helpers';
import UserService from '../services/userService';


const EngagementPanelGrid = styled.div`
    
    display: grid;
    grid-template-areas: 'info' 'form';
    grid-template-columns: 1fr;

    margin-top: 35px;
    margin-bottom: 35px;

    @media all and (min-width: 730px) {
        grid-template-areas: 'info form';
        grid-template-columns: 8fr 7fr;
    }
    

`
const InfoBox = styled.div`
    position:relative;
    z-index: 10;
    grid-area: info;
    padding: 10px;
    padding-top:0;
    color: white; 
    background-color: #171717eb;
    border-radius: 0px;
    border-top-left-radius:2px;
    border-top-right-radius:2px;
    h1{
        font-size:20px;
    }
    li img{
        display: inline-block;
        height: 1.5em;
        vertical-align: middle;
        margin-right: 6px;
    }

    .big-arrow{
        display:none;
        height: 90px;
        transform: rotate(50deg);
    }

    @media all and (min-width: 730px) {
        .big-arrow{
            display:block;
        }
        padding: 15px;
        h1{margin-bottom: 2em;}
        border-radius: 0px;
        border-top-left-radius:6px;
        border-bottom-left-radius:6px;
    }


`

const SignupForm = styled.div`
    grid-area: form;
    padding: 10px;
    background-color: #f7f7f7;
    padding-top: 0px;

    border-radius: 2px;
    border-top-left-radius:0px;
    border-top-right-radius:0px;
    

    h2{
        font-size:17px;
        i{
            font-size:1.8em;
            transform:rotate(-90deg);
            font-weight: bold;
            color: ${colorConfirm};
            vertical-align:-0.6em;
        }
    }

    .formContainer{
        input{
            display: block;
            width:100%;
            padding: 6px 5px;
            margin-bottom: 15px;
        }

        .submit{
            margin-top: 10px;
            background-color: ${colorConfirm};
            color:#171717;
            padding: 10px;
            width:100%;
        }

        p.security{
            i{ 
                font-size: 14px; color:${colorConfirm}; 
                vertical-align: -3px;
            }
            font-size: 10px;
            
            span.info{
                transition: ${transition};
                display:none;
                &.show{
                    display:block;
                }
            }
        }
    }
    
    @media all and (min-width: 730px) {
        margin-top: 0px;
        border-radius: 0px;
        border-top-right-radius:6px;
        border-bottom-right-radius:6px;
    }


`
const features = [
    {
        title:'Fast',
        img: '/static/sell-icons/fast.svg',
        blurb : <span>We can close in as litte as 7 days.</span> 
    },
    {
        title:'For Cash',
        img:'/static/sell-icons/cash.svg',
        blurb: <span>A fair and honest cash offer.</span>
    },
    {
        title:'As Is',
        img:'/static/sell-icons/no-repairs.svg',
        blurb: <span>No need to do any repairs or cleaning, we'll handle that.</span>
    },
    {
        title:'No Fees',
        img:'/static/sell-icons/no-fees.svg',
        blurb: <span>No closing cost, comission or any type of hidden fees.</span>
    }
]

class LeadEngagementPanel extends React.Component {
    
    state = {
        showSecurityInfo : false,
        interactionStarted : false,
        formState : 'simple-form',
        userData : {
            'address' : '',
            'email' : '',
            'phone' : ''
        },
        validionWarn : {}
    }

    constructor(props){
        super(props)
        if(props.city) this.state.userData.city = props.city
    }

    toggleSecurityInfo = () => {
        let state = this.state
        state.showSecurityInfo = !state.showSecurityInfo
        this.setState(state)
    }

    submitSignup = (data) => {
        
        gEvent({
            category :'lead',
            action:'get-cash-offer',
            label: 'get-cash-offer',
            value: '1'
        })

        this.setState({formState:'done'})
        setTimeout(()=>{ this.setState({formState:'simple-form'}) }, 3000)

        UserService.updateUserData(data)
        UserService.logEvent('leadFormSubmission', null)

    }

    setInputOnFocus = () => {
        if(this.state.interactionStarted) return 
        UserService.logEvent('startLeadFormEngagement',null)
        this.setState({interactionStarted:true})
    }

    inputLostFocusOn = (field) => {

        switch (field) {
            case 'address':
                this.liftWarning('address')
                if(!this.state.userData.address){this.starterFormRaiseWarning('address')}
                else{this.sendData(this.state.userData)}
                break
            case 'email':
                this.liftWarning('email')
                if(!isEmail(this.state.userData.email)){this.starterFormRaiseWarning('email')}
                else{this.sendData(this.state.userData)}
                break
            default:
                if(this.state.userData[field]) this.sendData(this.state.userData)
        }
        
    }

    starterFormDetectEnterKey = (e) =>{
        if(e.key === 'Enter'){
            e.preventDefault()
            switch(e.target.id){
                case 'address':
                    if(this.state.userData.address){
                        this.liftWarning('address')
                        document.getElementById('email').focus()
                        this.sendData(this.state.userData)
                    }
                    else{this.starterFormRaiseWarning('address')}
                    break
                case 'email':
                    if(isEmail(this.state.userData.email)){
                        this.liftWarning('email')
                        document.getElementById('phone').focus()
                        this.sendData(this.state.userData)
                    }
                    else{this.starterFormRaiseWarning('email')}
                    break;
                case 'phone':
                    this.starterFormSubmit()
                    break;
            }
        }
    }

    starterFormInputHandler = (value, dataTag)=>{
        let state = this.state
        state.userData[dataTag] = value
        this.setState(state) 
    }

    starterFormSubmit = (e) =>{
        if(e) e.preventDefault()

        this.liftWarning('address')
        this.liftWarning('email')

        if(!this.state.userData.address){this.starterFormRaiseWarning('address')}
        if(!isEmail(this.state.userData.email)){this.starterFormRaiseWarning('email')}

        if(this.state.userData.address && isEmail(this.state.userData.email))
            this.submitSignup( this.state.userData )
    }


    //==========> 🥤 SEND DATA TO SERVER JUICE
    //========================================
    sendData = (data) => { UserService.updateUserData(data) }


    //==========> DATA WARNING CTRL
    //=============================
    liftWarning = (dataTag) => { 
        if(!this.state.validionWarn[dataTag]) return
        let state = this.state
        state.validionWarn[dataTag] = undefined
        this.setState(state)
    }

    starterFormRaiseWarning = (dataTag) => {
        let state = this.state
        switch(dataTag){
            case 'address':
                state.validionWarn.address = 'Please enter your address'
                break;
            case 'email':
                state.validionWarn.email = 'Please enter a valid email'
                break;
        }
        this.setState(state)
    }


    //==========> FORM AREA
    //=====================
    get renderFormArea(){
        switch(this.state.formState){
            case 'simple-form':
                return this.starterForm
            default:
                return this.starterForm
        }
    }


    //==========> STARTER FORM
    //========================
    get starterForm (){
        return (
            <div>
                <h2>
                    <u>No cost</u> and <u>no commitment</u>, you have nothing to lose.
                    Get started now <i className="material-icons">subdirectory_arrow_left</i>
                </h2>
                <div className="formContainer"><form action="#">

                    {/* 🏡 PROPERTY ADDRESS */}
                    <label htmlFor="address"><span style={{color:colorError}} >*</span>Address:</label>
                    <input type="text" name="address" id="address" placeholder='Full Address' style={{borderColor: (this.state.validionWarn.address ? colorError :'' ) }}
                            value={this.state.userData.address} 
                            onFocus={this.setInputOnFocus} 
                            onBlur={()=>{this.inputLostFocusOn('address')}}
                            onChange={(e)=>{this.starterFormInputHandler(e.target.value, 'address')}}  
                            onKeyDown={this.starterFormDetectEnterKey} />
                    <ErrorSpan style={{marginTop: '-13px',fontSize:'0.8em',marginBottom: '10px',float: 'right'}} >{this.state.validionWarn.address}</ErrorSpan>

                    {/* 📧 EMAIL */}
                    <label htmlFor="email"><span style={{color:colorError}} >*</span>Email:</label>
                    <input type="email" name="email" placeholder="Email" id="email" style={{borderColor: (this.state.validionWarn.email ? colorError :'' ) }}
                            value={this.state.userData.email} 
                            onFocus={this.setInputOnFocus}
                            onBlur={()=>{this.inputLostFocusOn('email')}}
                            onChange={(e)=>{this.starterFormInputHandler(e.target.value, 'email')}}  
                            onKeyDown={this.starterFormDetectEnterKey} />
                    <ErrorSpan style={{marginTop: '-13px',fontSize:'0.8em',marginBottom: '10px',float: 'right'}} >{this.state.validionWarn.email}</ErrorSpan>

                    {/* ☎️ PHONE NNUMBER */}
                    <label htmlFor="phone">Phone:</label>
                    <input type="phone" name="phone" id="phone" placeholder="Phone #" 
                            value={this.state.userData.phone} 
                            onFocus={this.setInputOnFocus}
                            onBlur={()=>{this.inputLostFocusOn('phone')}}
                            onChange={(e)=>{this.starterFormInputHandler(e.target.value, 'phone')}}  
                            onKeyDown={this.starterFormDetectEnterKey} />

                    {/* ⚡️ SUBMIT */}
                    <button className="submit" onClick={this.starterFormSubmit} >{ this.state.formState=='simple-form' ? 'Get My Cash Offer' : <strong> <Emoji name='tada' /> Thank you! We will reach out soon!</strong> }</button>
                    
                    <p className="security">
                        <i className="material-icons">verified_user</i>
                        <span>
                        &nbsp; Your information is safe with us. <a onClick={this.toggleSecurityInfo} >Show {this.state.showSecurityInfo ? 'less' : 'more'}</a>
                        </span>
                        <span className={this.state.showSecurityInfo ? 'info show' : 'info'}>  
                            <br />
                            We operate on a secure private server. Your information will never be shared or sold to any third party companies.
                            All data is securely transfered under encryption of the SSL protocol. We follow all CCPA and GDPR guidelines of privacy protection. 
                        </span>
                    </p>

                </form></div>

            </div>
        )
    }


    //==========> FULL RENDER
    //=======================
    render () {
        return (
            <FullWindow id="lead-collector" fit bk="https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_878,q_75,w_1903/v1/clients/boston/BostonAerails_KyleKlein_KKP12001_5c3e779e-3e93-4634-839c-b1ac087f7ece.jpg">
                <CompactContainer>
                    <EngagementPanelGrid>
                        <InfoBox>
                            <h1>Sell My House Fast In { this.props.city ? `${this.props.city.name}, MA` : 'Massachusetts'}</h1>
                            <CleanList>
                                {features.map((x,i)=>
                                    <li key={i}>
                                        <img src={x.img} />
                                        <strong>{x.title}</strong> : {x.blurb}
                                    </li>
                                )}
                            </CleanList>
                            <div style={{display:'flex',justifyContent:'center', marginBottom:'15px'}}><img className='big-arrow' src='static/resource-icons/arrow.png' /></div>
                        </InfoBox>
                        <SignupForm>
                            {this.renderFormArea}
                        </SignupForm>
                    </EngagementPanelGrid>
                </CompactContainer>
            </FullWindow>
        )
    }

}



export default LeadEngagementPanel








