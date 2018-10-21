import React, { Component } from 'react'
import { Card, Form, Row, Col, Container } from 'react-bootstrap'
import Add2Cart from '../images/Add-to-cart.png'
import Added from '../images/tick.png'
import Remove from '../images/Remove.png'


export class ContentCard extends Component {
    server = 'http://localhost:8081'

    addtocart = (book,evt) => {
        evt.stopPropagation()
        this.props.add(book);
        this.setState()
    }
    _setShoppingCartIcon = (book) => {
        if (this.props.cartItems.find(ele => ele._id === book._id))
            return Added
        return Add2Cart
    }
    QtyChangeHandler = (idx, evt) => {
       let newVal = evt.target.value
       this.props.onQtyChange(newVal, idx)
    }
    render() { 
        return (
            this.props.data.map((book, index) => {
            return(
                <div key={index} className='boxShadow'  
                    style={{ width: '14rem', display:'inline-block',margin:'6px'}}>
                <Card>
                    <Card.Img variant="top" src={this.server +'/'+ book.cover_image} 
                        style={{width: '14rem',height:'16rem'}}
                        onClick={this.props.click.bind(this, book)}
                        />
                    <Card.Body>
                        <Row style={{fontSize:'1.0em'}}>
                        <Col xs={12}>{book.title.substring(0,22) +'...'}</Col>
                        </Row>
                       
                        {/* </Row> */}
                        { this.props.view === 'all' && 
                         <Row >
                         <Col xs={7}>Rs.{book.price}</Col> 
                            <Col  className='boxShadow' style={{backgroundColor:'#99ee00',marginRight:'1px', float:'right'}}>
                                <Container>
                                <img src={this._setShoppingCartIcon(book)}
                                    onClick={
                                        this.props.cartItems.find(ele => ele._id === book._id) ? void(0) :
                                            this.addtocart.bind(this, book)} 
                                    style={{width:'24px', height:'24px', cursor:'pointer'}} 
                                    alt='Add to Card'>
                                </img>
                                </Container>
                            </Col> 
                       </Row>
                       }
                        { this.props.view === 'review'  &&
                        <div>
                            <Row>
                                <Col>Rs.{book.price}</Col> 
                            </Row>
                            <Row style={{borderTop:'solid 1px #ccc', paddingTop:'8px'}}>
                                <Col xs={7} style={{fontSize:'0.8em'}}>Quantity
                                    <Form.Control type="number" required 
                                        placeholder='1'
                                        defaultValue = '1'
                                        min = '1'
                                        onChange = {this.QtyChangeHandler.bind(this,index)}
                                        style={{width:'80px', height:'35px', fontSize:'1.0em'}}
                                    />
                                </Col>
                                <Col style={{paddingTop:'15px'}}>
                                    <Container>
                                    <img src={Remove}
                                        onClick={this.props.remove.bind(this, book,index)} 
                                        style={{width:'24px', height:'24px', cursor:'pointer'}} 
                                        alt='Remove from Card'>
                                    </img>
                                    </Container>
                                </Col> 

                            </Row>
                        </div>
                        }
                    </Card.Body> 
                </Card>
            </div>
            )})  
        )
    }
}