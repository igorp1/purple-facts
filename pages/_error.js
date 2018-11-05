// LIB
import React from 'react'
import Link from 'next/link'
import Helmet from 'react-helmet'

//COMPONENTS
import Layout from '../components/Layout'
import { OptionCard, PageContainer } from '../components/_common';

// SERVICES
import { reportBug } from '../services/_common';

export class ErrorMessage extends React.Component{

    constructor(props){
        super(props)
        this.state = {bugSent:false}
    }

    triggerBugReport = () => {
        this.setState({bugSent:true})
        // FIXME: call slack service
        // reportBug() 
    }

    render(){
        return (
            <div style={{textAlign: 'center'}}>
                <Helmet>
                    <title>Something went wrong here | Purple Facts</title>
                </Helmet>
                <br /><br />

                <h2>{ this.props.msg || (<span>We can't find what you are looking for...</span>)}</h2>
                <br /><br />

                {/* LINKS */}
                {this.props.goToCities ? 
                    <Link href="/cities"><OptionCard space>
                        <i className="material-icons">location_city</i><br /><br />
                        Find your City
                    </OptionCard></Link> : ''
                }
                <Link href="/blog"><OptionCard space>
                    <i className="material-icons">home</i><br /><br />
                    Go Home
                </OptionCard></Link>
                <Link href="/products"><OptionCard space>
                    <i className="material-icons">category</i><br /><br />
                    See products
                </OptionCard></Link>
                <Link href="/contact"><OptionCard space>
                    <i className="material-icons">chat</i><br /><br />
                    Contact
                </OptionCard></Link>
                <br /><br /><br /><br /><br />

                {/* BUG REPORT */}
                {this.state.bugSent ? 
                    <span>Thank you for letting us know!<br /> We just got notified and will be working on it.</span>
                    : <a style={{fontSize:'0.9em'}} onClick={this.triggerBugReport}> Is this a bug? PLease let us know</a>
                }

                <br />
            </div>
        )
    }

}

export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode }
    }
    
    render() {
        return (
            <Layout>
                <PageContainer>
                    <ErrorMessage />
                </PageContainer>
            </Layout>
        )
    }
}