import React from 'react';
import logo from '../logo.svg';
import {  Navbar, Modal } from 'react-bootstrap';
import Home from './Home'
import ReactDOM from 'react-dom';
import axios from 'axios';
import history from '../history';
import Constants from '../Constants/Constants';


class Registration extends React.Component {
    
    

    state = {
        
        name: '',
        email: '',
        password: '', 
        confirmPassword: ''
    }

    
    
    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
               
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        
        var confirmPassword = this.state.confirmPassword;

        if (this.state.name.length <=0) {

            alert("ERROR: Please enter your name");
            return;
        }

        if (this.state.email.length <=0) {

            alert("ERROR: Please enter your email address");
            return;
        }
        
        if (this.state.password.length <=0) {

            alert("ERROR: Please enter your password");
            return;
        }

        if (this.state.confirmPassword.length <=0) {

            alert("ERROR: Please enter your confirmation password");
            return;
        }

        if (this.state.password != this.state.confirmPassword) {
        
            alert("ERROR: Passwords do not match!");
            return;
        }


        const registration = {
            name: this.state.name, 
            email: this.state.email, 
            password: this.state.password   
        };

        axios.defaults.headers.common['Authorization']="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBvZkswVV9aeVFFNGJrdEQtR1hsYiJ9.eyJpc3MiOiJodHRwczovL2F6YXZhbGEuYXV0aDAuY29tLyIsInN1YiI6IjNiZWY4ZmVUUHZZNGNoaU16RkRlRmNSMWdITk56V1JRQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2V0cmFja2VyaG4uY29tIiwiaWF0IjoxNTkwMDA4MDk3LCJleHAiOjE1OTAwOTQ0OTcsImF6cCI6IjNiZWY4ZmVUUHZZNGNoaU16RkRlRmNSMWdITk56V1JRIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.CvVA-9VTZ-vymdoNzEoiirz02OU5kojb_wgttlbHmcq9rzqKmsc1vAoN32m1Jg2MJQCD06ShXOUCuXBxdccE3qAvDujibz1LqJrLwy5OiC_YLomg6epccbgeC-_NhqKxdKIo1LdWzd77a0fD-_tUNcVpdOuVORUIRZM9u6_9guik_-l7Yc2nMBPzrDLLf_-ellPBAW9LZ7MPoaJRyHprOr6M125TA5wSMwrA1EWIF79kjzYTHJ7I36JIIwijBHfoILRZrawZ3uj4my0f91rW3Bmn49nU61t0WbI3xyZ-EeIqz1QwRsbvq9SUln9Qlx_sWJMh2VzeJSXWsYBw5-MPnQ"
        axios.get(Constants.apiURL + "/api/validatedata/users/email/" + this.state.email)
            .then(res => {
                
                if (res.status==200) {
                    
                    let count = "";
                    count = res.data[0].total;
                    
                    if (count=="0") {
                        axios.post(Constants.apiURL+"/api/users",  registration )
                            .then(res2 => {
                        })
                        alert("Registration Succesfull!");
                        this.ShowHome();

                    }
                    else {
                        alert("ERROR: Email address is alrealdy taken");
                    }
                }
                
            });
        
        
    }

    ShowHome() {
        history.push("/");
    }
    
    render() {
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
                        <button type="submit" className="btn btn-success btn-block" onClick={this.handleSubmit}>Register</button>
                        <button className="btn btn-secondary btn-block" onClick={() => this.ShowHome()}>Cancel</button>

                    </Modal.Footer>
                
                </Modal.Dialog>
                
                
                
                
            </div>
        );
    }
}

export default Registration;