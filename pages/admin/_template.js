// LIB
import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styled, { css } from 'styled-components'

// COMPONENTS 
// 1. Fix import paths for components and services
import Layout from '../../components/Layout' // 2. Add layout with header and footer
import { PageContainer } from '../../components/_common'

// SERVICES
import { shadowL, transition, colorOffDark } from '../../components/_theme'; // 4. DRY : import common theme elements


// 5. Create custom CSS for clean and reusable style
const CleanList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    li{
        margin:5px; 
        padding:15px;
        cursor: pointer;
        transition : ${transition}
    }
    li:hover{box-shadow: ${shadowL} }
    ${props => props.width300 && css` 
        width : 100%;
        max-width: 350px;
    `}
` 

class Admin extends React.Component {

    static getInitialProps({res, req, query}) {
        return {} // 6. Return the props object
    }

    // 7. Add getters to build UI pieces and keep render clean
    get actions() {
        const links = [
            {label: 'Home', href:'/'},
            {label: 'About', href:'/about'}
        ]
        return links.map( (listItem,i) => (
            <li key={i}>
            {/* 8. Use Link object to add href for smooth nav */}
                <Link href={listItem.href} >
                    <a>{listItem.label}</a>
                </Link>
            </li>
        ))
    }

    render(){
        return (
            <PageContainer>
                <h1>Template</h1>
                {/* 9. Use your custom styles like any other jsx element */}
                <CleanList width300>
                    {/* 10. Just add props to trigger style variations */}
                    {this.actions}
                </CleanList>
            </PageContainer>
        )
    }

}

export default withRouter(Admin) // 11. Pages must have the default export

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










