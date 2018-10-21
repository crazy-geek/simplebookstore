import React, {Component} from 'react'
import {Carousel} from 'react-bootstrap'

export class HomeCarousel extends Component {
    render(){
        return (
            <Carousel fade={true} className='boxShadow' style={{height:'auto'}}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="./images/study.jpg"
                    alt="study"
                    height="450px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src='./images/shelf.jpg'
                    alt="shelf"
                    height="450px"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="./images/shelf1.jpg"
                    alt="Shelf" 
                    height="450px"  
                    />
                </Carousel.Item>
                
            </Carousel>
        );
    }
}