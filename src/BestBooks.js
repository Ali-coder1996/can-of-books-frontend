import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import BookFormMOdel from './components/BookFormMOdel';
import UpdataFormModel from './components/UpdataFormModel';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bookData: [],
      show: false,
      index:0,
      showUpdata:false,
      titleBook:'',
      descriptionBook:'',
      statusBook:'',    
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
  addBook = () => {
    this.setState({
      show: true
    })
  }
  closeHandler = () => {
    this.setState({
      show: false
    })
  }
  bookCreat = (e) => {
    e.preventDefault();
    const data = {
      email: this.props.auth0.user.email,
      bookTitle: e.target.bookTitle.value,
      bookDescription: e.target.bookDescription.value,
      bookStatus: e.target.bookStatus.value,
    }
    console.log('0')
    axios.post(`http://localhost:3001/book-creation`, data).then(item => {
      console.log('1')

      this.setState({
        bookData: item.data
      })
    })
  }
  deleteBook = (index) => {
    console.log(index)
    const data = {
      email: this.props.auth0.user.email,
    }

    axios.delete(`http://localhost:3001/book-delete/${index}`, { params: data }).then(item1 => {
      this.setState({
        bookData: item1.data
      })
    })
  }
  closeUpdata = () => {
    this.setState({
      showUpdata: false
    })
  }
  showUpdataData=(index)=>{
      this.setState({
      index:index,
      showUpdata:true,
      titleBook:this.state.bookData[index].title,
      descriptionBook:this.state.bookData[index].description,
      statusBook:this.state.bookData[index].status
    })
  }
  bookUpdata=(e)=>{
    e.preventDefault();
    let updata ={
      email: this.props.auth0.user.email,
      bookTitle:e.target.bookTitle.value,
      bookDescription:e.target.bookDescription.value,
      bookStatus:e.target.bookStatus.value,
    } 
    axios.put(`http://localhost:3001/book-updata/${this.state.index}`,updata).then(item2 => {
      console.log('1')
      this.setState({
        bookData: item2.data
      })
    })
  }
  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
        

          <Button onClick={this.addBook} variant="primary" size="lg">
            Block level button
          </Button>
        <BookFormMOdel bookCreat={this.bookCreat} close={this.closeHandler} show={this.state.show} />
        </Jumbotron>
        <Carousel>
          {this.state.bookData.length > 0 &&
            this.state.bookData.map((item, index) => {
              console.log(item._id)
              return (
                <Carousel.Item style={{ textAlign: 'center' }}>
                  <h1>title:{item.title}</h1>
                  <p>description:{item.description}</p>
                  <h2>by:{item.status}</h2>
                  <button onClick={() => this.deleteBook(index)}>Delete</button>
                  <button onClick={() => this.showUpdataData(index)}>Updata</button>
                </Carousel.Item>

              )
            })
          }
          </Carousel>
          <UpdataFormModel titleBook={this.state.titleBook} descriptionBook={this.state.descriptionBook} statusBook={this.state.statusBook} 
          bookUpdata={this.bookUpdata} close={this.closeUpdata} showUpdata={this.state.showUpdata}/>
      </>
    )
  }
}      
export default withAuth0(MyFavoriteBooks)