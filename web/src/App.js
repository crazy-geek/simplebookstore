import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {TopBar} from './components/top-bar'
import {LeftMenu} from './components/left-menu'
import {ContentCard} from './components/content-cards'
import {BookDetails} from './components/book-details'
import {ReviewOrder} from './components/review-order'
import { HomeCarousel } from './components/home-carousel';
import {Login} from './components/login'
import { AdminArea } from './components/admin-tabs';
import { NotificationContainer, NotificationManager } from 'react-notifications';


class App extends Component {
  server = 'http://localhost:8081'
  state = {
    books:[],
    menuItems:[],
    selectedItems : [],
    selectedMenuItems : [],
    filterdBooks : [],
    loggedInUser: null,
    showBookDetails: false,
    currentBook:{}
  }

  componentDidMount =() => {
    axios.get(this.server+'/booksforsale')
      .then((response) => {
          console.log(response.data)
          this.setState({
              filterdBooks: this.state.filterdBooks.concat(response.data),
              books:this.state.books.concat(response.data)
        })
      })

      axios.get(this.server+'/categories')
      .then((response) => {
          this.setState({
              menuItems: this.state.menuItems.concat(response.data)
        })
      })
  }

  itemDetailsHandler = (book) => {
    this.setState({
      currentBook: book,
      showBookDetails: true
    })
  }

  addItemHandler = (book) => {
    book.qty = 1
    this.setState({selectedItems: this.state.selectedItems.concat(book)}) 
    NotificationManager.success('Added to Selected Books list','Book Selection', 600)
  }


  filterChangeHandler = (datas,evt) => {
    console.log(this.state.books)
    let isChecked = evt.currentTarget.checked
    if(isChecked){
      this.setState({
        selectedMenuItems: this.state.selectedMenuItems.concat(datas.category_name)
      },() => {
        this.setState({
          filterdBooks: (this.state.selectedMenuItems.length > 0) ? this.state.books.filter(el => 
               this.state.selectedMenuItems.includes(el.category)) : this.state.books
        })
      })
    }else{
      this.setState({
          selectedMenuItems : this.state.selectedMenuItems.filter(elem => {
                              return elem !== datas.category_name
                            })
          
      },() => {
          this.setState({
            filterdBooks:  (this.state.selectedMenuItems.length > 0) ? this.state.books.filter(el => 
              this.state.selectedMenuItems.includes(el.category)) : this.state.books
        })
    })
  }
  }

  loginHandler = (user) => {
    this.setState({
      loggedInUser: user 
    })
    
  } 

  render() {
    let bookDetailsClose = () => {
      this.setState({
        showBookDetails : false
      })
    }
   return (
     <Router>
       <div style={{marginTop:'6px'}}>
       <Route component = {TopBar} />
       {/* <Redirect from ='/' to='home' /> */}
       <Route  path='/' exact render ={() => 
              <div>
                <Row>
                  <Col style={{marginTop:'6px'}}>
                  <HomeCarousel/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} style={{marginTop:'18px'}}>
                    <LeftMenu data={this.state.menuItems} filter ={this.filterChangeHandler}/>
                </Col>
                <Col xs={9} style={{display:'inline-block',marginTop:'12px'}}>
                    <ContentCard data = {this.state.filterdBooks} 
                      view = 'all' 
                      add = {this.addItemHandler}
                      click = {this.itemDetailsHandler}
                      cartItems = {this.state.selectedItems}>
                    </ContentCard>
                    <BookDetails show={this.state.showBookDetails} 
                      hidemodal={bookDetailsClose} 
                      book= {this.state.currentBook}/>
                </Col>
             </Row>
             </div>
        }/>
       <Route path='/order' exact render ={()=>
            <Row>
              <Col xs={12} style={{display:'inline-block',marginTop:'12px'}}> 
                <ReviewOrder  click = {this.itemDetailsHandler} 
                  data = {this.state.selectedItems} view='review'>
                 </ReviewOrder>
              </Col>
            </Row>    
       }/>
       <Route path='/login' exact render ={()=>
            <Row>
              <Col xs={12} className='content'> 
                <Login userlogin={this.loginHandler}/>
              </Col>
            </Row>    
       }/>
       <Row>
          <Col xs={12} style={{display:'inline-block',marginTop:'3px'}}>
          </Col>
      </Row>   
          <Route path='/admin' exact  render ={()=>
              <Row>
              <Col xs={12} style={{display:'inline-block',marginTop:'3px'}}> 
                  <AdminArea categories = {this.state.menuItems}
                   data={this.state.loggedInUser} books={this.state.books}/>              
              </Col>
              </Row> 
          }/> 
        <NotificationContainer />
      </div>
      </Router>
    );
  }
}

export default App;
