// LIB
import React from 'react'
import { withRouter } from 'next/router'
import styled, { css } from 'styled-components'

// COMPONENTS 

import { PageContainer, CleanList, Dot } from '../../components/_common'

// SERVICES
import { EVENTS } from '../../services/events';
import { MakeRequest } from '../../services/_common';
import UserService from '../../services/userService'
import { colorLink } from '../../components/_theme';


class Dev extends React.Component {

    state = {
        tests : [
            // EXTERNAL REQUESTS
            {
                'title' : 'ipapi.co get',
                call : (callback, errHandle) => {
                    MakeRequest.get('https://ipapi.co/189.46.103.209/json', callback,{errHandle})
                }
            },
            {
                title: 'post test on mocky.io',
                call : (callback, errHandle) => {
                    MakeRequest.post('https://www.mocky.io/v2/5185415ba171ea3a00704eed', {'amazing':'payload'}, callback, {errHandle} )
                }
            }
        ]
    }
        

    componentDidMount(){
        this.runServices()
    }

    updateToDone(indx, data){
        console.log(data)
        let state = this.state
        state.tests[indx].status = <span style={{color:'#43d08a'}}>OK</span>
        this.setState(state)
    }

    updateToError(indx, err){
        console.error(err)
        let state = this.state
        state.tests[indx].status = <span style={{color:'tomato'}}>ERROR</span>
        this.setState(state)
    }

    updateToRunning(indx){
        let state = this.state
        state.tests[indx].status = <span style={{color:colorLink}}>RUNNING</span>
        this.setState(state)

    }
    
    runServices = () => {
        this.state.tests.forEach((test,i) => {
            test.call( (data)=>{this.updateToDone(i, data)}, (err)=>{this.updateToError(i,err)} )
            this.updateToRunning(i)
        })
    }

    get serviceTestList (){
        return this.state.tests
    }

    get userInteractionTriggers () {
        return Object.keys(EVENTS).map(key=>(
            <li key={key}>
                <button style={{fontSize:'1em'}} onClick={()=>{this.triggerUserEvent(key, EVENTS[key])}} > 
                    <Dot color={EVENTS[key].color || 'grey'} style={{marginRight:'0.5em'}} /> 
                    <strong>{key}</strong> : {EVENTS[key].label} </button>
            </li>
        ))
    }

    triggerUserEvent = (key, event) =>{

        let eventData = event.dataKeys.size ? {} : null
        event.dataKeys.forEach( dataKey => eventData[dataKey]='MOCK VALUE' )

        UserService.logEvent(key, eventData, 
            ()=>{ console.info(`${key} event log was successful`) },
            (err)=>{ console.warn(`${key} event log failed`); console.warn(err)  }
        )
    }

    render(){
        return (
            <PageContainer style={{fontFamily:'Ubuntu Mono'}}>
                <h1>Dev Sandbox</h1>

                <h2>Test Services</h2>
                <CleanList>
                    {this.serviceTestList.map(x=><li key={x.title} >[ {x.title} ]<span style={{marginLeft:'1em', fontSize:'0.7em', fontFamily:'Ubuntu Mono'}}>Result: {x.status || <span style={{color:'grey'}}>STANDBY</span>}</span> </li>)}
                </CleanList>

                <h2>Test User Events</h2>
                <CleanList>
                    {this.userInteractionTriggers}
                </CleanList>


            </PageContainer>
        )
    }

}

export default withRouter(Dev)








