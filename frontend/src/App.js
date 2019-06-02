import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

class App extends Component {
  state = {
    items: [],
    email: '',
    name: '',
    gata: '',
    postnummer: '',
    ort: ''
  }

  getItems() {
    axios.get('http://localhost:3000/students')
      .then(res => this.setState({
        items: res.data
      }))
      .catch(err => console.log('err', err))
  }

  addItem = e => {
    e.preventDefault()
    axios.post('http://localhost:3000/students', {
        email: this.state.email,
        name: this.state.name,
        address: {
          gata: this.state.gata,
          postnummer: this.state.postnummer,
          ort: this.state.ort
        }
      })
      .then(() => {
        return axios.get('http://localhost:3000/students')
      })
      .then(res => {
        this.setState({
          items: res.data,
          email: '',
          name: '',
          gata: '',
          postnummer: '',
          ort: ''
        })
      })
      .catch(err => console.log(err))
  }

  deleteItem = id => {
    axios.delete(`http://localhost:3000/students/${id}`)
      .then(() => {
        return axios.get('http://localhost:3000/students')
      })
      .then(res => {
        this.setState({
          items: res.data,
        })
      })
      .catch(err => console.log(err))
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px", textAlign: "center"}}>BongBong</h1>
          </Col>
        </Row>
        <Row style={{margin: "20px"}}>
          <Col>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Gata</th>
                  <th>Postnummer</th>
                  <th>Ort</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item => (
                  <tr key={item._id}>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.address.gata}</td>
                    <td>{item.address.postnummer}</td>
                    <td>{item.address.ort}</td>
                    <td>
                      <div>
                        <Button variant="danger" onClick={() => this.deleteItem(item._id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 style={{margin: "10px 0", textAlign: "center"}}>Add student</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.addItem} style={{margin: "20px auto", width: "500px"}}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" name="email" id="email" placeholder="Enter email" onChange={this.onChange} value={this.state.email}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" name="name" id="name" placeholder="Enter name" onChange={this.onChange} value={this.state.name}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Gata</Form.Label>
                <Form.Control required type="text" name="gata" id="gata" placeholder="Enter gata" onChange={this.onChange} value={this.state.gata}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Postnummer</Form.Label>
                <Form.Control required type="text" name="postnummer" id="postnummer" placeholder="Enter postnummer" onChange={this.onChange} value={this.state.postnummer}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Ort</Form.Label>
                <Form.Control required type="text" name="ort" id="ort" placeholder="Enter ort" onChange={this.onChange} value={this.state.ort}/>
              </Form.Group>
              <Button style={{margin: "20px auto", display: "block"}} type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
