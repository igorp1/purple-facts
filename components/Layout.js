// LIB
import React from 'react'
import styled from 'styled-components'

// COMPONENT
import Header from './Header'
import Footer from './Footer'

class LayoutBase extends React.Component{

  render() {
    return (<div>
      {this.props.children}
    </div>)
  }

}

const ResponsivePage = styled.div`
  @media all and (max-width: 895px) {padding-top: 60px;}
`

const Layout = (props) => (
  <LayoutBase>
    <Header />
      <ResponsivePage>
        {props.children}
      </ResponsivePage>
    <Footer />
  </LayoutBase>
)

export default Layout

