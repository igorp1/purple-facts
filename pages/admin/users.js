// LIB
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

// COMPONENTS
import { PageContainer, PaperDivider, Loader, CleanList, Center } from '../../components/_common'
import AdminService from '../../services/adminService';
import ObjectTable from '../../components/ObjectTable';
import UserManagementService from '../../services/userManagementService';
import { colorPrimary, colorError } from '../../components/_theme';
import EventTimeline from '../../components/EventTimeline';

const UserListRow = styled.li`

    div.preview{
        display: flex;
        justify-content: space-between;
        button{border:solid 3px white;}
        button.active{
            border-bottom: solid 3px ${colorPrimary};
        }
    }
    div.data{ margin-bottom: 30px; }
`


class UserManagement extends React.Component {

    state = {
        loading:true, 
        userList:[], 
        searchTerm:'',
        error : ''
    }

    async componentDidMount(){
        AdminService.requiresAuth(
            ()=>{ this.loadUserList(); }
        )
    }

    checkHashForUser = () =>{
        this.setState({searchTerm : window.location.hash.replace('#','')})
    }

    loadUserList = () => {
        UserManagementService.getUsers(
            (userList)=> { 
                this.checkHashForUser()
                this.setState({userList, loading:false})
                this.startUpdateEvents() 
            },
            ( error ) => { this.setState({error, loading:false}) }
        )
    }

    startUpdateEvents = () => {
        setInterval(()=>{
            this.filteredUserList.forEach( user => { 
                if(user.hidden.displayEvents)
                    this.loadEventsForUser(user, true)
            })
        }, 1500)
    }

    updateSearch = (e) => {
        this.setState({searchTerm : e.target.value})
    }

    toggleDisplayData = (user) => {
        if(!user.hidden) user.hidden = {}
        user.hidden.displayData = !user.hidden.displayData
        this.updateUserOnState(user)
    }

    toggleDisplayEvent = (user) => {
        if(!user.hidden) user.hidden = {}
        user.hidden.displayEvents = !user.hidden.displayEvents

        if(user.hidden.displayEvents && !user.hidden.events){
            this.loadEventsForUser(user)
        }

        this.updateUserOnState(user)
    }

    loadEventsForUser = (user, hideLoading) =>{
        if(!hideLoading) user.hidden.loadingEvents = true
        this.updateUserOnState(user)
        UserManagementService.getEventsForUser(
            user._id,
            (events)=>{ 
                user.hidden.events = events
                if(!hideLoading) user.hidden.loadingEvents = false
                this.updateUserOnState(user)
            },
            ()=>{  }
        )
    }

    updateUserOnState = (user) => {
        let userList = this.state.userList
        userList = userList.map( savedUser => {   
            if( savedUser._id === user._id ) return user
            else return savedUser
        })
        this.setState(userList)
    }

    dataObjectContains = (searchTerm, obj) => {
        const keyList = Object.keys(obj)
        searchTerm = searchTerm.toLowerCase()
        for(let i=0; i < keyList.length; i++){
            // because they all have id
            const key = keyList[i]
            if(key !== '_id' && key.toLowerCase().includes(searchTerm) ) return true
            
            if(!obj[key]) continue
            const value = obj[key].toString().toLowerCase()
            if( value.includes(searchTerm) ) return true
        }
        return false
    }

    get filteredUserList(){
        return this.state.userList
            .filter( userObj => this.dataObjectContains(this.state.searchTerm, userObj) )
            .map( x => {
                if(!x.hidden) {
                    x.hidden = {}
                    return x
                }
                else{ return x }
            })
    }

    userRow = (user) => {
        return (
            <UserListRow key={user._id} style={{borderBottom:'1px solid rgba(0,0,0,.1)', padding:'12px'}} >
                <div className='preview'>
                    <div>
                    { user.email ? 
                        <a href={`mailto:${user.email}`} >{user.email}</a> : 
                        <span>{user._id}</span>
                    }
                    </div>
                    <div>
                        <button className={ user.hidden.displayData ? 'active' : '' } onClick={()=>{ this.toggleDisplayData(user)} }>DATA</button> &nbsp;
                        <button className={ user.hidden.displayEvents ? 'active' : '' } onClick={()=>{ this.toggleDisplayEvent(user)} }>EVENTS</button> 
                    </div>
                </div>
                <div className='data' hidden={ !user.hidden.displayEvents && !user.hidden.displayData }> 
                    <div hidden={!user.hidden.displayData}>
                        <h3>USER DATA</h3>
                        <ObjectTable data={user} />
                    </div>
                    <div hidden={!user.hidden.displayEvents} >
                        <h3>USER EVENTS</h3>
                        <h4 hidden={!user.hidden.loadingEvents} >Loading...</h4>
                        <EventTimeline events={user.hidden.events} />
                    </div>
                </div>
            </UserListRow>
        )
    }

    get userTable() {
        return (
            <div>
                <Center>
                    <input value={this.state.searchTerm} onChange={this.updateSearch} placeholder="Search for user data or data field " style={{fontSize:'1em', padding: '10px', minWidth:'300px', width:'60%'}} />
                </Center>
                {
                    this.filteredUserList.length ? (
                        <CleanList>
                            { this.filteredUserList.map(this.userRow) }
                        </CleanList>
                    ) : this.emptyScreen
                }
                
            </div>
        )
    }

    get errorScreen() {
        return (
                <Center style={{marginTop:'40px'}} >
                    <img src="/static/resource-icons/bad_window.png" height="130px"/>
                    <h3>{this.state.error}</h3>
                </Center>
        )
    }

    get emptyScreen() {
        return (
                <Center style={{marginTop:'40px'}} >
                    <img src="/static/resource-icons/bad_window.png" height="130px"/>
                    <h3>No user data to show</h3>
                </Center>
        )
    }

    get loadingScreen() {
        return (
            <div>
                <Loader black /> 
                <h3>Loading...</h3>
            </div>
        )
    }


    render(){
        let content
        if(this.state.error) content = this.errorScreen
        else if(this.state.loading) content = this.loadingScreen
        else content = this.userTable

        return(
            <PageContainer>
                <h1>Users</h1>
                <Link href="/admin"><a>Back to Admin</a></Link> 
                <br/><PaperDivider /><br/>
                {content}
            </PageContainer>
        )
    }

}

export default UserManagement
