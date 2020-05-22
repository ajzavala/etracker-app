import React from 'react';
import { Table, Modal, Nav, Navbar, Container,Button } from 'react-bootstrap';
import history from '../history';
import axios from 'axios';
import { ResponsiveContainer } from 'recharts';
import { Form } from 'react-bootstrap';
import Menu from './Menu';
import Constants from '../Constants/Constants';
import { constants } from 'buffer';

const expenseCategoriesStructure = {
    id: "",
    name: "",
    budget: "",
    alarmThreshold: "",
    userId: ""
}


class ExpenseCategories extends React.Component {
    
    state = {
        expenseCategories: [expenseCategoriesStructure],
        id:"",
        name: "", 
        budget: "",
        alarmThreshold: "",
        userId:"",
        buttonText: ""
        
    }
 
    constructor(props: Readonly<{}>) {
        super(props);
 
        this.state.expenseCategories=JSON.parse("" + localStorage.getItem("expenseCategories")+ "");
        this.state.userId=JSON.parse("" + localStorage.getItem("user_id") + "");
        
    }
 
    
    
    
    handleChange = (event: { target: { name: any; value: any; }; }) => {
      
        this.setState({ [event.target.name]: event.target.value });
        
    }

    

    handleSubmit =  (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
    }

    handleSave () {

        
        
        if (this.state.name.length<=0 ) {
            alert("ERROR: Please enter the expense category name");
            return;

        }

        if (this.state.budget.length<=0 ) {
            alert("ERROR: Please enter the expense category budget");
            return;

        }

        if (this.state.alarmThreshold.length<=0 ) {
            alert("ERROR: Please enter the expense category alarm threshold");
            return;

        }

        const encontrado=this.state.expenseCategories.find(r => r.name === this.state.name);
        
        if (encontrado != undefined) {
            alert("ERROR: Expense name is already registered.");
            return;
        }

        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        
        const expense_record = {
            id:this.state.id,
            name: this.state.name,
            budget: Number(this.state.budget),
            alarmThreshold: Number(this.state.alarmThreshold),
            userId: this.state.userId
            
        }

        if (this.state.buttonText == "Save expense category") {
            console.log(expense_record);
            axios.post(Constants.apiURL + "/api/expensecategories",  expense_record )
            .then(res => {
                if (res.status==201) {
                    alert("Expense category recorded succesfully");
                    this.updateExpenses();
                }
            });

        }
        else {
            axios.put(Constants.apiURL + "/api/expensecategories/"+this.state.id,  expense_record )
            .then(res => {
                if (res.status==204) {
                    alert("Expense updated succesfully");
                    this.updateExpenses();
                }
            })

        }        
    }


    
   
   editRecord(id:any, pname: any, pbudget: any, palarm: any) {
        this.setState({id:id});
        this.setState({name: pname});
        this.setState({budget: pbudget});
        this.setState({alarmThreshold: palarm});
        this.setState({buttonText: "Save Changes"});
        
       
    
    }

    newRecord() {
        this.setState({id:0});
        this.setState({name: ""});
        this.setState({budget: ""});
        this.setState({alarmThreshold: ""});
        this.setState({buttonText: "Save expense category"});
        
    }

    deleteRecord(id:any) {
    
        var choice=window.confirm("Are you sure to delete this expense category?");

        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        
        if (choice==true) {
            axios.delete(Constants.apiURL + "/api/expensecategories/" + id)
                .then(res => {
                    if (res.status==200){
                        alert("Expense succesfully deleted!;");
                        const list = [...this.state.expenseCategories];
                        const updatedList = list.filter(item => item.id !== id);
                        this.setState({ expenseCategories: updatedList });
                        localStorage.setItem("expenseCategories", JSON.stringify(updatedList));

                    }
                }
                     
                );
        }

    }

    updateExpenses () {
        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        axios.get(Constants.apiURL + "/api/expensecategories/" + this.state.userId)
            .then(res => {

                if (res.status==200) {
                    localStorage.setItem("expenseCategories",JSON.stringify(res.data));
                    this.setState({expenseCategories:JSON.parse("" + localStorage.getItem("expenseCategories")+"")});
                }
                

            });
    }

   
   
    render () {
        
        const expenseRecords = this.state.expenseCategories.map((item,index) => {
            return (
              <tr >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.budget}</td>
                <td>{item.alarmThreshold}</td>
                <td>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={ () => this.editRecord(item.id,item.name,item.budget,item.alarmThreshold)}>
                    Edit
                </button>
                {" "}
                <button className="btn btn-danger" onClick={() => this.deleteRecord(item.id)}>Remove</button>
                </td>
              </tr>
            )
          });

        return (

            <div className="App">
                
                <Menu/>
                <br></br>
                <h1>Expense Categories</h1>
                <br></br>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={ () => this.newRecord()}>
                    Add New Expense Category
                </button>
                <br></br>
                <br></br>
                <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Expense Name</th>
                        <th>Expense Category Budget</th>
                        <th>Alarm Threshold Percentage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            
                <tbody>
                    {expenseRecords}
                </tbody>
                </Table>
                
                
                <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Expense Categories Registration</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            
                            <div className="wrapper">
                            
                                
                                <div className="form-group">
                                    
                                    <input required className="form-control" id="id" type="hidden" name="id" value={this.state.id} placeholder="Automatic number"  disabled/>
                                </div>
                                <div className="form-group">
                                    <label>Category Name</label>
                                    <input required   className="form-control" id="name" type="text" name="name"  placeholder="Enter the name of the expense category" value={this.state.name} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Expense Category Budget</label>
                                    <input type="number" value={this.state.budget} className="form-control" id="budget"  name="budget"  placeholder="Budget for this expense category"  onChange={this.handleChange} />
                                    
                                </div>
                                <div className="form-group">
                                    <label>Alarm Threshold Porcentaje</label>
                                    <input required  className="form-control" id="alarmThreshold" type="number" name="alarmThreshold"  placeholder="Enter value between 50 and 80" value={this.state.alarmThreshold} onChange={this.handleChange} />
                                    <Form.Text className="text-muted">
                                        When your spent has reach the porcentage defined in the alarm threshold, we will send you an email.
                                    </Form.Text>
                                    
                                </div>

                                </div>
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>{this.state.buttonText}</button>
                        </div>
                        
                    </div>
                </div>
                </div>
                
                            
            
            
            </div>
            
        )
        
            
        
    }
}

export default ExpenseCategories;