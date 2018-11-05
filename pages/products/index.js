import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout';
import styled from 'styled-components';
import { colorOffLight, colorDark, colorPrimary, colorConfirm } from '../../components/_theme';
import { animateScroll } from 'react-scroll'
import { PageContainer, PageTitle, FullWindow, CtaButton, OptionCard, PaperDivider, CleanList, Purple } from '../../components/_common';
import CtaCards from '../../components/CtaCards'


const LightBanner = styled.div`
    background: ${colorOffLight};
    display: flex;
    padding: 1em 3em;
`

const WizardContainer = styled.div`
    border: solid 1px ${colorDark};
    height: 100%;
    padding: 1em;
    border-radius: 5px;
    &, & > div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    h2, h3{text-align:center;}
    @media all and (max-width: 415px) {
        img{display:none;}
    }
    div.options-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
`


export default class ProductsIndex extends React.Component {

    state = {
        wizardScreen:'start',
        wizardData: []
    }

    get wizardScreen() {
        switch(this.state.wizardScreen){
            case 'start' :
                return (
                    <div>
                        <img src='/static/products/strategy.svg' height='100px' />
                        <h2 style={{marginBottom:'0', textTransform:'uppercase'}}>Find out what's the best product for you</h2>
                        <h3>Answer 5 simple questions to get the product recomensation we believe will best fit your needs</h3>
                        <CtaButton onClick={()=>{this.setState({wizardScreen:'q0'})}} style={{fontSize:'0.8em'}}>GET STARTED</CtaButton>
                    </div>
                )
            case 'q0': return this.makeQuestion('How actively do you invest in Real Estate?',[
                {label:'I invest as my main occupation',icon:'work'},
                {label:'I invest but also have a regular job',icon:'attach_money'},
                {label:`I'm just getting started in the REI world`,icon:'event_seat'}
            ], 0)   
            case 'q1': return this.makeQuestion('How important is content marketing for you?',[
                {label:'It\'s the core of my marketing strategy', icon:'format_shapes'},
                {label:'I\'d like to improve it or get started with it. ', icon:'keyboard'},
                {label:<span><br/>Not important at all</span>, icon:'voice_over_off'},
            ], 1) 
            case 'q2': return this.makeQuestion('How big is your team?',[
                {label:'It\'s just me', icon:'accessibility'},
                {label:'Less than 15 people', icon:'group'},
                {label:'15 people or more', icon:'business'},
            ], 2) 
            case 'q3': return this.makeQuestion('How many deals do you close every month on average?',[
                {label:'Between 0 - 5', icon:'filter_center_focus'},
                {label:'Between 5 - 10', icon:'gradient'},
                {label:'More than 10', icon:'photo_filter'},
            ], 3) 
            case 'q4': return this.makeQuestion('What is the biggest pain point you have in your businness?',[
                {label:'Team Communication', icon:'forum'},
                {label:'Lead Conversion', icon:'touch_app'},
                {label:'User Engagement', icon:'supervised_user_circle'},
                {label:'Operations Improvement', icon:'computer'},
            ], 4) 
            case 'result':
                    return this.result
        }
    }

    setChoice(question, value){
        let wizardData = this.state.wizardData
        wizardData[question] = value
        this.setState({wizardData})
        console.log(wizardData)
        this.setState({wizardScreen:(question+1)==5?'result':`q${question+1}`})
    }

    makeQuestion = (prompt, options, q) => {
        return (
            <div>
                <h2>{prompt}</h2>
                <div className='options-container'>{options.map((x, i)=> <OptionCard onClick={()=>{this.setChoice(q,i)}} key={x.label}>
                    <i style={{fontSize:'2.2em', marginBottom:'5px'}} className='material-icons'>{x.icon}</i><br/>
                    {x.label}
                </OptionCard>)}</div>
            </div>
        )
    }

