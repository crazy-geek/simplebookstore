import React,{Component} from 'react'
import { Tabs, Tab} from 'react-bootstrap'
import {Category} from './category'
import {NewBook} from './new-book'
import { OrderList } from './order-list';
import {BooksList} from './book-list';
import {Redirect} from 'react-router-dom';

export class AdminArea extends Component{
    state = {
        selectedTab : 'newBook'
    }

    HandleTabSelection = (evt) => {
        this.setState({selectedTab:evt})
    }
    render(){
        return(
        <div>
             {!localStorage.getItem('loggedInUser')&&
                <Redirect to='/' from='/admin'></Redirect>
            }
            <Tabs defaultActiveKey="newBook" onSelect = {this.HandleTabSelection}  id="tabs">
                <Tab eventKey="orderList" title="Pending Orders">
                    {this.state.selectedTab === 'orderList' &&
                    <OrderList/>
                    }
                </Tab>
                <Tab eventKey="newCategory"  title="Add new category">
                {this.state.selectedTab === 'newCategory' &&
                    <Category/>
                }
                </Tab>
                <Tab eventKey="newBook" title="Add new book">
                {this.state.selectedTab === 'newBook' &&
                    <NewBook categories={this.props.categories}/>
                }
                </Tab>
                <Tab eventKey="books"  title="Manage Books">
                {this.state.selectedTab === 'books' &&
                    <BooksList books={this.props.books}/>
                }
                </Tab>
            </Tabs>
        </div>

        );
    };
}