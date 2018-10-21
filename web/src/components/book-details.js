import React, { Component } from 'react'
import { Modal, Container, Row, Col, Button } from 'react-bootstrap'

export class BookDetails extends Component {
  server = 'http://localhost:8081/'
  render() {
    return (
      <Modal size='lg' show={this.props.show} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton onClick={this.props.hidemodal} >
          <Modal.Title id="contained-modal-title-vcenter">
          {this.props.book.title} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:'500px', overflow:'auto'}}>
          <Container>
            <Row className="show-grid">
              <Col>
                <img src= {this.server+'/'+this.props.book.cover_image} 
                  alt={this.props.book.title}
                  style={{width:'400px', height:'500px'}}>
                  </img>
              </Col>
              <Col className='pull-right'>
              <Row>
                <Col style={{padding:'6px', borderBottom:'solid 1px #ccc'}}>
                 <div style={{width:'120px', display:'inline-block', marginBottom:'solid 1px #ccc'}}>
                    Author:
                 </div>  
                 <code>{this.props.book.author}</code>
                </Col>
              </Row>
              <Row>
                <Col style={{padding:'6px', borderBottom:'solid 1px #ccc'}}>
                  <div style={{width:'120px', display:'inline-block', marginBottom:'solid 1px #ccc'}}>
                    Publisher:
                  </div>
                  <code>{this.props.book.publisher}</code>
                </Col>
              </Row>
              <Row>
                <Col style={{padding:'6px', borderBottom:'solid 1px #ccc'}}>
                  <div style={{width:'120px', display:'inline-block', marginBottom:'solid 1px #ccc'}}>
                    Medium: 
                  </div>
                  <code>{this.props.book.medium}</code>
                </Col>
              </Row>
              <Row>
                <Col style={{padding:'6px', borderBottom:'solid 1px #ccc'}}>
                  <div style={{width:'120px', display:'inline-block'}}>
                    Category: 
                  </div>
                  <code>{this.props.book.category}</code>
                </Col>
              </Row>
              <Row>
                <Col style={{padding:'6px', borderBottom:'solid 1px #ccc'}}>
                  <div style={{width:'120px', display:'inline-block'}}>
                    Price: 
                  </div>
                  <code>{this.props.book.price}</code>
                </Col>
              </Row>
              <Row>
                <Col style={{padding:'6px', borderBottom:'solid 1px #ccc'}}>
                  <div style={{width:'120px', display:'inline-block'}}>
                    Description: 
                  </div>
                  <code>{this.props.book.description}</code>
                </Col>
              </Row>
            </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hidemodal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}