    get result(){
        const res = this.state.wizardData
        let plan = ''
        const plans = {
            'starter' : {
                title : 'STARTER PLAN',
                icon : '/static/products/starter.svg',
                blurb : 'Whether you are just getting started with Real Estate investment or still haven’t had the time or ability to scale like you wanted, the starter pack is sure to help you with your next step towards building a lasting business.'
            },
            'standard' : {
                title : 'STANDARD PLAN',
                icon : '/static/products/standard.svg',
                blurb : 'You are moving fast, you are focused and you know where you want to get. Your website is the your clients first point of contact and it has to be on point. The standard plan was crafted to allow investors to really differentiate themselves with the flexibility to adapt as they go in order to make their business stronger and operations smoother.'
            },
            'pro' : {
                title : 'PRO PLAN',
                icon : '/static/products/pro.svg',
                blurb : 'You are an investment pro and you deserve the best technology to match your scale, drive, knowledge. If you are a already a pro, the tools you have must be working but we believe we’ve built something really special that’s going to allow you to take all your business and marketing strategies to the next level.'
            }
        }
        if(res[0]===0 || res[2]===2 || res[3]===2 || res[4]==3){
            plan = 'pro'
        }
        else if(res[0]===1 || res[3]===1  || res[2]===1 || res[4]===1 || res[4]===2 ){
            plan = 'standard'
        }
        else{
            plan = 'starter'
        }
        return <div>
            <h2><img src={plans[plan].icon} height='45px' style={{marginRight:'5px', verticalAlign:'-10px'}}/> {plans[plan].title}</h2>
            <p style={{padding:'0 10px'}}>{plans[plan].blurb} <a onClick={()=>{this.scrollToPlan(plan)}}><br/>Read full description ↓</a></p>
            <p style={{textAlign:'center'}}>
                See all of our plans below: <br/>
                <a onClick={()=>{this.scrollToPlan('starter')}}>STARTER</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a onClick={()=>{this.scrollToPlan('standard')}}>STANDARD</a>
                &nbsp;&nbsp;|&nbsp;&nbsp; 
                <a onClick={()=>{this.scrollToPlan('pro')}}>PRO</a>
            </p>
        </div>
    }

    scrollToPlan = (containerID) => {
        animateScroll.scrollTo(document.getElementById(containerID).offsetTop - 60)
    }

    commonBenefit = (engTime) =>{
        return (
            <div style={{backgroundColor:colorOffLight, padding:'1em 1em 10px 1em', borderRadius:'3px'}}>
                <h3 style={{margin:'0'}}>Support</h3>
                <p style={{margin:'10px'}}>
                    Excellent customer support on demand : ALL of our clients receive <strong>white-glove treatment</strong>.<br/>
                    <strong style={{color:'#f5aa17', fontSize:'2em'}}>{engTime} hours </strong> of engineering time monthly in which you 
                    work directly with an egineer to tweak, build and test features for your ecosystem.  
                </p>
            </div>
        )
    }

    featuresList = (featureList) => {
        return <div style={{ marginBottom:'20px', color: 'white', backgroundColor:'#2a2a2a', padding:'1em 1em 10px 1em', borderRadius:'3px'}}>
            <h3 style={{margin:'0'}}>Features</h3>
            <CleanList>
                {featureList.map(x=><li key={x.icon}>
                    <p style={{lineHeight:'1.5em'}}><Purple><i className='material-icons'>{x.icon}</i>&nbsp;&nbsp;<u>{x.title}</u></Purple> <br/> {x.p}</p>
                </li>)}
            </CleanList>
        </div>
    }

    showPricing = (priceM, priceY) => {
        return <div style={{ marginTop:'20px', color: 'white', backgroundColor: colorPrimary, padding:'12px', borderRadius:'3px'}}>
            <h3 style={{marginTop:'0'}}>Pricing</h3> 
            <h2 style={{margin:'0'}}>${priceM} / month</h2>

            <p>
                Monthly subscription includes all listed features, support and engineering time,
                onboarding, platform updates and webinar access.
            </p>

            <CtaButton black style={{fontSize:'1em'}}>Get Started</CtaButton>

        </div> 
    }

