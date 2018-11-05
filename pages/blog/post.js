// LIBS
import Link from 'next/link'
import { withRouter } from 'next/router'

// COMPONENTS
import Layout from '../../components/Layout'
import FeaturedArticles from '../../components/FeaturedArticles';
import { ArticleView } from '../../components/ArticleComponents';
import { PageContainer, PaperDivider } from '../../components/_common.js';

// SERVICES
import BlogService from '../../services/blogService.js';
import { ErrorMessage } from '../_error.js';

const Post = ({article, featuredArticles}) => (
    <Layout>
        <PageContainer>
        { article ? (
            <div>
                <ArticleView article={article} />
                <PaperDivider />
                <FeaturedArticles articles={featuredArticles} />
            </div>
        ) : (
            <div>
                <ErrorMessage msg={(<span>The page you are looking for does not exist.<br/> Please double check if you are in the right place.</span>)} />
                <br /><br />
                <PaperDivider  />
                <br /><br />
                <FeaturedArticles articles={featuredArticles} />
                <br /><br />
            </div>
        )}
        </PageContainer>
        
    </Layout>
)

Post.getInitialProps = async function( {req, query} ) {
    
    const article = await BlogService.loadArticle(query.slug, req) 
    const featuredArticles = await BlogService.loadFeaturedArticles(req) 
    
    return {article, featuredArticles}

}

export default withRouter(Post)