import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
import BootstrapTable from 'react-bootstrap-table-next';
import Menu from './Menu';

class Main extends React.Component {
    state = {
        graphData: [],
        columns : [
            {
              dataField: "expense_date",
              text: "Expense Date",
              sort: true
            },
            {
              dataField: "name",
              text: "Expense Category",
              sort: true
            },
            {
              dataField: "amount",
              text: "Expense Amount"
            }
          ]
    }

    constructor(props: Readonly<{}>) {
      super(props);
      
      this.state.graphData=JSON.parse("" + localStorage.getItem("graphData")+ "");

    }
        
    render() {
        return (
        <div className="App">
                
                
                <Menu/>

                <Container>
                    <br></br>
                    <h1>Welcome {localStorage.getItem("userName")} !</h1>
                    <br></br>
                    <h3>The following graph presents expense category bugdet vrs real spent:</h3>
           
                    <ResponsiveContainer width="99%" aspect={3}>
                    <BarChart width={730} height={250} data={this.state.graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="budget" fill="#8884d8" />
                        <Bar dataKey="spent" fill="#82ca9d" />
                    </BarChart> 
                    </ResponsiveContainer>
                    
                </Container>
                
            </div>
        )

    }
}

export default Main;