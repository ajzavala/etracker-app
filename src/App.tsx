import React from 'react';
import logo from './logo.svg';
import './App.css';
import {  Navbar, Container, Form,  Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  
  
  render() {
  return (
    
      <div className="App" >
                
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Not registered? </Navbar.Brand>
                    <Button variant="success" href="/registration">Register here !</Button>{' '}
                    <Navbar.Collapse className="justify-content-end">
                        <Form inline>
                            <Button variant="primary" active href="/login">Login</Button>{' '}
                        </Form>    
                    </Navbar.Collapse>
                    
                </Navbar>

                <Container>
                    <img src="../../expensetracker.png" width="50%" height="50%"/>
                </Container>
                
      </div>
    
  );
  }
}

export default App;
