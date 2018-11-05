import styled from 'styled-components'

import { CleanList, Dot, DateEpoch } from "./_common";
import { EVENTS } from "../services/events";


const makeEventLabel = (event, eventData) => {
    if(!EVENTS[event]) return <span>{event}</span>
    else if(!EVENTS[event].makeDataLabel) return <span>{EVENTS[event].label}</span>
    else {
        switch (event){
            default :
                return <span>{EVENTS[event].label} : {EVENTS[event].makeDataLabel(eventData)}</span>
        }
    }
}


const EventTimeline = ({events}) => {

    if(!events || !events.length){
        return (
            <span>
                <i style={{verticalAlign:'-7px'}} className="material-icons">highlight_off</i> There are no events to show
            </span>
        )
    }
    else{
        return (
            <CleanList>
                {events.map(({event, date, eventData}, i) => <li key={i}>
                    <div>
                        <Dot color={EVENTS[event] ? EVENTS[event].color : 'grey' } style={{marginRight:'1em'}} /> 
                        { 
                            makeEventLabel(event, eventData)
                        } 
                    </div>
                    <div>
                        <span style={{fontSize:'0.85em'}}><DateEpoch mono epoch={date} complete /></span>
                    </div>
                </li>)}
            </CleanList>
        )
    }


}

export default EventTimeline
