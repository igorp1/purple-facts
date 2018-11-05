// LIB
import React from 'react'
import Link from 'next/link'

// COMPONENTS
import { ArticleView } from '../../../components/ArticleComponents'
import CmsService, { getArticlesByslug } from '../../../services/cmsService'
import { Loader, PaperDivider, PageContainer, CompactContainer, CodeContainer } from '../../../components/_common'

// SERVICE
import AdminService, { checkToken } from '../../../services/adminService';

class CmsPreview extends React.Component{
    
    state = {
        article:undefined,
        loading:true, 
        showJson:false 
    }

    static getInitialProps({query}){
        return { slug:query.slug }
    }

    async componentDidMount() {
        AdminService.requiresAuth(()=>{
            this.setState({loading:false})    
            this.loadArticle()
        })
    }

    loadArticle = async () => {

        if(!this.props.slug){
            return this.setState({err:'No article here, make sure you have the right url.'})
        }

        CmsService.getArticleBySlug(
            this.props.slug, 
            (article)=>{
                this.setState({loading:false, article})
            },
            (err)=>{ this.setState({err, loading:false}) }
        )
    }

    toggleJson = () =>{
        let state = this.state
        state.showJson = !state.showJson
        this.setState(state)
    }

    render(){
        const article = this.state.article
        return (
            <PageContainer>
                <h1>
                    Article Preview { article ? <span style={{cursor:'pointer'}} onClick={ this.toggleJson }>{article._id}</span>  : '' }
                </h1>
                <p>
                    <Link href="/admin/cms"><a>Back to CMS</a></Link>
                </p>
                {
                    this.state.showJson ? 
                    <CodeContainer>{ JSON.stringify(this.state.article, null, 2) }</CodeContainer> :
                    ''
                }
                <PaperDivider  />
                <br />
                { this.state.loading ? 
                    <Loader  black /> :
                    this.state.err ? <Center><h3>{this.state.err}</h3></Center> :
                    <ArticleView article={article} />
                }
            </PageContainer>
        )
        
    }

} 

export default CmsPreview