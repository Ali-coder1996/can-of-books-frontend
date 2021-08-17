import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { Card, ListGroup,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import BookFormMOdel from './components/BookFormMOdel';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bookData: [],
      show:false
    }
  }

  componentDidMount = () => {
    let urlBooks = `http://localhost:3001/books?email=${this.props.auth0.user.email}`
    axios.get(urlBooks).then(res => {
      console.log(res.data)
      this.setState({
        bookData: res.data,
      })
    })
  }
  addBook=()=>{
    this.setState({
      show:true
    })
  }
  closeHandler=()=>{
    this.setState({
      show:false
    })
  }
  bookCreat=(e)=>{
    e.preventDefault();
    const data={
      email:this.props.auth0.user.email,
      bookTitle:e.target.bookTitle.value,
      bookDescription:e.target.bookDescription.value,
      bookStatus:e.target.bookStatus.value,
    }
    console.log('0')
    axios.post(`http://localhost:3001/book-creation`,data).then(item =>{
      console.log('1')

      this.setState({
        bookData:item.data
      })
    })
  }
  deleteBook=(index)=>{
    console.log(index)
    const data={
      email:this.props.auth0.user.email,
    }
    
    axios.delete(`http://localhost:3001/book-delete/${index}`,{params:data}).then(item1 =>{
      console.log('1')
      this.setState({
        bookData:item1.data
      })
    })
  }
  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <Button onClick={this.addBook} variant="primary" size="lg">
            Block level button
          </Button>
        </Jumbotron>
        <BookFormMOdel bookCreat={this.bookCreat} close={this.closeHandler} show={this.state.show}/>
        <main className="card">
          {this.state.bookData.length > 0 &&
            this.state.bookData.map((item,index) => {
              return (<Card style={{ width: '300px' }}>
                <ListGroup key={index} >
                  <ListGroup.Item variant="dark">{item.title}</ListGroup.Item>
                  <ListGroup.Item>{item.description}</ListGroup.Item>
                  <ListGroup.Item variant="warning">by:{item.status}</ListGroup.Item>
                  <button onClick={()=>this.deleteBook(index)}>Delete</button>
                </ListGroup>
              </Card>)
            })
          }
        </main>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
