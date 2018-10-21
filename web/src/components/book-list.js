import React, { Component } from 'react'
import {ListGroup, Row, Col, Form} from 'react-bootstrap'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import axios from 'axios'

export class BooksList extends Component {
  server = 'http://localhost:8081'
  state = {
    books: [],
    selectedValue:''
  }

  componentDidMount = () =>{
    axios.get(this.server + '/books')
      .then(result => {
        this.setState({books : this.state.books.concat(result.data)})
      })
      .catch(err => {
        NotificationManager.error('Something went wrong, please try again after some time')
      })
  }

  statusChangeHandler = (bookId,evt) =>{
    let selvalue = evt.target.value
    console.log(selvalue)
    axios.patch(this.server+'/book', {id: bookId, status:selvalue})
      .then(result=>{
        this.setState({selectedValue : selvalue})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
  
    return (
      this.state.books.map(book => {
        return(
        <ListGroup key={book._id}>
        <ListGroup.Item action variant="success">
          <Row>
              <Col xs={1}>
                <img src={this.server +'/'+ book.cover_image} height='50px' width='40px' alt='cover thumbnail'/>
              </Col>
              <Col xs={9}>{book.title}</Col>
              <Col xs={2}>
              <Form.Control as="select"
                  value = {this.setState.selectedValue}
                  defaultValue = {book.status}
                  onChange={this.statusChangeHandler.bind(this,book._id)}>
                    <option value='available'>Available</option>
                    <option value ='out-of-stock'>Out of Stock</option>
                </Form.Control>
                
              </Col>
             
          </Row>
        </ListGroup.Item>
        <NotificationContainer/>
      </ListGroup>)
    }))
  }
}
