// LIB
import Link from 'next/link'
import Helmet from 'react-helmet'
import { withRouter } from 'next/router'

// COMPONENTS
import Layout from "../components/Layout";
import { PageContainer, PaperDivider, CompactContainer, CtaButton } from "../components/_common";

// META JUICE
const title = `Careers in Real Estate Tech with Purple Facts`
const description = `Working at Purple Facts is about creativity, ownership and growth. The careers page is the right place to learn more about joining the team.`
const ogImage = '/static/og-image/png/careers.png'
const pageAddress = 'https://purplefacts.com/careers'

const applicationPage = 'https://airtable.com/shrpOLCLLmcFtplYr'

const Careers = (props) => (
    <Layout>
        <Helmet>
            <link rel="canonical" href={pageAddress} />

            <title>{title}</title>
            <meta name='og:title' property='og:title' content={title} />
            
            <meta name='description' property='description' content={description} />
            <meta name='og:description' property='og:description' content={description} />
            
            <meta name='og:url' property='og:url' content={pageAddress} />
            <meta name='og:type' property='og:type' content='website' />
            <meta name='og:image' property='og:image' content={ogImage} />
        </Helmet>
        <PageContainer>
            <h1>Careers</h1>
            <h2>Working at Purple Facts is about creativity, ownership and growth.</h2>

            <PaperDivider />

            <CompactContainer>
                <div>
                    <h3>We are a small team, passionate about people and technology.</h3>
                    <p>
                        We believe people do their best work when they are truly motivated and engaged.
                        By creating a string sense of creative freedom and ownership our team strives for excellence and forward momentum.
                        Our work goes beyond Real Estate, or investment or technnology. 
                        Our real focus is to positively impact communities through investments and neighborhood development.  
                    </p>
                    <p>
                        Joining our team means you get to create your own framework and improve your work days as best as you can.
                        We hope to hire someone and contribute to their growth as much, if not more, than they contribute to ours.
                        All memebers in our teams are treated equality in spite of their position, color of their skin and sexual orientation.
                        We believe in hard work, creativity and true humanity and we exercise those value every day throgh our work and self development.    
                    </p>
                    <p>
                        We are currently hiring for:
                    </p>
                    <ul>
                        <li>
                            <h4>Account Manager</h4>
                            <p>
                                Responsible for sales and investor relationships <br />
                                While engineers focus on creating solutions, account managers focus on using this solutions side by side with 
                                investors. This is a pivotal role in the company as you become the face of Purple Facts 
                                and the most valuable resource in their real estate journey. It is sure to be an incredible learning experience and 
                                an amazing opportunity to truly create the best work environment possible for you and your colleagues.    
                            </p>
                        </li>
                        <li>
                            <h4>Software Engineer</h4>
                            <p>
                                Responsible for site improvement and product development. <br/>
                                Engineers will work on a react + node web stack as well as on python for data analysis.
                                Engineers have ownership over their projects which means you are your own project manager.
                                We don't believe that engineers should be boxed of from the real world problems 
                                to only focus on the technical ones. A well rounded engineer tackles problems more efficiently and effectively.
                            </p>
                        </li>
                    </ul>
                    <p>
                        If you are interested in applying, we have a really simple first step below.
                    </p>
                    <p>
                        <Link href={applicationPage}><a target="_blank"><CtaButton style={{fontSize:'1em'}} >Apply now</CtaButton></a></Link>
                    </p>
                </div>
            </CompactContainer>

        </PageContainer>
    </Layout>
)

export default withRouter(Careers)