// LIB
import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import styled, { css } from 'styled-components'

// COMPONENTS 
import { PageContainer, OptionCard, PaperDivider, Center, ErrorSpan, Loader, CleanList } from '../../components/_common'

// SERVICES
import { shadowL, transition } from '../../components/_theme';
import AdminService, { isLoggedIn, checkToken, loginAdmin } from '../../services/adminService';


class Admin extends React.Component {

    constructor(props){
        super(props)
        this.state = {loading:true, loggedIn:false, user:'', password:''}
    }

    getInitialProps({req}){
        // note that : 
        // this.props.req is always undefined
        // FIXME: figure out SSR with JWT auth (not urgent at all, so chill)
        return {}
    }

    componentDidMount(){
        AdminService.requiresAuth(
            () => this.setState({loading:false, loggedIn : true}),
            () => this.setState({loading:false, loggedIn : false})
        )
    }

    login = async () => {
        AdminService.login(this.state.user, this.state.password,
            (token)=>{
                this.setState({token, loggedIn:true})
            },
            (errorMsg)=>{
                this.setState({errorMsg, loggedIn:false})
            }
        )
    }

    logout = () => {
        localStorage.removeItem('admin:token')
        this.setState({ loggedIn : false, user:'', password:'' })
    }


    get actions() {
        return [
            {color: '#a956bf', label: 'Home', icon: 'home', href:'/'},
            {color: '#FFAF4A', label: 'Users', icon: 'accessibility', href:'/admin/users'},
            {color: '#2A8CD4', label: 'Manage Articles', icon: 'chrome_reader_mode', href:'/admin/cms'},
            {color: '#44CC87', label: 'Create Article', icon: 'create', href:'/admin/cms/new'},
            {color: '#171717', label: 'Dev', icon: 'code', href:'/admin/dev'},
        ]
    }

    get menu(){
        return (
            <CleanList>
                { this.actions.map( (x,i)=>( 
                    <Link key={i} href={x.href}><a>
                        <OptionCard borderColor={x.color}> 
                            <i className="material-icons" >{x.icon}</i><br /><br /> 
                            {x.label}
                        </OptionCard>
                    </a></Link>  
                ))}
                <OptionCard borderColor='#BDBDBD' onClick={this.logout} > 
                    <i className="material-icons" >exit_to_app</i><br /><br /> 
                    Logout
                </OptionCard>
            </CleanList>
        )
    }

    updateUserInput = (event) =>{
        let state = this.state
        state.user = event.target.value
        this.setState(state)
    }

    updatePasswordInput = (event) => {
        let state = this.state
        state.password = event.target.value
        this.setState(state)
    }

    get loginScreen(){
        return (
            <Center>
                <img src='https://image.flaticon.com/icons/svg/762/762719.svg' width={100} /><br /><br />
                {this.state.errorMsg ? <ErrorSpan>{this.state.errorMsg}<br/><br/></ErrorSpan> : <div><br/><br/></div>}
                <input style={ {fontSize:'1em'} } placeholder='user' type='text' value={this.state.user} onChange={this.updateUserInput} /> 
                <br /><br />
                <input style={ {fontSize:'1em'} } placeholder='pass' type='password' value={this.state.password} onChange={this.updatePasswordInput} /> 
                <br /><br />
                <button onClick={this.login} style={ {fontSize:'1em'} }>Log in</button>
            </Center>
        )
    }

    get loadingScreen() {
        return (
            <div>
                <Loader black />
                <h1>Loading...</h1>
            </div>
        )
    }

    render(){
        return (
            <PageContainer>
                <h1>Admin</h1>
                <PaperDivider  />
                <br />

                { this.state.loading ? 
                    this.loadingScreen
                    : (this.state.loggedIn ? this.menu : this.loginScreen) 
                }
                
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










