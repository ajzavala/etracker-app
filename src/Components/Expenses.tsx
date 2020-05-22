import React from 'react';
import { Table, Modal, Nav, Navbar, Container,Button } from 'react-bootstrap';
import history from '../history';
import axios from 'axios';
import { ResponsiveContainer } from 'recharts';
import Menu from './Menu';
import Constants from '../Constants/Constants';

const expenseDataStructure = {
    id: "",
    expenseDate: "",
    name: "",
    amount: "",
    categoryId: ""
}

const expenseCategoriesStructure = {
    id: "",
    name: "",
    budget: "",
    alarmThreshold: "",
    userId: ""
}


class Expenses extends React.Component {
    
    state = {
        expenseDetails: [expenseDataStructure], 
        expenseCategories: [expenseCategoriesStructure],
        id:"",
        expenseDate: "", 
        categoryId: "",
        amount: "",
        buttonText:"",
        userId:""
        
    }
 
    constructor(props: Readonly<{}>) {
        super(props);
 
        this.state.expenseDetails=JSON.parse("" + localStorage.getItem("expenseDetails")+ "");
        this.state.expenseCategories=JSON.parse("" + localStorage.getItem("expenseCategories")+ "");
        this.state.userId=JSON.parse("" + localStorage.getItem("user_id") + "");
        
    }
 
    componentDidMount() {
        console.log(this.state.expenseDetails);
        
    }

    
    
    
    handleChange = (event: { target: { name: any; value: any; }; }) => {
        
        this.setState({ [event.target.name]: event.target.value });
        
    }

    

    handleSubmit =  (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
    }

    handleSave () {

        

        if (this.state.expenseDate.length<=0 ) {
            alert("ERROR: Please enter an expense date");
            return;

        }
        
        if (this.state.amount.length<=0 ) {
            alert("ERROR: Please enter an expense amount");
            return;

        }

        

        if (this.state.categoryId.toString() == "0" ) {
            alert("ERROR: Please enter an expense date");
            return;

        }
        
        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        
        const expense_record = {
            id:this.state.id,
            UserId: this.state.userId,
            ExpenseDate: this.state.expenseDate, 
            Amount: Number(this.state.amount),
            expenseCategoryId: Number(this.state.categoryId)   
        }

        if (this.state.buttonText == "Save expense") {
            console.log(expense_record);
            axios.post(Constants.apiURL + "/api/expensehistories",  expense_record )
            .then(res => {
                if (res.status==201) {
                    alert("Expense recorded succesfully");
                    this.updateExpenses();
                    this.updateGraphData();
                }
            });



        }
        else {
            axios.put(Constants.apiURL + "/api/expensehistories/"+this.state.id,  expense_record )
            .then(res => {
                if (res.status==204) {
                    alert("Expense updated succesfully");
                    this.updateExpenses();
                    this.updateGraphData();
                }
            })

        }        
    }


    
   
   editRecord(id:any, pdate: any, pcategory_id: any, pamount: any) {
        this.setState({id:id});
        this.setState({expenseDate: pdate});
        this.setState({categoryId: pcategory_id});
        this.setState({amount: pamount});
        this.setState({buttonText: "Save Changes"});
       
    
    }

    newRecord() {
        this.setState({id:0});
        this.setState({expenseDate: ""});
        this.setState({amount: ""});
        this.setState({categoryId: "0"});
        this.setState({buttonText: "Save expense"});
        
    }

    deleteRecord(id:any) {
    
        var choice=window.confirm("Are you sure to delete this expense?");

        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        
        if (choice==true) {
            axios.delete(Constants.apiURL + "/api/expensehistories/" + id)
                .then(res => {
                    if (res.status==200){
                        alert("Expense succesfully deleted!;");
                        const list = [...this.state.expenseDetails];
                        const updatedList = list.filter(item => item.id !== id);
                        this.setState({ expenseDetails: updatedList });
                        localStorage.setItem("expenseDetails", JSON.stringify(updatedList));
                        this.updateGraphData();
                    }
                }
                     
                );
        }

    }

    updateExpenses () {
        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        axios.get(Constants.apiURL + "/api/expensedetails/" + localStorage.getItem("user_id"))
            .then(res => {

                if (res.status==200) {
                    localStorage.setItem("expenseDetails",JSON.stringify(res.data));
                    this.setState({expenseDetails:JSON.parse("" + localStorage.getItem("expenseDetails") + "")})
                }
                

            });
    }

   
    updateGraphData() {
        axios.defaults.headers.common['Authorization']="Bearer " + Constants.accessToken;
        axios.get(Constants.apiURL + "/api/graphdata/" + localStorage.getItem("user_id"))
            .then(res => {

                if (res.status==200) {
                    localStorage.setItem("graphData",JSON.stringify(res.data));

                }
                

            });
    }
   
    render () {
        
        const expenseRecords = this.state.expenseDetails.map((item,index) => {
            return (
              <tr >
                <td>{item.id}</td>
                <td>{item.expenseDate.substring(0,10)}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={ () => this.editRecord(item.id,item.expenseDate.substring(0,10),item.categoryId,item.amount)}>
                    Edit
                </button>
                {" "}
                <button className="btn btn-danger" onClick={() => this.deleteRecord(item.id)}>Remove</button>
                </td>
              </tr>
            )
          });

          const expense_categories = this.state.expenseCategories.map((item,index) => {
            return (
              <option value={item.id}>{item.name}</option>
                
            )
          });

        return (

            <div className="App">
                
                <Menu/>
                <br></br>
                <br></br>
                <h1>Expenses</h1>
                <br></br>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={ () => this.newRecord()}>
                    Add New Expense
                </button>
                <br></br>
                <br></br>
                <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Expense Date</th>
                        <th>Expense Category</th>
                        <th>Amount</th>
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
                            <h5 className="modal-title" id="exampleModalLabel">Expenses Registration</h5>
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
                                    <label>Expense Date</label>
                                    <input required   className="form-control" id="expenseDate" type="date" name="expenseDate"  placeholder="Enter your email address." value={this.state.expenseDate} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Expense Category</label>
                                    
                                    <select value={this.state.categoryId} className="form-control" id="categoryId"  name="categoryId"  placeholder="Select expense category"  onChange={this.handleChange}>
                                        <option value="0">Select an option</option>
                                        {expense_categories}
                                    </select>
                                                                       
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input required  className="form-control" id="amount" type="number" name="amount"  placeholder="Enter expense amount" value={this.state.amount} onChange={this.handleChange} />
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

export default Expenses;