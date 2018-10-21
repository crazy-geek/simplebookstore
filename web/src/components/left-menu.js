import React, { Component } from 'react'
import {ListGroup,Form} from 'react-bootstrap'

export class LeftMenu extends Component {
  
    state = {
        isSelected : true,
        selectedItems : []
    }

    render() {
          return (
            <ListGroup className='boxShadow'>
                <ListGroup.Item variant="dark" text="white">
                    <strong>Filter books</strong> 
                </ListGroup.Item>
                {
                    this.props.data.map((element,idx) => {
                        return (
                        <ListGroup.Item key={idx.toString()} text="white">
                        <Form.Check 
                            type='checkbox'
                            id={element._id}
                            label={element.category_name} 
                            onClick = {this.props.filter.bind(this, element)}
                            value = {element.category_name}
                                           
                        />
                         </ListGroup.Item>
                   )})
                }
            </ListGroup>
        );

    }
}