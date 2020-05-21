import React from 'react';
import axios from 'axios';
import { Button, Navbar, Container, Card, Form, Modal} from 'react-bootstrap';
import history from '../history';
import https from 'https';
import Constants from '../Constants/Constants';

class Login extends React.Component {
    state = {
        id: "",
        email: "", 
        password: ""
    }
    
    
    
    showHome() {
        history.push("/");
    }

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    
    }

    handleSubmit =  (event: { preventDefault: () => void; }) => {
        event.preventDefault();

    
        if (this.state.email.length <= 0) {
            alert("ERROR: Please enter your email address");
            return;

        }

        if (this.state.password.length <= 0) {
            alert("ERROR: Please enter your password");
            return;

        }

                
        var valid = 0;
        var name = "";

        //hacer un POST para el login
       const loginInfo = {
           email: this.state.email,
           password: this.state.password
       }

       const config = {
            headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBvZkswVV9aeVFFNGJrdEQtR1hsYiJ9.eyJpc3MiOiJodHRwczovL2F6YXZhbGEuYXV0aDAuY29tLyIsInN1YiI6IjNiZWY4ZmVUUHZZNGNoaU16RkRlRmNSMWdITk56V1JRQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2V0cmFja2VyaG4uY29tIiwiaWF0IjoxNTkwMDA4MDk3LCJleHAiOjE1OTAwOTQ0OTcsImF6cCI6IjNiZWY4ZmVUUHZZNGNoaU16RkRlRmNSMWdITk56V1JRIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.CvVA-9VTZ-vymdoNzEoiirz02OU5kojb_wgttlbHmcq9rzqKmsc1vAoN32m1Jg2MJQCD06ShXOUCuXBxdccE3qAvDujibz1LqJrLwy5OiC_YLomg6epccbgeC-_NhqKxdKIo1LdWzd77a0fD-_tUNcVpdOuVORUIRZM9u6_9guik_-l7Yc2nMBPzrDLLf_-ellPBAW9LZ7MPoaJRyHprOr6M125TA5wSMwrA1EWIF79kjzYTHJ7I36JIIwijBHfoILRZrawZ3uj4my0f91rW3Bmn49nU61t0WbI3xyZ-EeIqz1QwRsbvq9SUln9Qlx_sWJMh2VzeJSXWsYBw5-MPnQ" }
        };

        const agent = new https.Agent({  
            rejectUnauthorized: false
          });    
        
          
       axios.defaults.headers.common['Authorization']="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBvZkswVV9aeVFFNGJrdEQtR1hsYiJ9.eyJpc3MiOiJodHRwczovL2F6YXZhbGEuYXV0aDAuY29tLyIsInN1YiI6IjNiZWY4ZmVUUHZZNGNoaU16RkRlRmNSMWdITk56V1JRQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2V0cmFja2VyaG4uY29tIiwiaWF0IjoxNTkwMDA4MDk3LCJleHAiOjE1OTAwOTQ0OTcsImF6cCI6IjNiZWY4ZmVUUHZZNGNoaU16RkRlRmNSMWdITk56V1JRIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.CvVA-9VTZ-vymdoNzEoiirz02OU5kojb_wgttlbHmcq9rzqKmsc1vAoN32m1Jg2MJQCD06ShXOUCuXBxdccE3qAvDujibz1LqJrLwy5OiC_YLomg6epccbgeC-_NhqKxdKIo1LdWzd77a0fD-_tUNcVpdOuVORUIRZM9u6_9guik_-l7Yc2nMBPzrDLLf_-ellPBAW9LZ7MPoaJRyHprOr6M125TA5wSMwrA1EWIF79kjzYTHJ7I36JIIwijBHfoILRZrawZ3uj4my0f91rW3Bmn49nU61t0WbI3xyZ-EeIqz1QwRsbvq9SUln9Qlx_sWJMh2VzeJSXWsYBw5-MPnQ"
       axios.post(Constants.apiURL + "/api/login", loginInfo)
            .then(res => {
                if (res.status == 200) {
                    valid = res.data[0].id;
                    name = res.data[0].name;
                    

                    if (valid > 0) {

                        localStorage.setItem("user_id",valid.toString());    
                        localStorage.setItem("userName",name);    

                        let expenseCategories = Constants.apiURL + "/api/expensecategories/" + valid;
                        let graphData=Constants.apiURL + "/api/graphdata/" + valid.toString();
                        let expensesDetails=Constants.apiURL +"/api/expensedetails/" + valid.toString();

                        const requestExpenseCategories = axios.get(expenseCategories);
                        const requestGraphData = axios.get(graphData);
                        const requestExpenseDetails= axios.get(expensesDetails);

                        axios.all([requestExpenseCategories, requestGraphData, requestExpenseDetails]).then(axios.spread((...responses) => {
                            const responseExpenseCategories = responses[0].data;
                            const responseGraphData = responses[1].data;
                            const responseExpensesDetails = responses[2].data;
                             
                            localStorage.setItem("expenseDetails",JSON.stringify(responseExpensesDetails));
                            localStorage.setItem("expenseCategories",JSON.stringify(responseExpenseCategories));
                            localStorage.setItem("graphData",JSON.stringify(responseGraphData));

                            history.push("/main");    


                          })).catch(errors => {
                            // react on errors.
                          })                 
                          
                        
                        
                         
                    }                    
                    else {
                        alert("ERROR: Email address, or password, o combination of both are incorrect!");
                    }
                    
                 }
                 

        });
        
        
    }
    render() {
        return (
            <div className="App">
                
                <Navbar bg="dark" variant="dark">
                    <img src="../../cubo.png" />
                    <Navbar.Brand >Expense Tracker </Navbar.Brand>
                </Navbar>

                <form onSubmit={this.handleSubmit}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="wrapper">

                            <div className="form-group">
                                <label>Email</label>
                                <input required className="form-control" id="email" type="email" name="email" onChange={this.handleChange} placeholder="Enter your email address." />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input required className="form-control" id="password" type="password" name="password" onChange={this.handleChange} placeholder="Enter your password" />
                            </div>
                        </div>
                                              
                    </Modal.Body>
                    <Modal.Footer>
                        <button  className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                        <button className="btn btn-secondary" onClick={this.showHome}>Cancel</button>

                    </Modal.Footer>

                </Modal.Dialog>
                </form>

                
            </div>
        )

    }
}

export default Login;