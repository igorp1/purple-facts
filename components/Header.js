// LIB
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { withRouter } from 'next/router'
import { animateScroll } from 'react-scroll'
import styled, { css } from 'styled-components'

// COMPONENTS
import { Loader } from './_common'
import { colorPrimary, gradientPrimary, transition, shadowM, colorOffLight, logos, shadowL, colorDark, colorLight, colorConfirm } from './_theme'
import { gPageview } from '../services/googleAnalytics';
import UserService from '../services/userService';

// MAIN HEADER STYLES
const MainHeaderContainer = styled.div`
	background: linear-gradient(to left top, #2a2a2a, #252525, #202020, #1c1c1c, #171717);;
	padding-left: 1em;
	height: 80px;
	transition: ${transition};
	box-shadow: ${shadowL};
	img{ cursor:pointer; height:100%;}
	div.menu-icon-container{
			cursor: pointer;
			display: flex;
			align-items: center;
			i{
                color: white;
                font-size: 1.8em;
                margin-left: 0.5em;
			}
			@media all and (min-width: 895px) {
				display: none;
			}
	}
	@media all and (max-width: 895px) {
		width: 100vw;
		height: 60px;
		display: flex;
		position: fixed;
		box-shadow: ${shadowL};
		padding-left: 0;
		justify-content: space-between;
		div, a.logo-container, nav{
            width: 33%;
		}
		a.logo-container{ text-align: center; }
	}
`

const HeaderNav = styled.nav`
    display: flex;
    padding: 0 .5em;
    text-align: right;
    justify-content: flex-end;
    a{
        margin: 0.8em;
        font-size: 1.3em;
        align-self: center;
        text-decoration: none;
        transition: ${transition};
    }
    a:hover{
        font-weight: normal;
        text-decoration: underline;
    }
    ${props => props.top && css`
        height: 100%;
        float: right;
        a.link{color: ${colorLight};}
		i.material-icons{
			@media all and (max-width: 370px) {font-size:1.2em;}
			@media all and (max-width: 320px) {display:none;}
		}
        @media all and (max-width: 895px) {
            a.link{display:none;}
        }
        @media all and (max-width: 500px) {
            font-size: 0.7em;
            img{ width: 100%; }
            a{  font-size: 1em; }
        }
    `} 
    ${props => props.bottom && css`
        width: calc(100% - 1em);
        display: flex;
        flex-wrap: wrap;
        min-height: 55px;
        box-shadow: ${ shadowL };
        justify-content: center;
        background-color: rgb(238, 238, 238);
        a{color: ${ colorDark }; }
        @media all and (max-width: 895px) { display: none; }
    `} 

    ${props => props.side && css`
        top:0;
        left:-500px;
        width: 250px;
        z-index: 9999;
        height: 100vh;
        display: flex;
        position: fixed;
        overflow-y: scroll;
        box-shadow: ${shadowM};
        flex-direction: column;
        transition: ${transition};
		transition-duration: 0.8s;
        justify-content: flex-start;
        background: ${ gradientPrimary };
		opacity : 0.98;
        a, i{ color: ${colorLight}; }
        i { 
			cursor : pointer;
            margin-left: 0.3em;
            margin-top: 0.6em; 
        }
        div{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    `} 

    ${props => props.open && css`
        left:0;
    `} 
`

const HeaderCTA = styled.a`
    margin : 0;
    padding : .4em .8em;
    border-radius: 0.1em;
    color: ${colorDark};
    background-color: ${colorLight};
	text-align: center;
	&:hover{
	    color: ${colorPrimary};
	}
`


class Header extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			isLoadingPage : false,
			menuOpen : false
		};
		
		this.setupRouterTx();
	}

	setupRouterTx = () => {
		Router.onRouteChangeStart = () => this.setPageLoading(true)
		Router.onRouteChangeComplete = (url) => { 
			gPageview(url)
			fbq('track', 'PageView')
			UserService.logEvent('navigation', {page:url})
			this.setPageLoading(false)
		}
		Router.onRouteChangeError = () => this.setPageLoading(false)
	}

	setPageLoading = (value) => {
		let state = this.state;
		state.isLoadingPage = value;
		this.setState(state)
	}

	toggleMenu = () => {
		let state = this.state;
		state.menuOpen = !state.menuOpen;
		this.setState(state)
	}

	get navLinks(){
		const links = [
			{label:'Our company', href:'/about'},
			{label:'Products', href:'/products'},
			{label:'Features', href:'/products/features'}
		]
		return links.map( (x,i) => (<Link key={`n_${i}`} href={x.href}><a className="link">{x.label}</a></Link>) );
	}

	get hiddenLinks(){
		const links = [
			{label:'Contact', href:'/contact'},
			{label:'Get Started', href:'/get-started'},
		]
		return links.map( (x,i) => (<Link key={`h_${i}`} href={x.href}><a className="link">{x.label}</a></Link>) );
	}

	get allLinks(){
		return [...this.navLinks, ...this.hiddenLinks]
	}

	render() {
		return (
			<header>
				<Loader purple hidden={!this.state.isLoadingPage} style={ {position : 'fixed', top:'0', left:'0', width:'100vw'} }/>

				{/* MAIN HEADER  */}
				<MainHeaderContainer>
					<div className="menu-icon-container" onClick={this.toggleMenu}>
						<i className="material-icons">menu</i>
					</div>
					<Link href="/">
						<img alt="Purple Facts logo" src={logos.svg.purple} />
					</Link>
					<HeaderNav top>
						{this.navLinks}
						<Link href="/get-started">
                            <HeaderCTA onClick={ ()=>{UserService.logEvent('callToAction', { cta_label:'get started','page':'header' })} }>
                                Get Started 
                            </HeaderCTA>
						</Link>
					</HeaderNav>
				</MainHeaderContainer>

				{/* SIDE NAV */}
				<HeaderNav side open={this.state.menuOpen} >
					<i className="material-icons" onClick={this.toggleMenu}>close</i>
					<div> {this.allLinks} </div>
				</HeaderNav>
			</header>
		)
	}

}
export default withRouter(Header)

