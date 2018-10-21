import React, { Component } from 'react'
import { Form, Col, Button, Card } from 'react-bootstrap'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import axiois from 'axios'

export class Category extends Component {
    server = 'http://localhost:8081'
    state = {
        name: '',
        description: ''
    }
    handleSubmit = (evt) =>{
        evt.preventDefault();
        console.log(this.state.name, this.state.description)
        let category = {
            name: this.state.name,
            description: this.state.description
        }
        axiois.post( this.server + '/category', category)
            .then(response => {
                NotificationManager.success('Category created successfully.')
            })
            .catch(err => {
                NotificationManager.error('Something went wrong, please try after some time.')
            })
    }


    render() {
        return (
            <Card bg='light'>
                <Card.Header>Create new book Category</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control required ref='name' type="text"
                                    onChange = {evt => this.setState({name: evt.target.value})}
                                    placeholder="Enter category name" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control ref='desc' as="textarea" 
                                    rows="4"  placeholder="Enter description (optional)"
                                    onChange = {evt => this.setState({description: evt.target.value})}
                                    />
                        </Form.Group>
                        <Form.Row style={{float:'right'}}>
                            <Col >
                                <Button variant="danger" type="reset" >
                                    Reset Form
                                </Button>
                            </Col>
                            {/* <Col> */}
                                <Button variant="success" type="submit" >
                                  Save Category
                                </Button>
                             {/* </Col> */}
                        </Form.Row>
                    </Form>
                    <NotificationContainer/>
                </Card.Body>
            </Card>
        );
    }
}