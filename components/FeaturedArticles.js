// LIB
import Link from 'next/link'
import styled from 'styled-components';

// COMPONENTS
import { DateEpoch, Center } from './_common';
import { ArticlePreview } from './ArticleComponents';
import { colorDark } from './_theme';

const FeaturedArticlesStyled = styled.div`
    display: grid;
    grid-template-areas: "featured recent";
    grid-template-columns: 9fr 10fr;
    grid-template-rows: 1fr;
    @media  all and (max-width: 710px) {
        display: grid;
        grid-template-areas: "featured" "recent";
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;   
    }
`
const MainArticleStyled = styled.div`
    cursor:pointer;
    grid-area: featured;
    padding:0.5em;
    color: ${colorDark};
    .img{
        width: 100%;
        padding-top: 40%;
        background-position: center;
        background-size: cover;
    }
    h2{margin: 0.25em 12px 0 12px;}
    p{
        margin: 1em 12px 0 12px;
        line-height: 1.3em;
    }
    h5{ margin: 1em 0 0 12px; }
    
`
const MainArticle = ({article}) => (
    <Link href={`/blog/${article.slug}`} >
        <a style={{ textDecoration: 'none' }}>
            <MainArticleStyled>
                <div className="img" style={{ backgroundImage: `url(${article.thumb})`} }></div>
                <div >
                    <h2>{article.title}</h2>
                    <p>
                        {article.summary}
                    </p>
                    <h5>
                        <i style={{verticalAlign:'bottom'}} className="material-icons">star</i>&nbsp;
                        <DateEpoch epoch={article.created} />
                    </h5>
                </div>
            </MainArticleStyled>
        </a>
    </Link>
)


const RecentArticles = styled.div`
    height: 100%;
    display: flex;
    grid-area: recent;
    flex-direction: column;
    justify-content: space-evenly;
`
const FeaturedArticles = ({articles, mainTitle}) => (
    <div>
        { mainTitle ? <h1>{mainTitle}</h1> : <h2>Featured Articles</h2>}
        { articles && articles.length ? 
            <FeaturedArticlesStyled>
                <MainArticle key={articles[0]._id} slug={articles[0].slug} article={articles[0]} />
                <RecentArticles>
                    {
                        articles.slice(1).map((article, i) => (
                            <ArticlePreview first={i==0} key={article._id} slug={article.slug} article={article} />
                        ))
                    }
                </RecentArticles>
            </FeaturedArticlesStyled>
            : (
                <Center>
                    <h3>No articles</h3>
                </Center>
            )
        }
    </div>
)


export default FeaturedArticles