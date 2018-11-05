// LIB
import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { withRouter } from 'next/router'

// COMPONENTS 
// 1. Fix import paths for components and services
import { shadowL } from '../../../components/_theme';
import { PageContainer, Loader, PaperDivider, CleanList, Center, ImageDiv, TextBadge } from '../../../components/_common'

// SERVICES
import AdminService, { checkToken } from '../../../services/adminService';
import CmsService, { getArticles, publishArticle, unpublishArticle } from '../../../services/cmsService';


// 5. Create custom CSS for clean and reusable style
const ArticleRowContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr 1fr 1fr 1fr;
    border-radius: 5px;
    padding:  1em 0.5em;
    ${props => props.hover && css`
        &:hover{
            box-shadow: ${shadowL}
        }
    `}
`
 

class Cms extends React.Component {

    state = {
        loading: true,
        articleListData : null,
    }

    constructor(props){
        super(props)
        this.state = {loading:true}
    }

    componentDidMount(){
        AdminService.requiresAuth(()=>{
            this.setState({loading:false})
            this.loadArticles()
        })
    }

    loadArticles = () => {
        CmsService.getArticles((articleListData)=>{
            this.setState({articleListData})
        })
    }

    get actions() {
        const links = [
            {label: 'Home', href:'/'},
            {label: 'About', href:'/about'}
        ]
        return links.map( (listItem,i) => (
            <li key={i}>
                <Link href={listItem.href} >
                    <a>{listItem.label}</a>
                </Link>
            </li>
        ))
    }

    get loadingScreen() {
        return (
            <div>
                <Loader black />
                <h1>Loading...</h1>
            </div>
        )
    }

    get emptyView() {
        return (
            <Center style={{marginTop:'70px'}}>
                <img src="/static/resource-icons/bad_window.png" height="130px"/>
                <h2>No articles</h2>
            </Center>
        )
    }

    get articleTableHeader() { 
        return [
            'thumb', 
            'info',
            'edit',
            'preview',
            'publish'
        ]
    }

    publishArticle = async (articleId) =>{
        CmsService.publishArticle(articleId,()=>{
            let state = this.state
            state = state.articleListData.map(x => { 
                if(x._id===articleId) x.published = true
                return x
            })
            this.setState(state)
        })
    }

    unpublishArticle = async (articleId) =>{
        CmsService.unpublishArticle(articleId,()=>{
            let state = this.state
            state = state.articleListData.map(x => { 
                if(x._id===articleId) x.published = false
                return x
            })
            this.setState(state)
        })
    }

    

    get articleList() {
        return (
            <div>
                <h1>Purple Facts CMS</h1>

                <Link href="/admin"><a>Back to Admin</a></Link> | <Link href="/admin/cms/new"><a target="_blank">New Article</a></Link> | <a onClick={()=>{location.reload()}} >Refresh</a>
                <br />

                <PaperDivider  />
                {
                    !this.state.articleListData.length ? this.emptyView : 
                    <CleanList>
                    <li>
                        <ArticleRowContainer>
                            { this.articleTableHeader.map((x,i)=>(<Center key={i}><strong>{x}</strong></Center>)) }
                        </ArticleRowContainer>
                    </li>
                    {this.state.articleListData.map( (x) => (                    
                        <li key={x._id} >
                            <ArticleRowContainer hover>
                                {/* 🖼 IMAGE */}
                                <div style={{padding:'7px'}} >
                                    <ImageDiv round cover img={x.thumb} />
                                </div>

                                {/* 🧢 TITLE & DESCRIPTION */}
                                <div style={{padding:'7px'}}> 
                                    <h3 style={{marginTop:'0', marginBottom:'7px'}}>
                                        {x.title}
                                    </h3>
                                    <span style={{fontSize:'10px'}} >
                                        {x.published ? <TextBadge color="#61E886">PUBLISHED</TextBadge> : '' }
                                        {x.featured ? <TextBadge color="#FFAD47">FEATURED</TextBadge> : '' }
                                        {x.archived ? <TextBadge color="#c1c1c1">ARCHIVED</TextBadge> : '' }
                                    </span>
                                    <p style={{marginTop:'0'}}>
                                        {x.summary}
                                    </p>
                                </div>

                                {/* 🖍 EDIT ARTICLE BUTTON */}
                                <Link  href={`/admin/cms/edit/${x.slug}`} ><a target="_blank">
                                    <Center style={{padding:'7px'}}>
                                        <i style={{paddingTop:'20px', cursor:'pointer', color:'dodgerblue'}} className="material-icons">
                                            rate_review
                                        </i>
                                    </Center>
                                </a></Link>

                                {/* 👀 PREVIEW ARTICLE BUTTON */}
                                <Link href={`/admin/cms/preview/${x.slug}`} ><a target="_blank">
                                    <Center style={{padding:'7px'}}>
                                        <i style={{paddingTop:'20px', cursor:'pointer', color:'#a34cbb'}} className="material-icons">
                                            remove_red_eye
                                        </i>
                                    </Center>
                                </a></Link>

                                {/* 🌎 PUBLISH/UNPUBLISH QUICKLY */}
                                <Center style={{padding:'7px'}}  >
                                    {!x.published ? 
                                        <i title="Click to publish" style={{paddingTop:'20px', cursor:'pointer', color:'#20d68d'}} onClick={ ()=>{ this.publishArticle(x._id) } } className="material-icons">public</i> :
                                        <i title="Click to unpublish" style={{paddingTop:'20px', cursor:'pointer', color:'#dd4269'}} onClick={ ()=>{ this.unpublishArticle(x._id) } } className="material-icons">vpn_lock</i>
                                    }
                                </Center>
                            </ArticleRowContainer>
                        </li>
                    ))}
                </CleanList>
                }
            </div>
        )
    }

    render(){
        return (
            <PageContainer>
                { (this.state.loading || !this.state.articleListData) ? 
                    this.loadingScreen :
                    this.articleList
                }
            </PageContainer>
        )
    }

}

export default withRouter(Cms) // 11. Pages must have the default export

/**************************************** 
CHECK LIST

[ ] 1. Fix import paths for components and services
[ ] 2. Add layout with header and footer
[ ] 3. Use services to fetch initial props
[ ] 4. DRY : import common theme elements
[ ] 5. Create custom CSS for clean and reusable style
[ ] 6. Return the props object
[ ] 7. Add getters to build UI pieces and keep render clean
[ ] 8. Use Link object to add href for smooth nav
[ ] 9. Use your custom styles like any other jsx element
[ ] 10. Just add props to trigger style variations
[ ] 11. Pages must have the default export

⚡️ Eh isso

***************************************/










