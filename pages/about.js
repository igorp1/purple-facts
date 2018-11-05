// LIB
import React from 'react';
import Helmet from 'react-helmet'
import Link from 'next/link'
import { withRouter } from 'next/router'

// COMPONENTS
import Layout from '../components/Layout'
import CtaCards from '../components/CtaCards'
import { PageContainer, TextImgGrid, TextImgRow, CleanList, PaperDivider, PageTitle, ColorDecoratedTitle } from '../components/_common';

// META JUICE
const title = `Our company | Purple Facts`
const description = `Learn about our company values, inspiration and methodology.`
const ogImage = '/static/og-image/png/about.png'
const pageAddress = 'https://purplefacts.com/about'


const About = (props) => (
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
		    <PageTitle>ABOUT US</PageTitle>

            <TextImgGrid>
                {/* OUR GOAL */}<TextImgRow flip>
                <div>
                        <h2>OUR GOAL</h2>
                        <p>
                            Our goal is to give you thorough insight and control over your clients’ user 
                            experience and create an environment where you can better understand their 
                            intent and be able to have a timely response to it. We build software and we 
                            care about people, that’s a rare combination in the tech world and the result 
                            is something really special.
                            We’ve crafted three different products all based on the same principles: 
                        </p>
                        
                        <CleanList>
                            <li><i className="material-icons">filter_1</i> Understand users and continually improve their experience on the site.</li>
                            <li><i className="material-icons">filter_2</i> Give site admins quality insight of their user base.</li>
                            <li><i className="material-icons">filter_3</i> Create a flexible environment with room for fast growth and novel features.</li>
                        </CleanList>
                        <p>
                            <Link href='products'><a>Learn about our Products →</a></Link>
                        </p>
                    </div>
                    <div>
                        <img className='framed' title="On Goal" alt="Illustration credit : Jelio Dimitrov for FourPlus Studio" src='/static/about/Jelio Dimitrov for FourPlus Studio.gif' width="320px"  />
                    </div>
                </TextImgRow>
                

                {/* INSPIRATION */}<TextImgRow>
                    <div>
                        <h2>INSPIRATION</h2>
                        <p>
                            Our founder Igor de Paula has always been passionate about getting into real estate 
                            and be able to impact communities by building really beautiful and functional spaces. 
                            He married that aspiration with his vocation and craft of building high quality software 
                            to facilitate his entry into the REI world. Not long into the building of his own platform 
                            he realized how much value he had created and how much the tools he built would benefit other investors. 
                            And so, he took his experiences from academia research, health care and e-commerce and 
                            focused his energy into doing what he does best - building amazing software. 
                            From that, <strong>Purple Facts was born as a SaaS company aiming to create 
                            enterprise quality bespoke software solutions for Real Estate Investors</strong>. 
                        </p>
                    </div>
                    <div>
                        <img className='framed' title="Igor de Paula - Purple Facts, CEO" alt="idp working on some code" src='/static/about/idp.png' width="320px"  />
                    </div>
                </TextImgRow>
                
                {/* OUR VALUES */}<TextImgRow >
                    <div>
                        <h2>CORE VALUES</h2>
                        <CleanList>
                        <li>
                            <ColorDecoratedTitle color='#36c5fe'>Innovation</ColorDecoratedTitle> 
                            <p>
                                While most SaaS companies face the daily challenges if technical limitations, 
                                a bureaucratic development process and a bottom line driven feature creation, 
                                we are proud to stand out and apart. From day 1, the main concern was to build 
                                an engaging user experience in an agile and scalable platform. 
                                Thanks to that mindset and constant drive to create more value and build something unique, 
                                we are able to sustain a good business, great service and exceptional products. 
                            </p>
                        </li>
                        <li>
                            <ColorDecoratedTitle color='#fecb00'>Diligence</ColorDecoratedTitle> 
                            <p>
                                We work smart and we work fast. Our technology reflects our drive to solve problems
                                at a fast pace ensuring every solution is high quality, testable and scalable. 
                                It should come with no surprise that our relationship with clients and prospects 
                                is transparent, our work is detail oriented and our results are above expectation. 
                                Get started for free to experience it first hand.
                            </p>
                        </li>
                        <li>
                            <ColorDecoratedTitle color='#2a9f6a'>Care</ColorDecoratedTitle> 
                            <p>
                                We love and have worked with technology for years and in doing so we also 
                                came to understand that replacing humans with robots is not a good way for 
                                companies to create relationships with people. We want technology to aid your 
                                work and automate repetitive and laborious tasks so you can focus on what matters, 
                                communicating with sellers and investors, solving their problems and facilitating 
                                the investment process.
                            </p>
                        </li>
                        </CleanList>
                    </div>
                    <div>
                        <img title="Values Illustartion" alt="Illustration credit : James Rotanson for Atlassian" src='/static/about/James Rotanson for Atlassian.png' width="300px" />
                    </div>
                </TextImgRow>
                
                {/* OUR CLIENTS */}<TextImgRow flip>
                    <div>
                        <h2>OUR CLIENTS</h2>
                        <p>
                            Our client base is mostly focused on novice and seasoned real estate investors 
                            looking to get leads through online marketing strategies. We are not marketing 
                            company but we provide all the tools investors need to assess their digital 
                            marketing results improve their business processes and intelligence through our 
                            platform and create a trustworthy and engaging digital storefront with our website. 
                            Our clients aim to:
                        </p>
                        <CleanList>
                            <li><i className="material-icons">bubble_chart</i> Stand out from competitors through a modern and trustworthy web platform.</li>
                            <li><i className="material-icons">usb</i> Integrate their business practices into a digital environment for higher performance and reliability.</li>
                            <li><i className="material-icons">monetization_on</i> Test and expand their marketing and business strategy on a fully integrated ecosystem.</li>
                            <li><i className="material-icons">category</i> Build bespoke software solutions to meet their unique business needs.</li>
                        </CleanList>
                    </div>
                    <div>
                        <img title="Our clients Illustration" alt="Illustration credit: isaacanthonyza" src='/static/about/isaacanthonyza.gif' width="300px" />
                    </div>
                </TextImgRow>
            </TextImgGrid>

            <PaperDivider />
            <CtaCards/>
            <PaperDivider />
            
        </PageContainer>

	</Layout>
)

export default withRouter(About)
