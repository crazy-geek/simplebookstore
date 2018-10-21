import React, {Component} from 'react'
import {Row, Col, Container,Card, Button} from 'react-bootstrap'
import {ContentCard} from '../components/content-cards'
import ConfirmOrder from './order-confirm';


export class ReviewOrder extends Component{
    state = {
        showPersonDetailForm :false,
        orderTotal : 0,
        orderItems: this.props.data,
        loaded:false
    }

    handleModalClose =() => {
        this.setState({showPersonDetailForm : false})
    }

    userFormVisibleHandler = ()=>{
        if(this.props.data.length > 0)
            this.setState({showPersonDetailForm:true})
        else{}
    }

    QtyChangeHandler = (val, idx) =>{
        this.props.data[idx].qty = val;
        this.setState({
            orderTotal: this.state.orderItems.reduce((total, elem)=>  total + (elem.price*elem.qty),0)
        })
    }
    removeItemHandler = (book,idx,evt) => {
        evt.stopPropagation()
          this.setState({
              orderItems: this.state.orderItems.filter(el => el !== book),
              orderTotal: this.state.orderItems.reduce((total, elem)=>  total + (elem.price * elem.qty),0)
            })
        this.props.data.splice(idx,1)
      }
    

    render(){
        if(this.props.data.length === 0){
            return (<div className='boxShadow' style={{backgroundColor:'#88f2fe', display:'flex',margin:'auto', width:'550px'}}>
              <span style={{float:'center', margin:'auto', fontSize:'1.2em'}}>Your cart is empty, please add items to proceed</span>
            </div>)
          }
        return(
            <div>
            <Container>
            <Row>
                <Col xs={12}>
                    <Card  border='primary'>
                        <Card.Header>Order Summary</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={4} style={{float:'left'}}>Number  of books (unique): {this.state.orderItems.length}</Col>
                                <Col xs={3}> Order Total: { 
                                        this.state.orderItems.reduce((total, elem)=>  total + (elem.price * elem.qty),0) 
                                }
                                </Col>
                                <Col xs={5}>
                                    <Button style={{float:'right', width:'100%'}} 
                                            className='bg-success' 
                                            onClick={this.userFormVisibleHandler}>Fill your details and Place Order </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ContentCard view='review' 
                        click={this.props.click} 
                        data = {this.state.orderItems} 
                        remove={this.removeItemHandler}
                        onQtyChange = {this.QtyChangeHandler}
                        ></ContentCard>
                </Col>
            </Row>
            </Container>
                <ConfirmOrder data ={this.props.data} show={this.state.showPersonDetailForm} close={this.handleModalClose} />
               
            </div>
            
        );
    };
}