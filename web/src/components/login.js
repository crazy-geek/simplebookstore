import React, {Component} from 'react'
import {Card, Button, Form,Modal} from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'
import {Redirect} from 'react-router-dom'


export class Login extends Component{

    state={
        username:'',
        password:'',
        loginSuccess: false
    };

    handleSubmit = (evt) =>{
        evt.preventDefault()
        
        if(this.state.username==='admin' && this.state.password ==='admin')
        {
            localStorage.setItem('loggedInUser',JSON.stringify(this.state))
            this.setState({loginSuccess:true})
            this.props.close();
        }else{
            localStorage.removeItem('loggedInUser')
            NotificationManager.error('Invalid username or Password, please try again')
            this.setState({loginSuccess:false})

        }
            
    }

    render(){
        return(
            <div>
             {this.state.loginSuccess&&
                   <Redirect from ='/'  to='/admin'></Redirect>
            } 
            <Modal size='lg'  show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your Login credentials</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Card className='boxShadow'>
                <Card.Body>
                <Form method='GET' onSubmit={this.handleSubmit} action='/admin'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" required 
                            onChange = {evt=> this.setState({username: evt.target.value})}
                            placeholder="Username" />              
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required 
                            placeholder="Password"
                            onChange = {evt=> this.setState({password: evt.target.value})}
                            />
                    </Form.Group>
                    <Form.Text className="text-muted">
                             We'll never share your user name with anyone else.
                    </Form.Text>
                   <Button variant="primary" type="submit" 
                        style={{float:'right'}}>Login</Button>
                   </Form>
                   
                </Card.Body>
            </Card>
            </Modal.Body>  
            </Modal>
            </div>
        );
    };
}