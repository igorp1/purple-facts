// LIB 
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import styled, { css } from 'styled-components'

// COMPONENTS
import { Center, ImageDiv , CompactContainer, CleanList, DateEpoch, Loader, ErrorSpan, SuccessSpan } from './_common'

// SERVICES
import CmsService from '../services/cmsService';
import { transition, colorConfirm, colorDark, colorError } from './_theme';
import HtmlEditor from './HtmlEditor';


const StealthEditor = styled.input`
    width: 100%;
    font-size: 1em;
    border:none;
    transition : ${transition};
    padding:10px;
    margin:10px;
    &:focus{
        border: solid 1px rgba(0,0,0,0.1)
    }
    ${props => props.h1 && css`
        font-size: 1.4em;
        margin-top: 0.4em;
        margin-bottom: 0.4em;
        font-weight: bold;
    `}
    ${props => props.center && css`
        text-align: center;
    `}
`

const SaveButton = styled.button`
    font-size: 1.3em;
    color: white;
    background-color: ${colorConfirm};
`

class ArticleEditor extends React.Component {

    state = {
        loading : true,
        article : {
            title : '',
            slug : '',
            summary : '',
            thumb : '',
            body : '',
            author : '',
            published :  false,
            featured : false,
            archived : false,
            created : 0
        },
        err : null,
        createdDateStr : ''
    }

    componentDidMount(){
        if(this.props.slug) this.loadArticle()
        else this.setState({loading:false})
    }

    loadArticle = () => {
        CmsService.getArticleBySlug(
            this.props.slug,
            (article) => { 
                this.setState({article, loading:false}) 
                this.setState({initialHtmlEditorState:article.body})
                this.fixDateStr()
            }, 
            (err) => { this.setState({err, loading:false}) })
    }

    fixDateStr = () => {
        let d = new Date(this.state.article.created);
        this.setState({
            createdDateStr : d.toLocaleDateString(0, { day: 'numeric', month: 'long', year: 'numeric'})
        })
    }


    // ACTION
    publishArticle = async () => {
        CmsService.publishArticle(this.state.article._id,()=>{
            let article = this.state.article
            article.published = true
            this.setState({article})
        })
    }

    unpublishArticle = async () => {
        CmsService.unpublishArticle(this.state.article._id,()=>{
            let article = this.state.article
            article.published = false
            this.setState({article})
        })
    }

    featureArticle = async () => {
        CmsService.featureArticle(this.state.article._id,()=>{
            let article = this.state.article
            article.featured = true
            this.setState({article})
        })
    }

    unfeatureArticle = async () => {
        CmsService.unfeatureArticle(this.state.article._id,()=>{
            let article = this.state.article
            article.featured = false
            this.setState({article})
        })
    }
    
    archiveArticle = async () => {
        CmsService.archiveArticle(this.state.article._id,()=>{
            let article = this.state.article
            article.archived = true
            this.setState({article})
        })
    }

    unarchiveArticle = async () => {
        CmsService.unarchiveArticle(this.state.article._id,()=>{
            let article = this.state.article
            article.archived = false
            this.setState({article})
        })
    }

    deleteForever = () => {
        if(this.state.article.published){
            alert('You cannot delete this article since it\'s currently published')
        }
        else{
            const doit = confirm('Are you sure you want to remove this article forever? This cannot be undone.')
            if(doit){
                CmsService.deleteArticle(this.state.article._id,()=>{
                    Router.push('/admin/cms')
                })
            }
        }
    }

