  import React, {Component} from 'react';
  import axios from 'axios';
  import InvestLoanModal from './InvestLoanModal'
  import './LoansList.css';

  export default class LoansList extends Component {
  constructor(props){
    console.log('constructor');
    super(props);
    this.state ={
      total : 0,
      loanNum : '',
      loans : [],
      limitError : false
    }
  }

  componentDidMount = () =>{
    console.log('componentDidMount');
    var self = this;
    axios.get('./assets/current-loans.json')
    .then(function (response) {
      var total = response['data']['loans'].map(loan => parseFloat(loan.amount.replace(/,/g, '')));
      total = total.reduce(function(pv, cv) { return pv + cv; }, 0);
      self.setState({
        loans : response['data']['loans'],
        total : total
      });
      console.log(response.data.loans);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  investHandler = (loanValue,id) => {
    console.log('open popup' , loanValue);

    let loans = this.state.loans;
    let available 
    loans.forEach((loan, index) => {

      if(loan.id == id) {
        available = loans[index].available;
        if (typeof(loans[index].available) == 'string')
          available = parseFloat(loans[index].available.replace(/,/g, ''));

          if (parseFloat(loanValue) <= available){
            loans[index].available = available - parseFloat(loanValue);
            this.setState((prevState, props) => ({
              total : prevState.total - loanValue,
              loans,
              limitError:false
            }));
          }
          else{
          this.setState({
            limitError : true
          });
        }


            return;
      }
  });



  
  }
    
      render() {
        console.log('render');
          return (
              <div className="LoansWrapper">
                <ul>
                  {this.state.loans.map((loan, i) =>{
                      return <li key={i} className="m-2">
                      <div className="card">
                        <h5 className="card-header">{loan.title}</h5>
                        <div className="card-body">
                          <h5 className="card-title">Available: <span style={{color:'red'}}>{loan.available}</span></h5>
                          <p className="card-text">Tranche: {loan.tranche} | Annualised Return: {loan.annualised_return} </p>
                          <InvestLoanModal investHandler={this.investHandler.bind(this)} loan={loan}/>
                        </div>
                      </div>
                      </li>
                    })}
                </ul>
                  {!this.state.limitError ? 
                  <p>Total amount available for investment: <span style={{color:'green'}}>£{parseFloat(this.state.total).toLocaleString()}</span></p> : 
                  <p style={{color:'red'}}>Please type smaller amount from your available amount!</p>}
              
            </div>
          );
      }
  }
