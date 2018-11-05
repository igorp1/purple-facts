// LIB
import React from 'react';
import Link from 'next/link';
import Helmet from 'react-helmet'
import { withRouter } from 'next/router'

// COMPONENTS
import Layout from '../components/Layout';
import Testimonials from '../components/Testimonials';
import { PageContainer, CtaButton, OptionCard, CleanList, SuccessSpan, Purple, ErrorSpan, PageTitle } from '../components/_common';

// SERVICES
import { userSignup } from '../services/userService'
import { isEmail } from '../services/helpers';

// META JUICE
const title = `Signup for Exclusive Real Estate Content and News : Purple Facts`
const description = `Signup to stay connected with us for exclusive newsletters, resourceful tools and quality content on real estate. Signup today for free!`
const ogImage = '/static/og-image/png/signup.png'
const pageAddress = 'https://purplefacts.com/signup'

import Chatbot from '../components/Chatbot'
import { colorOffLight } from '../components/_theme';

class Signup extends React.Component {

    render(){
        return(
            <Layout>
            <PageContainer>
                    <PageTitle>GETTING STARTED</PageTitle>
                </PageContainer>
                <div style={{background:colorOffLight, padding:'1em', whiteSpace: 'nowrap'}}>
                    <img style={{verticalAlign:'-20px'}} src='/static/resource-icons/chatbot.svg' height='80px'/> 
                    <h2 style={{display:'inline-block'}}>
                        Our chatbot will guide you through our simple registration. <br />
                        It should only take a minute. 
                    </h2>
                </div>
                <PageContainer>
                    <Chatbot model='register' height='80vh'/>
                </PageContainer>
            </Layout>
        )
    }

} 

export default withRouter(Signup)