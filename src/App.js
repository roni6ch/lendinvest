import React, { Component } from 'react';
import Header from './components/Header';
import LoansList from './components/LoansList';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
         <Header />
         <LoansList />
        <Footer />
      </div>
    );
  }
}

export default App;
