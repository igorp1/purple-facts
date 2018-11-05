import React from 'react'
import App, {Container} from 'next/app'

import UserService from '../services/userService'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

    componentDidMount(){
        if(!localStorage.getItem('user:id')){ 
          UserService.logEvent('firstSiteVisit', {page:window.location.pathname}) 
          UserService.incrementVisit()
        }
        else{
          UserService.logEvent('returnSiteVisit', { page:window.location.pathname, visit_number: UserService.incrementVisit() })
        }
    }

  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <Component {...pageProps} />
    </Container>
  }
}