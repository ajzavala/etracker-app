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
        password: "",
        loading: false
    }
    
    
    
    showHome() {
        history.push("/");
    }

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    
    }

    handleSubmit =  (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        this.setState({loading:true});

        if (this.state.email.length <= 0) {
            this.setState({loading:false});
            alert("ERROR: Please enter your email address");
            return;

        }

        if (this.state.password.length <= 0) {
            this.setState({loading:false});
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
            headers: { Authorization: "Bearer " + Constants.accessToken }
        };

        const agent = new https.Agent({  
            rejectUnauthorized: false
          });    
        
          
       axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
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
                        this.setState({loading:false});
                        alert("ERROR: Email address, or password, o combination of both are incorrect!");
                    }
                    
                 }
                 

        });
        
        
    }
    render() {
        const loading = this.state.loading;

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
                        <button  className="btn btn-primary" onClick={this.handleSubmit}>
                            {loading && (<i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />)}
                            {loading && <span>Authenticating...</span>}
                            {!loading && <span>Login</span>}
                        </button>
                        <button className="btn btn-secondary" onClick={this.showHome}>Cancel</button>

                    </Modal.Footer>

                </Modal.Dialog>
                </form>

                
            </div>
        )

    }
}

export default Login;