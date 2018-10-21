import React, {Component} from 'react'
import {Card, Form, Col, Button, ProgressBar} from 'react-bootstrap'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';



export class NewBook extends Component{
    server = 'http://localhost:8081'

    state = {
        title: '',
        author: '',
        publisher: '',
        medium: '',
        category: '',
        cover_image: '',
        price: 0.00,
        description: '',
        progress: 0,
        coverImageUrl: '',
        upldBtnDisabled: true
    }

    submitHandler = (evt) => {
        evt.preventDefault();
        console.log(this.state)
        let newBook = {
            title : this.state.title, 
            author :this.state.author, 
            publiser : this.state.publisher, 
            medium : this.state.medium, 
            category : this.state.category,
            price : this.state.price,
            cover_image : this.state.coverImageUrl,
            description : this.state.description,
            status: 'available'
        }
        if(this.state.title.trim().length === 0 ||
            this.state.medium === '0' ||
            this.state.coverImageUrl.trim().length === 0 ||
            this.state.category === '0'){
                NotificationManager.error('Please complete all required fields before save your book')
                return false;
            }


        axios.post(this.server + '/book', newBook)
        .then(response => {
            NotificationManager.success('New book successfully added to the stock.')
        }).catch(err => {
            NotificationManager.error('Something went wrong, please try after some time.')
        }) 
    }

    fileSelectHandler = (evt) => {
        if(evt.target.files[0].size >= 1000000){
            this.setState({upldBtnDisabled: true})
            NotificationManager.error("Size of the file should be less than 1 MB");
            return;
        }else{
            this.setState({upldBtnDisabled: false})
        }

        this.setState({
            progress : 0,
            cover_image : evt.target.files[0]
        })
    }


    uploadImage = (evt) =>{  
        let fd = new FormData()
            fd.set('image', this.state.cover_image)
            axios({
                url: this.server + '/upload',
                data: fd,
                method:'post',
                headers: {'Content-Type': 'multipart/form-data' },
                onUploadProgress : progressEvt => {
                    this.setState({
                        progress : Math.round(progressEvt.loaded/progressEvt.total * 100)
                    })
                }
            }).then(result => {
                this.setState({
                    coverImageUrl:result.data.message.path,
                    cover_image:''
                })
                
            }).catch(err => {
                this.setState({coverImageUrl:'', cover_image:''})
            })
    }
    render(){
        return(
            <Card bg='light'>
                <Card.Header>Create new book </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Title"
                                    onChange = {evt => this.setState({title: evt.target.value})}
                                    />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter Author Name" 
                                    onChange = {evt => this.setState({author: evt.target.value})}
                                />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPublisher">
                                <Form.Label>Publisher</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Publisher Name" 
                                    onChange = {evt => this.setState({publisher: evt.target.value})}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCover">
                                <Form.Label>Select a Book Cover (size 1 mb. max)</Form.Label><br/>
                                <Form.Control 
                                    accept=".png, .jpg, .jpeg"
                                    style={{display:'none'}}
                                    type="file" 
                                    placeholder="Select cover image to upload" 
                                    onChange = {this.fileSelectHandler}
                                    ref = {fileInput => this.fileInput = fileInput}
                                /> 
                                <Button variant='secondary' onClick={() => this.fileInput.click()}>Select Cover Image</Button>
                                <Form.Label style={{width:'40%', borderRadius:'10px', margin:'5px',padding:'9px', border:'solid 1px #ccc'}}>Selected Filename: {
                                    !this.state.cover_image.name ? 
                                        <span className='text-danger' style={{padding:'6px'}}>No files selected</span> 
                                        : <span className='text-success' style={{padding:'6px'}}>{this.state.cover_image.name}</span>  
                                    }
                                </Form.Label>
                                <Button className='boxShadow' variant='success' 
                                    disabled={this.state.upldBtnDisabled} 
                                    onClick={this.uploadImage}>Upload Cover Image</Button>
                                {this.state.progress < 100&&
                                    <ProgressBar  striped variant="info"  
                                        now={this.state.progress} 
                                        label={this.state.progress+'%'}></ProgressBar>
                                }{this.state.progress >= 100&&
                                    <code> Cover image uploaded successfully </code>
                                }

                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridMedium">
                                <Form.Label>Medium</Form.Label>
                                <Form.Control as="select"
                                    onChange = {evt => this.setState({medium: evt.target.value})}>
                                    <option value='0' >Select medium</option>
                                    <option value ='English'>English</option>
                                    <option value ='Malayalam'>Malayalam</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCat">
                                <Form.Label>Book Category</Form.Label>
                                <Form.Control as="select"
                                    onChange = {evt => this.setState({category: evt.target.value})}>
                                    <option value='0' default>Select Category</option>
                                    {this.props.categories.map(
                                        category =>  <option key={category._id} 
                                            value= {category.category_name}> {category.category_name}
                                        </option>)
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Book Price</Form.Label>
                                <Form.Control type="number" 
                                    placeholder="Enter Book Price" 
                                    step = '0.01'
                                    onChange = {evt => this.setState({price: evt.target.value})}
                                    />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" 
                                    rows="4"  
                                    placeholder="Enter book description (optional)" 
                                    onChange = {evt => this.setState({description: evt.target.value})}
                                    />
                        </Form.Group>
                        <Form.Row style={{float:'right'}}>
                            <Col >
                                <Button variant="danger" type="reset" >
                                    Reset Form
                                </Button>
                            </Col>
                            <Button variant="success" type="submit" >
                                Save Book
                            </Button>
                        </Form.Row>
                    </Form>
                    <NotificationContainer/>
                </Card.Body>
            </Card>
        );
    };
}