    setCreatedToToday = () => {
        const state = this.state
        state.article.created = Date.now()
        state.createdDateStr = (new Date()).toLocaleDateString(0, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        this.setState(state)
    }

    updateArticleFieldFn = (field) => {
        return (e) => {
            const state = this.state        

            // handle special cases
            if(field ==='title'){
                const value = e.target.value    
                state.article[field] = value

                let slug = state.article.title
                slug = slug.toLowerCase()
                slug = slug.trim()
                slug = slug.replace(/[^a-zA-Z0-9 ]/g, "")
                slug = slug.replace(/[ ]/g, "-")
                state.article.slug = slug
                
            }
            else if(field === 'created') {
                const value = e.target.value
                state.createdDateStr = value
                state.article.created = state.createdDateStr ? new Date(state.createdDateStr) : 0
            }
            else if(field === 'body'){
                state.article.body = e
            }
            else{
                state.article[field] = e.target.value
            }

            this.setState(state)

        } 
    }

    saveArticle = async () => {
        this.setState({saving:true})
        
        if(this.props.slug){
            CmsService.updateArticle(
                this.state.article,
                this.saveSuccess,
                (err) => { alert(`Something went wrong while saving the article. ${err}`) }
            )
        }
        else{
            CmsService.createArticle(
                this.state.article,
                this.saveSuccess,
                (err) => { alert(`Something went wrong while creating the article. ${err}`) }
            )
        }
    }

    saveSuccess = () => {
        
        if(this.props.slug){
            this.setState({ saving: false, doneSaving:true })
            setTimeout(()=>{ this.setState({doneSaving:false}) }, 1700)
        }
        else{
            this.setState({
                saving: false,
                doneSaving:true,
                reloading:true
            })
            setTimeout(()=>{ Router.push(`/admin/cms/edit/${this.state.article.slug}`) }, 1700)
        }
        
    }

    get toggleOptions () {
        return (
            <div>
                <br /><hr /><br />                                

                <li>
                    <Link href={`/admin/cms/preview/${this.state.article.slug}`}><a style={{color:colorDark, textDecoration:'none'}} target="_blank">
                    <i className="material-icons">remove_red_eye</i>&nbsp;
                    Preview Article
                    </a></Link>
                </li>
                { !this.state.article.published ? 
                    <li>
                        <span style={{cursor:'pointer'}} onClick={this.publishArticle}>
                            <i className="material-icons">public</i>&nbsp;
                            Publish
                        </span>
                    </li> :
                    <li>
                        <span style={{cursor:'pointer'}} onClick={this.unpublishArticle}>
                            <i className="material-icons">vpn_lock</i>&nbsp;
                            Make Private
                        </span>
                    </li>
                }
                { !this.state.article.featured ? 
                    <li>
                        <span style={{cursor:'pointer'}} onClick={this.featureArticle}>
                            <i className="material-icons">star</i>&nbsp;
                            Make this article featured
                        </span>
                    </li> :
                    <li>
                        <span style={{cursor:'pointer'}} onClick={this.unfeatureArticle}>
                            <i className="material-icons">star_half</i>&nbsp;
                            Unfeature this article
                        </span>
                    </li>
                }
                { !this.state.article.archived ? 
                    <li>
                        <span style={{cursor:'pointer'}} onClick={this.archiveArticle}>
                            <i className="material-icons">archive</i>&nbsp;
                            Archive Article
                        </span>
                    </li> :
                    <li>
                        <span style={{cursor:'pointer'}} onClick={this.unarchiveArticle}>
                            <i className="material-icons">unarchive</i>&nbsp;
                            Unarchive Article
                        </span>
                    </li>
                }
                <li>
                    <span style={{cursor:'pointer'}} onClick={this.deleteForever} >
                        <i className="material-icons">delete</i>&nbsp;
                        Delete Article Forever
                    </span>
                </li>
            </div>
        )
    }


    get articleEditView() {
        return (
            <CompactContainer>

                <Center>
                    <StealthEditor h1 center placeholder='title' value={ this.state.article.title } onChange={ this.updateArticleFieldFn('title') }/>
                    <StealthEditor center placeholder='slug' value={ this.state.article.slug } onChange={ this.updateArticleFieldFn('slug') }/>
                </Center>

                <br /><br />

                <div>
                    <h3>Summary</h3>
                    <StealthEditor placeholder='summary' value={ this.state.article.summary } onChange={ this.updateArticleFieldFn('summary') } />
                </div>

                <br /><br />

                <div>
                    <h3>Thumbnail</h3>
                    <ImageDiv height='200' width='200' cover round img={this.state.article.thumb || 'http://www.theemailcompany.com/wp-content/uploads/2016/02/no-image-placeholder-big-300x200.jpg' } />
                    <br />
                    <StealthEditor placeholder="img thumb url" value={this.state.article.thumb} onChange={ this.updateArticleFieldFn('thumb') } />
                </div>

                <br /><br />

                <div>
                    <h3>Article Body</h3>
                    <HtmlEditor
                        instantiateWithModel={this.state.initialHtmlEditorState}
                        onChange={this.updateArticleFieldFn('body')}
                    />
                </div>

                <br /><br />

                <div>
                    <h3>Setup</h3>
                    <CleanList>
                        <li>
                            <i className="material-icons">person</i>&nbsp;
                            Author: &nbsp;
                            <StealthEditor placeholder="author" value={this.state.article.author} onChange={ this.updateArticleFieldFn('author') } />
                        </li>
                        <li>
                            <i className="material-icons">calendar_today</i>&nbsp;
                            Created on ( {this.state.article.created ? <DateEpoch epoch={this.state.article.created} /> : (<span onClick={this.setCreatedToToday} style={{cursor:'pointer'}} > <i style={{fontSize:'0.8em'}} className="material-icons">calendar_today</i> today</span>) } ) : &nbsp;
                            <StealthEditor placeholder="date ( format: Jun 21 2018 | 06/21/2018 ) " value={this.state.createdDateStr} onChange={ this.updateArticleFieldFn('created') } />
                        </li>

                        { this.props.slug ? this.toggleOptions : '' }

                    </CleanList>

                    <br/><hr/><br/>

                    <Center>
                        {
                            this.state.saving ? 
                            <span>Saving...</span> :
                            (
                                this.state.saveError ? 
                                <ErrorSpan>{this.state.saveError}</ErrorSpan> : 
                                (
                                    this.state.doneSaving ? 
                                    <SuccessSpan>Saved! {this.state.reloading ? 'Reloading page...' : ''}</SuccessSpan> :
                                    <SaveButton onClick={this.saveArticle}> <i className="material-icons">save</i> Save </SaveButton>
                                ) 
                            )
                            
                        }
                        
                    </Center>

                    <br /><br /><br />

                </div>

            </CompactContainer>
        )
    }

    get errorView(){ 
        return (
            <Center>
                <img src="/static/resource-icons/bad_window.png" height="130px"/>
                <h3 style={{color:colorError}} >{this.state.err}</h3>
            </Center>
        )
    }

    render(){
        if(this.state.loading){
            return <div>
                <Loader black />
                <h2>Loading... </h2>
            </div>
        }
        else if(this.state.err){
            return this.errorView
        }
        else{
            return this.articleEditView
        }
    }

}


export default ArticleEditor


