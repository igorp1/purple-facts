// LIB
import Link from 'next/link'
import styled from 'styled-components'

// COMPONENTS
import { ActionCard } from './_common';
import UserService from '../services/userService';


const callsToAction = [
    {
        href : '/get-started',
        img : '/static/cta-icons/spaceship.png',
        imgTitle : 'Get started Icon',
        html : (<p>Click here to <strong><u>get started</u></strong> on our beta platform. <strong><u>It's free and super easy to get started!</u></strong></p>)
    },
    {
        href : '/products/demo',
        img : '/static/cta-icons/website.png',
        imgTitle : 'Products Icon',
        html : (<p>Click here to <strong><u>see our products</u></strong>. Learn about products and features and request a walkthrough!</p>)
    },
    {
        href : '/static/files/PurpleFacts - Product Guidebook.pdf',
        img : '/static/cta-icons/reading.png',
        imgTitle : 'Guidebook Icon',
        event : 'read-guidebook',
        html : (<p>Click here to get our <strong><u>detailed product guidebook</u></strong>. Lots of info about our features, products and business!</p>)
    }
]

export const ActionCardsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 1em;
    padding: 2em;
    @media all and (max-width: 820px) {
        display: grid;
        grid-template-columns: 1fr;
    }
`

export const CardSkip = styled.div`
    @media all and (max-width: 820px) {
        display: none;
    }
`

const CtaCardImage = styled.div`
    height: 100px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
`


export const buildCard = (ctaData, key, changeToFeatures) => {
    return (
        <Link href={changeToFeatures&&key==1 ? '/products/features' : ctaData.href} key={key} >
            <a style={ {textDecoration:'none'} } onClick={ ()=>{ctaData.event ? UserService.logEvent(ctaData.event) : ''} } >
                <ActionCard>
                    <CtaCardImage role="img" title={ctaData.imgTitle} style={ {backgroundImage : `url(${ctaData.img})`} } ></CtaCardImage>
                    {changeToFeatures&&key==1 ? 
                    <p>Click here to <strong><u>learn about our features</u></strong> and interact with our favorite ones on the page.</p>  
                    : ctaData.html}
                </ActionCard>
            </a>
        </Link>
    )
}


const CtaCards = ({changeToFeatures}) => (
    <ActionCardsContainer>
        {callsToAction.map( (x, i) => buildCard(x, i, changeToFeatures) )}
    </ActionCardsContainer>
)

export default CtaCards