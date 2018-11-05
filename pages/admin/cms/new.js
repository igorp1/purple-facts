// LIB
import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

// COMPONENTS 
import { PageContainer, PaperDivider, Loader } from '../../../components/_common'

// SERVICES
import AdminService from '../../../services/adminService';
import ArticleEditor from '../../../components/ArticleEditor';

class CmsNew extends React.Component {
    
    state = {loading:true}

    componentDidMount() {
        AdminService.requiresAuth(()=>{
            this.setState({loading:false})
        })
    }

    render(){
        return (
            <PageContainer>
                <h1>New Article</h1>
                <Link href='/admin'><a>Admin</a></Link> | <Link href='/admin/cms' ><a>Articles</a></Link> 
                <PaperDivider space />
                { this.state.loading ? (<div><Loader black /><h2>Loading...</h2></div>) : <ArticleEditor /> }
            </PageContainer>
        )
    }

}

export default withRouter(CmsNew)









