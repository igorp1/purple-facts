// LIB
import Link from 'next/link'
import Helmet from 'react-helmet'
import styled from 'styled-components';

// COMPONENTS
import { JsonLdArticle } from './JsonLd';
import { DateEpoch, ShortText, ErrorSpan, TextImgGrid, TextImgRow, CompactContainer, NoticeBanner } from './_common';
import { colorOffDark, colorDark } from './_theme';
import HtmlEditor from './HtmlEditor';
import AdminService from '../services/adminService';

// ARTICLE PREVIEW
const StyledArticlePreview = styled.div`
	cursor : pointer;
	display: grid;
	grid-template-columns: 6fr 2fr;
	margin: 1.3em 0 0 0;
	.txt{
		display: flex;
		flex-direction: column;
		justify-content: center;  
		p.short{
			display: none;
		}  
	}
	.img-container{
		padding: 6px;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
	}
	.img{
		width: 100%;
		padding-top: 100%;
		border-radius: 0.1em;
		background-position: center;
		background-size: cover;
	}
	h2{
		margin:0;
		padding: 0.25em 12px 0 12px;
	}

	p{
		margin: 1em 12px 0 12px;
		line-height: 1.3em;
	}
	h5{ margin:12px 0 0 12px; }
	
	@media all and (max-width: 650px){
		.img{
			width: 150px;
			height: 150px;
			padding-top: 0;
		}
	}
	@media all and (max-width: 500px){
		.img{
			width: 100px;
			height: 100px;
			padding-top: 0;
		}
		h2{font-size:1.1em;}
		.txt p.full{
			display: none;
		}
		.txt p.short{
			display: block;
		}
	}
`
export const ArticlePreview = ({article, first}) => (
    <Link href={`/blog/${article.slug}`}>
	<a style={{ textDecoration: 'none', color:colorDark }}>
		<StyledArticlePreview style={ { marginTop: (first ? '0px' : '') } }>
			<div className="txt">
				<h2>{article.title}</h2>
				<p className="full">{article.summary}</p>
				<p className="short"><ShortText limit={50} text={article.summary} /></p>
				<h5>
					<span hidden={!article.featured}><i style={{verticalAlign:'bottom'}} className="material-icons">star</i></span>&nbsp;
					<DateEpoch epoch={article.created} />
				</h5>
			</div>
			<div className="img-container">
				<div className="img" style={ {backgroundImage : `url(${article.thumb}`} } ></div>
			</div>  
		</StyledArticlePreview>
	</a>
	</Link>
)


// ARTICLE LIST
const StyledArticleList = styled.div`
	margin: 50px 2em 1em 2em; 
	padding-top: 30px;
	border-top: solid 0.5px rgba(0,0,0,0.4);
	display: grid;
	grid-gap: 1.5em;
	@media all and (max-width: 650px){ margin: 50px 0.5em 1em 0.5em;  }
`
export const ArticleList = ({ articles }) => (
	<StyledArticleList>
        {articles ? 
			articles.map((article, i) =>  <ArticlePreview key={article._id} article={article} /> ) :
			<h3>No Articles</h3>
		}
	</StyledArticleList>
)

/// REQUIRES article prop
export class ArticleView extends React.Component {

	constructor(props){
		super(props)
		this.state = {cmsOn:false}
	}

	componentDidMount(){
		AdminService.requiresAuth(
			()=>{ this.setState({cmsOn:true}) } , 
			()=>{ this.setState({cmsOn:false}) }
		)
	}
    
    render(){
        const article = this.props.article
        return article ? (
            <div>

                {/* 🤖 important meta for SEO */}
                <Helmet>
                    <title>{article.title}</title>
                    <meta name='og:title' property='og:title' content={article.title} />
                    
                    <meta name='description' property='description' content={article.summary} />
                    <meta name='og:description' property='og:description' content={article.summary} />
                    
                    <meta name='og:type' property='og:type' content='article' />
                    <meta name='og:image' property='og:image' content={article.thumb} />
                    <link rel="canonical" href={`https://purplefacts.com/blog/${article.slug}`} />
                    <meta name='og:url' property='og:url' content={`https://purplefacts.com/blog/${article.slug}`} />
                </Helmet>

				{/* ⚡️ Structured data */}
                <JsonLdArticle article={article} />

				{/* 🎉 Article Content  */}
				<CompactContainer>

					<h1> {article.title} </h1>

					<NoticeBanner>
						{article.summary}
					</NoticeBanner>

					<div style={{fontSize:'1em', color:colorOffDark, marginTop:'7px', marginLeft:'1em' }}>
						{this.state.cmsOn ? 
							<Link href={`/admin/cms/edit/${article.slug}`}><a>Edit this article</a></Link> : ''
						}
						<br/>
						<DateEpoch epoch={article.created} />
					</div>

					<div>
	                	<HtmlEditor instantiateWithModel={article.body} readOnly />
					</div>

				</CompactContainer>
                
                <br />
            </div>
        ) :
        (<ErrorSpan>ARTICLE IS UNDEFINED</ErrorSpan>)
    }

}


