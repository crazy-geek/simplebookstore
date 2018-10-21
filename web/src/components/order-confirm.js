import React, { Component } from 'react'
import {Modal, Col, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export default class ConfirmOrder extends Component {
    server = 'http://localhost:8081'
    state = {
            name:'',
            phone:'',
            mobile:'',
            address:'',
            pin:'',
            landmark:''
          
    }

    completeOrderHandler = (evt) => {
        evt.preventDefault();
        if(this.state.name.trim().length === 0 || this.state.mobile.trim().length === 0 ||
            this.state.address.trim().length === 0 || this.state.pin.trim().length === 0){
                NotificationManager.error('Fill all the required fields before submit your order')
                return false;
            }
        let user = {
            name : this.state.name,
            phone: this.state.mobile, 
            address: this.state.address, 
            pin: this.state.pin, 
            landmark: this.state.landmark
        }
       
        let orderItems = this.props.data.map( elem => {
                 return ({
                     book_id : elem._id,
                     book_title:  elem.title,
                     book_price: elem.price,
                     qty: elem.qty
                    })
          })
        
        let order = {
            order_date: Date.now(),
            user:  user,
            orderItems: orderItems,
            order_total: this.props.data.reduce ((total, elem) => total + (elem.price * elem.qty),0),
            status: 'active',
            completion_note:''
        }

        axios.post(this.server + '/order', order)
            .then(result => {
                NotificationManager.success('Your Order has been placed successfully');
                this.props.data.splice(0,this.props.data.length)
                this.props.close()
            })
            .catch(err => {
                NotificationManager.error('Something went wrong, Please try again' + err);
            })
    }

  render() {
    return (
        <Modal size='lg'  show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your details to send order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control  type="text"
                            placeholder="Enter Full Name (required)" 
                            onChange = {evt => this.setState({name : evt.target.value})}
                            />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridAuthor">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" 
                            placeholder="Enter Phone Number" 
                            onChange = {evt => this.setState({phone : evt.target.value})}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPublisher">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" required
                            placeholder="Enter Mobile Number (required)" 
                            onChange = {evt => this.setState({mobile : evt.target.value})}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridDesc">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows="4"  required
                        placeholder="Enter your full address (item will be send to this address)- required"
                        onChange = {evt => this.setState({address : evt.target.value})}
                        />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPublisher">
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control type="number" required
                            placeholder="Enter Postal code (required)" 
                            onChange = {evt => this.setState({pin : evt.target.value})}
                            />
                    </Form.Group>
                </Form.Row>
                 <Form.Row>
                    <Form.Group as={Col} controlId="formGridPublisher">
                        <Form.Label>Land mark</Form.Label>
                        <Form.Control type="text"
                             placeholder ="Enter a landmark near to your address (optional)"
                             onChange = {evt => this.setState({landmark : evt.target.value})}>
                        </Form.Control>
                    </Form.Group>
                </Form.Row> 

                <Form.Group controlId="formGridDesc">
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" onClick={this.completeOrderHandler}>
                            Complete your order
                        </Button>
                    </Modal.Footer>
                </Form.Group>
            </Form>     
          </Modal.Body>
        
        </Modal>
    )
  }
}
