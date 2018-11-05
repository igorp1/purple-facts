// LIB
import Helmet from 'react-helmet'
import { withRouter } from 'next/router'

// COMPONENTS
import Layout from '../../components/Layout'
import FeaturedArticles from '../../components/FeaturedArticles';
import { PageContainer, PaperDivider } from '../../components/_common';
import { ArticleList } from '../../components/ArticleComponents';

// SERVICES
import BlogService from '../../services/blogService';

// META JUICE
const title = `Real Estate News, Analysis, Lessons and Much More | Purple Facts`
const description = `We craft smart quality content with passion and care. Get the best of real estate news, case studies, lessons and much more on our blog.`
const ogImage = '/static/og-image/png/blog.png'
const pageAddress = 'https://purplefacts.com/blog'

const Blog = (props) => (
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

            <h1>Blog</h1>
            <h2>Real Estate News, Analysis, Lessons and Much More</h2>

            <PaperDivider  />


            <FeaturedArticles articles={props.featuredArticles} />
            <ArticleList articles={props.articles} />

        </PageContainer>

	</Layout>
)

Blog.getInitialProps = async function({req}) {

    const featuredArticles = await BlogService.loadFeaturedArticles(req)
    const articles = await BlogService.loadArticles(req)
    return { featuredArticles, articles }
    
}

export default withRouter(Blog)



