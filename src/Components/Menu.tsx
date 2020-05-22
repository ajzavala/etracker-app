import React from 'react';
import {Navbar,Nav, Form,Button} from 'react-bootstrap';
import history from '../history';

class Menu extends React.Component {

    logOut() {

        history.push("/");
        localStorage.clear();
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
           <img src="../../cubo.png" />
           <Navbar.Brand >Expense Tracker </Navbar.Brand>
           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/main">Home</Nav.Link>
                <Nav.Link href="/categories">Expense Categories</Nav.Link>
                <Nav.Link href="/expenses">Register an expense</Nav.Link>
              </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Form inline>
                    <Button variant="primary" onClick={this.logOut}>Logout </Button>{' '}
                </Form>    
            </Navbar.Collapse>
            </Navbar.Collapse>
            </Navbar>
        )
    }


}

export default Menu;