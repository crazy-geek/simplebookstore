import React, { Component } from 'react'
import { Navbar,Nav, Button, Container } from 'react-bootstrap'

import {NavLink} from 'react-router-dom'
import Logo from '../images/logo.png'
import { Login } from './login';

export class TopBar extends Component {
    state ={
        showLogin:false,
        isLogout:false,
    }

    loginHandler=(evt)=>{
        evt.preventDefault()
        this.setState({showLogin:true})
    }
    logoutHandler = () =>{
        localStorage.removeItem('loggedInUser');
        this.setState({isLogout:true})
        this.props.history.push('/')
    }
    closeLoginModal = () => {
        this.setState({showLogin:false})
    }

    render() {
        return (
        <div>
            {/* {this.state.isLogout&&
                <Redirect to='/' from= '/admin'/>
            } */}
            <Navbar bg="secondary" variant="dark" className='boxShadow'>
                <Navbar.Brand href="/">  
                    <img alt='logo' src={Logo} height="60px" width="220px">
                </img></Navbar.Brand>
                <Nav className="mr-auto"  style={{marginTop:'30px'}}>
                   <div  style = {{padding:'15px'}} >
                        <NavLink style = {{color:'#ffcc00'}} activeStyle={{color:'#fff'}} to='/' exact>Home</NavLink>
                   </div> 
                   <div  style = {{padding:'15px',  textColor:'#ffcc00'}} >
                        <NavLink style = {{color:'#ffcc00'}} activeStyle={{color:'#fff'}} to="/order">Selected Books</NavLink>
                    </div>
                    <div  style = {{padding:'15px', texColor:'#ffcc00'}} >
                        <NavLink style = {{color:'#ffcc00'}} activeStyle={{color:'#fff'}} to="/about">About</NavLink>
                    </div>
                </Nav>
                    
                <Nav style={{marginTop:'30px'}}> 
                        {!localStorage.getItem('loggedInUser')&&
                            <Button variant='info' onClick={this.loginHandler}>Admin Login</Button>
                        }
                        {localStorage.getItem('loggedInUser')&&
                        <div>
                            <Container className='boxShadow' 
                                style = {{borderRadius:'10px', 
                                    backgroundColor:'#101010', margin:'5px', 
                                    padding:'5px', texColor:'#ffcc00'}} >
                                <NavLink  style = {{color:'#ffcc00'}} 
                                    activeStyle={{color:'#fff'}} 
                                    to="/admin">Admin Section
                                    </NavLink>
                            </Container>
                            <Container>
                                <Button variant='info' onClick={this.logoutHandler}>Logout</Button>
                             </Container>
                                
                        </div>
                        }
                </Nav>
            </Navbar>
            <Login show={this.state.showLogin} close={this.closeLoginModal}/>
        </div>
        );
    };
}