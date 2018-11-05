// LIB
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { withRouter } from 'next/router'

// COMPONENTS
import Layout from '../components/Layout'
import { PageContainer, Purple, socialIcons, Center } from '../components/_common'

// META JUICE
const title = `Get in contact with us at any time! | Purple Facts`
const description = `Get in contact with our team of real estate specialists to answer your questions and learn more about how we can help you advance your real estate goals.`
const ogImage = '/static/og-image/png/contact.png'
const pageAddress = 'https://purplefacts.com/contact'

function buildContactLinks() { 
    return socialIcons.map((x,i) => (
        <li key={i}>
            <img title={x.title} alt={x.alt} src={x.imgSrc} /> &nbsp;
            <a href={x.href} target="_blank">{x.alt}</a>
        </li>
    ))
}

const ContactList = styled.ul`
    list-style: none;
    li{
        margin: 1em 0em;
        img{ height: 1.2em; vertical-align: middle; }
    }
`

const Contact = (props) => (
    <Layout>
        <Helmet>
            <title>{title}</title>
            <meta name='og:title' property='og:title' content={title} />
            
            <meta name='description' property='description' content={description} />
            <meta name='og:description' property='og:description' content={description} />
            
            <link rel="canonical" href={pageAddress} />
            <meta name='og:url' property='og:url' content={pageAddress} />
            <meta name='og:type' property='og:type' content='website' />
            <meta name='og:image' property='og:image' content={ogImage} />
        </Helmet>

        <PageContainer>
            <h1>Contact Info</h1>

            <ContactList>
                <li>
                    <Purple><i className="material-icons">chat</i>&nbsp;</Purple>
                    <div style={ {display:'inline-block'} } dangerouslySetInnerHTML={ {__html : `<a onclick="Tawk_API.getStatus() ? Tawk_API.maximize() : alert('Seems like our chat server is not online right now. Sorry about that!')">Live chat right now!</a>`} } ></div>
                </li>
                {buildContactLinks()}
            </ContactList>
            
            <br />
            <p>
                It is important to us to make sure you can reach out through the most convenient way possible 
                and get a fast response no matter what. 
                <br />
                With that in mind, we have built a centralized 
                notification system where <Purple>we get notified immediately</Purple> when you reach out. 
            </p>
            <p>
                Our team is online 18 hours a day and you are <Purple>guaranteed a quick response</Purple>.
            </p>

            

            <br /><hr /><br /><br />

            <Center>
            <img
                title="Team Collaboration"
                alt="Team Collaboration on Customer Support"
                src="/static/resource-icons/call.svg"
                height="150px" />
            </Center>

        </PageContainer>
    </Layout>
)

export default withRouter(Contact)