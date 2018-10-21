import React, { Component } from 'react'
import {Card,Container,Row, Col,Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export  class OrderList extends Component {
  server = 'http://localhost:8081'
  state = {
    notes: '',
    orders :[],
    orderstatus:'',
    loaded:false
  }
  componentDidMount = () =>{
    this._getPendingOrders()
  }
  
  _getPendingOrders = () => {
    axios.get(this.server +'/orders')
    .then(result => {
     //this.setState({orders: this.state.orders.concat(result.data)})
     this.setState({orders: result.data.slice()})
    })
    .catch(err =>{
      NotificationManager.error('Something went wrong, please try after some time')
    })
  }

  updateOrderHandler = (orderId, evt) =>{
    this.setState({orderstatus:'closed'})
    axios.patch(this.server + '/order',{id:orderId, completion_note:this.state.notes, status:'closed'})
    .then(result => {
      NotificationManager.success('Order closed successfully')
      this.setState({orderstatus:''})
      this.setState({order:[]})
      this._getPendingOrders()
    }).catch(err => {
      this.setState({orderstatus:''})
      NotificationManager.error('Something went wrong, please try after some time')

    })

  }

  render() {
    if(this.state.orders.length === 0){
      return (<div className='boxShadow' style={{backgroundColor:'#88f2fe', display:'flex',margin:'auto', width:'550px'}}>
        <span style={{float:'center', margin:'auto', fontSize:'1.2em'}}>Hooray... No pending orders..</span>
      </div>)
    }

    return (
      this.state.orders.map( (order,idx) => {    
        return(<div key={idx} style={{width: '18rem', 
            display:'inline-block',margin:'3px'}}>
            <Card bg="light" style={{ width: '18rem' }}>
              <Card.Header>
                By: {order.user.name}<code style={{fontSize:'0.6em'}}> [on: 
                  {new Date(order.order_date).getDate()}/
                  {new Date(order.order_date).getMonth()}/
                  {new Date(order.order_date).getFullYear()}
                  ]</code>
              </Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col><strong>Order address</strong></Col>
                  </Row>
                  <Row>
                    <Col><small><pre>{order.user.address}</pre></small></Col>
                  </Row>
                  <Row>
                    <Col><strong>Order items</strong></Col>
                  </Row>
                  <Row>
                    <Col>
                     {order.orderItems.map(item => {
                       return(<div key={item._id}>
                        <small>{item.book_title}</small>
                        <small style={{padding:'10px'}}>(Rs.{item.book_price})</small>
                        <small style={{padding:'5px'}}> X {item.qty}</small>
                       </div>)
                     })
                     }
                     <small>Order Total: <strong>Rs.{order.order_total}</strong></small>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" required 
                          placeholder="Completion Notes"
                          onChange = {evt=> this.setState({notes:evt.target.value})}
                        />
                    </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    {/* {this.state.orderstatus === ''&& */}
                      <Button onClick={this.updateOrderHandler.bind(this,order._id)}
                      disabled = {this.state.orderstatus === 'closed'}
                      >
                        Mark this order as complete
                      </Button>
                    {/* } */}
                    {/* {this.state.orderstatus === 'closed'&&
                      <Button disabled>
                        Order Completed successfully
                      </Button>
                    } */}
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
        </div>
      )})
    )
  }
}