    planFeaturesArray = (plan) => {
        const starter = [
            {icon: 'refresh', title:'Partial Page Load', p:'No need for full page loads. Upon request only the necessary components get swapped out of the page. Translates into a great improvement of usability and site speed.'},
            {icon: 'cloud_done', title:'Automatic Data Sync',p:'Your clients data is always kept in sync with our servers, similarly to google drive. So your clients data never gets lost and you can always reach them even if a form never gets submitted.'},
            {icon: 'group', title:'Client Management platform',p:'This is an admin area in which you can keep track of site activity and centralize all of your clients data safely in one place. '},
            {icon: 'code', title:'SEO Markup design',p:'The entire site is ready to rank on Search Engines with 2018 best practices, all you need to do is create amazing content.'},
            {icon: 'widgets', title:'Resource center',p:'A place to help keep your users engaged and in which you can centralize valuable resources like ebooks and blog posts. '},
            {icon: 'show_chart', title:'Google Analytics + Facebook Pixel',p:'It is crucial to have analytics data to run any type of digital marketing campaign. These analytics tools give you a birds eye view of your website traffic.'},
            {icon: 'gavel', title:'GDPR + CCPA',p:'GDPR and CCPA are two of the most regulation for user data privacy standards. Users want to feel safe and know their data is in good hands: in a secure technical environment free of third party abuse.'},
        ];
        const standard = [
            ...starter,
            {icon: 'location_on', title:'Localization Service',p:'Majority of “sell my house” online searches are followed by a city, your landing pages must reflect that expectation with a serviced that is localized to a city or region.'},
            {icon: 'create', title:'Content Management System',p:'Empowers site admins to write, manage and publish blog posts. Built with flexibility in mind, so you can embed images and interactive content.'},
            {icon: 'touch_app', title:'Event Tracking',p:'A better understanding of users’ intent through events translates to optimizing the site quicker and responding in a more personal way.'},
            {icon: 'notifications_active', title:'Slack Integration',p:'You can receive notifications on Slack based on certain events on the site. Customization includes emojis, notification text and color and triggering events.'},
        ] 
        const pro = [
            ...standard,
            {icon: 'announcement', title:'Chatbot',p:'Conversational forms are proven to increase engagement and it allows empower users to ask for what they want instead of looking for it.'},
            {icon: 'send', title:'Event triggered outcomes',p:'You shouldn’t have to jump in and take action every time something happens and with that in mind the event system was build to allow for different actions to be triggered based on how you’d like to customize your platform.'},
        ]
        return {starter, standard, pro}[plan]

    }  

    get features () {
        return <LightBanner>
                <div style={{marginRight:'1.5em'}}>
                    <img src='/static/products/features.svg' height='70px' />
                </div>
                <div>
                    <h3 style={{fontWeight:'normal'}}>
                        Learn more about our <Link href='/products/features'><a>features</a></Link>.<br/> Use the interactive demos to try our favorites!
                    </h3>
                </div>
        </LightBanner>
    }

    get referal () {
        return <LightBanner>
            <div style={{marginRight:'1.5em'}}>
                <img src='/static/products/friendship.svg' height='70px' />
            </div>
            <div>
                <h3 style={{fontWeight:'normal'}}>
                    Refer our products to a fellow<br/> investor to get a <strong>free month</strong>!
                </h3>
            </div>
        </LightBanner>
    }

    render(){
        return (
            <Layout>
                <PageContainer>
                    <PageTitle>PRODUCTS</PageTitle>
                </PageContainer>

                {this.features}
                
                <PageContainer>
                    <FullWindow height="80" style={{width:'100%', padding: '2em'}}>
                        <WizardContainer>
                            {this.wizardScreen}
                        </WizardContainer>
                    </FullWindow>

                </PageContainer>

                <br/><br/>
                {this.referal}

                <PageContainer>

                    <div id='starter'>
                        <h2 style={{marginTop:'0', paddingTop:'1.5em'}}>STARTER PLAN</h2>
                        {this.featuresList(this.planFeaturesArray('starter'))}
                        {this.commonBenefit(2)}
                        {this.showPricing(99)}
                    </div>

                    <br/><br/><hr /><br/>

                    <div id='standard'>
                        <h2 style={{marginTop:'0', paddingTop:'1.5em'}}>STANDARD PLAN</h2>
                        {this.featuresList(this.planFeaturesArray('standard'))}
                        {this.commonBenefit(4)}
                        {this.showPricing(199)}
                    </div>

                    <br/><br/><hr /><br/>

                    <div id='pro'>
                        <h2 style={{marginTop:'0', paddingTop:'1.5em'}}>PRO PLAN</h2>
                        {this.featuresList(this.planFeaturesArray('pro'))}
                        {this.commonBenefit(16)}
                        {this.showPricing(499)}
                    </div>
                </PageContainer>
                <br/><br/>
                {this.features}

                <PageContainer>
                    <br/><br/><PaperDivider />
                    <CtaCards changeToFeatures />
                    <PaperDivider />

                </PageContainer>
            </Layout>
        )
    }

}



