import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bookData: [],
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
  render() {
    return (
      <>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
      <main className="card">
        {this.state.bookData.length > 0&&
        this.state.bookData.map(item => {
         return (<Card  style={{ width: '300px'}}>
           <ListGroup  >
             <ListGroup.Item variant="dark">{item.title}</ListGroup.Item>
             <ListGroup.Item>{item.description}</ListGroup.Item>
             <ListGroup.Item variant="warning">by:{item.status}</ListGroup.Item>
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
