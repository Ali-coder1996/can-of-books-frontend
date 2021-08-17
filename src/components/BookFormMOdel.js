import React, { Component } from 'react'
import { Modal,Form,Button } from 'react-bootstrap'
class BookFormMOdel extends Component {
    render() {
        return (
            <div>
                {
                    
                    <Modal show={this.props.show} onHide={this.props.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.props.bookCreat}>
                        <Form.Control type="text" name='bookTitle' placeholder="title" />
                        <Form.Control type="text" name='bookDescription' placeholder="description" />
                        <Form.Control type="text" name='bookStatus' placeholder="status" />
                        <Button variant="primary" type='submit'>Submit</Button>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.close}>
                                Close
                            </Button>
                            
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        )
    }
}

export default BookFormMOdel
