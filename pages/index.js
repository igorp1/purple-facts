// LIB
import Link from 'next/link'
import { withRouter } from 'next/router'
// COMPONENTS
import Layout from '../components/Layout'
import { PageContainer, CityDivider, CompactContainer, FullWindow, Center, CtaButton, TextImgGrid, TextImgRow, CleanList, PaperDivider } from '../components/_common'
import CtaCards from '../components/CtaCards'
// SERVICES
import BlogService from '../services/blogService';
import UserService from '../services/userService';

const Index = (props) => (
    <Layout>

        {/* VIDEO */}
        <FullWindow fit color='#c169ce'>
            <CompactContainer>
                <br/>
                <video height="450px" style={{maxWidth:'100%'}} nocontrols="true" autoPlay muted loop preload='none' src="static/videos/demo-showcase.mov">
                    Your browser does not support videos.
                </video>
                <br/><br/>
                <Center>
                    <Link href='/get-started'><a>
                        <CtaButton black style={{width:'60%', fontSize:'1.3em'}} onClick={ ()=>{UserService.logEvent('callToAction', { cta_label:'get started - banner','page':'/' })} } >
                            <i className="material-icons">touch_app</i> Get Started
                        </CtaButton>
                    </a></Link>
                </Center>
                <br /><br /><br /><br /><br /><br />
            </CompactContainer>
        </FullWindow>
        <CityDivider />

        {/* TEXT */}
        <PageContainer  style={{marginTop:'3em'}}>
                <TextImgGrid>
                    <TextImgRow>
                        <div>
                            <h2>OUR MOTIVATION</h2>
                            <p>
                                We believe the role of technology is not to replace people but rather facilitate 
                                the busy work while humans do what they do best: connect with each other. 
                                We know the importance of building trust and relationships for any business, 
                                especially when it comes to Real Estate Investing. Through the creation of a reliable 
                                software ecosystem we aim to contribute to the growth of real estate businesses by 
                                improving business intelligence, client relationship and digital acumen. 
                            </p>
                            <p>
                                <Link href='/about'><a>Learn more about us →</a></Link>
                            </p>
                        </div>
                        <div>
                            <img title="Motivation Illustration" alt="Motivation Illustration" src='/static/index/work-hard-teamwork-strong-ethic-illustration.png' width="270px" height="270px" />
                        </div>
                    </TextImgRow>
                    <TextImgRow flip>
                        <div>
                            <h2>OUR APPROACH</h2>
                            <CleanList>
                                <li>
                                    <strong><i className="material-icons">extension</i> Developer agility: </strong>
                                    The ability to quickly fix and improve existing features as well as integrating 
                                    new ones is essential. We work on very fast development cycles being able to test 
                                    and validate features as quickly as less than a week.
                                </li>
                                <li>
                                    <strong><i className="material-icons">network_check</i> Performance: </strong>
                                    A fast website is essential to look good for search engines and even more so 
                                    to keep users engaged. However, beyond that, being able to use up resources 
                                    efficiently and keep tech overhead low means you are spending on improving your 
                                    platform rather than maintaining it.
                                </li>
                                <li>
                                    <strong><i className="material-icons">touch_app</i> Quality User Experience: </strong>
                                    Users don’t read much, want quick solutions and want engaging and beautiful user experience. 
                                    Very few companies can prioritize this concern in face of years old technical debt or 
                                    technical constraints like working on a Wordpress platform. An elegant and engaging 
                                    user experience was a primary concern when building Purple Facts. We improved on proven 
                                    design patterns and features that contribute to building trust and directing user engagement 
                                    but also kept in mind the need to improve.
                                </li>
                            </CleanList>
                            <p>
                                <Link href='/products/features'><a>Learn about our features →</a></Link>
                            </p>
                        </div>
                        <div>
                            <img title="Approach Illustration" alt="Approach Illustration" src='/static/index/work-facts-report-organization.png' width="270px" height="270px" />
                        </div>
                    </TextImgRow>
                    <TextImgRow>
                        <div>
                            <h2>SOLVING YOUR PROBLEMS</h2>
                            <p>
                                In the core of all products is a website built with bleeding edge web technology, 
                                quality user experience and a highly maintainable and agile code base. 
                                You can think of it as the central element to our service. 
                                Our business intelligence and marketing tools are integrated into a 
                                secured — admin only — area of the website and our custom features can be added, 
                                tested and validated on your live platform in very short development cycles with 
                                excellent results. In short, you and your clients get excellent technology, 
                                crafted to your needs with endless room for improvement.
                            </p>
                            <p>
                                <Link href='/products'><a>Learn about our products →</a></Link>
                            </p>
                        </div>
                        <div>
                            <img title="Problems Illustration" alt="Problems Illustration" src='/static/index/mission-focused-diligent-work-technology-software.png'  width="270px" height="270px"  />
                        </div>
                    </TextImgRow>
                </TextImgGrid>

                <PaperDivider />
                <CtaCards/>
                <PaperDivider />

        </PageContainer>

    </Layout>

)

Index.getInitialProps = async function({ req }) {

    const featuredArticles = await BlogService.loadFeaturedArticles(req)
    return { featuredArticles }
    
}

export default withRouter(Index)
