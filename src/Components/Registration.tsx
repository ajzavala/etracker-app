import React from 'react';
import logo from '../logo.svg';
import {  Navbar, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import axios from 'axios';
import history from '../history';
import Constants from '../Constants/Constants';


class Registration extends React.Component {
    
    

    state = {
        
        name: '',
        email: '',
        password: '', 
        confirmPassword: '',
        loading: false
    }

    
    
    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
               
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        this.setState({loading: true});

        var confirmPassword = this.state.confirmPassword;

        if (this.state.name.length <=0) {

            alert("ERROR: Please enter your name");
            this.setState({loading: false});
            return;
        }

        if (this.state.email.length <=0) {

            this.setState({loading: false});
            alert("ERROR: Please enter your email address");
            return;
        }
        
        if (this.state.password.length <=0) {

            this.setState({loading: false});
            alert("ERROR: Please enter your password");
            return;
        }

        if (this.state.confirmPassword.length <=0) {

            this.setState({loading: false});
            alert("ERROR: Please enter your confirmation password");
            return;
        }

        if (this.state.password != this.state.confirmPassword) {
        
            this.setState({loading: false});
            alert("ERROR: Passwords do not match!");
            return;
        }


        const registration = {
            name: this.state.name, 
            email: this.state.email, 
            password: this.state.password   
        };

        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        axios.get(Constants.apiURL + "/api/validatedata/users/email/" + this.state.email)
            .then(res => {
                
                if (res.status==200) {
                    
                    let count = "";
                    count = res.data[0].total;
                    
                    if (count=="0") {
                        axios.post(Constants.apiURL+"/api/users",  registration )
                            .then(res2 => {
                        })
                        alert("Registration Succesfull!, Proceed to login.");
                        this.setState({loading: false});
                        this.ShowLogin();

                    }
                    else {
                        alert("ERROR: Email address is alrealdy taken");
                        this.setState({loading: false});
                    }
                }
                
            });
        
        
    }

    ShowLogin() {
        history.push("/login");
    }

    ShowHome() {
        history.push("/");
    }
    
    render() {

        const loading = this.state.loading;

        return (
            <div className="App">

                <Navbar bg="dark" variant="dark">
                    <img src="../../cubo.png" />
                    <Navbar.Brand >Expense Tracker </Navbar.Brand>
                </Navbar>


                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="wrapper">

                            <div className="form-group">
                                <label>Name</label>
                                <input required className="form-control" id="name" type="text" name="name" onChange={this.handleChange} placeholder="Enter your full name." />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input required className="form-control" id="email" type="email" name="email" onChange={this.handleChange} placeholder="Enter your email address." />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input required className="form-control" id="password" type="password" name="password" onChange={this.handleChange} placeholder="Enter the password to access account" />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input required className="form-control" id="confirmPassword" type="password" name="confirmPassword" onChange={this.handleChange} placeholder="Confirm your password" />
                            </div>

                        </div>
                        <form onSubmit={this.handleSubmit}>
                            
                                
                            
                            
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success btn-block" onClick={this.handleSubmit} disabled={loading}>
                            {loading && (<i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />)}
                            {loading && <span>Registering...</span>}
                            {!loading && <span>Register</span>}
                        </button>
                        <button className="btn btn-secondary btn-block" onClick={() => this.ShowHome()}>Cancel</button>

                    </Modal.Footer>
                
                </Modal.Dialog>
                
                
                
                
            </div>
        );
    }
}

export default Registration;