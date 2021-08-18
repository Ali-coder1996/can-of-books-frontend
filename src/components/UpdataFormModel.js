import React, { Component } from 'react'
import { Modal,Form,Button } from 'react-bootstrap'

class UpdataFormModel extends Component {
    render() {
        return (
            <div>
                {
                    
                    <Modal show={this.props.showUpdata} onHide={this.props.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Updata Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.props.bookUpdata}>
                        <Form.Control type="text" name='bookTitle' defaultValue={this.props.titleBook} />
                        <Form.Control type="text" name='bookDescription' defaultValue={this.props.descriptionBook}/>
                        <Form.Control type="text" name='bookStatus' defaultValue={this.props.statusBook} />
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

export default UpdataFormModel
