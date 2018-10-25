    import React, { Component } from 'react';
    import { Button,Input,Label,Modal,FormGroup, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


    export default class InvestLoanModal extends Component {
        constructor(props) {
            super(props);
            this.state = {
            modal: false,
            loanValue:0
            };
        }
        
        millisecondsToStr = (milliseconds) =>{

            function numberEnding (number) {
                return (number > 1) ? 's' : '';
            }
        
            var temp = Math.floor(milliseconds / 1000);
            var years = Math.floor(temp / 31536000);
            if (years) {
                return years + ' year' + numberEnding(years);
            }
            //TODO: Months! Maybe weeks? 
            var days = Math.floor((temp %= 31536000) / 86400);
            if (days) {
                return days + ' day' + numberEnding(days);
            }
            var hours = Math.floor((temp %= 86400) / 3600);
            if (hours) {
                return hours + ' hour' + numberEnding(hours);
            }
            var minutes = Math.floor((temp %= 3600) / 60);
            if (minutes) {
                return minutes + ' minute' + numberEnding(minutes);
            }
            var seconds = temp % 60;
            if (seconds) {
                return seconds + ' second' + numberEnding(seconds);
            }
            return 'less than a second'; 
        }

        handleChange = (e) => {
            this.setState({
                loanValue: e.target.value
            });
        }
        toggle = () => {
            this.setState({
            modal: !this.state.modal
            });
        }
        submit= () => {
            this.toggle();
            this.props.investHandler(this.state.loanValue,this.props.loan.id);
        }

    render() {
        return (
            <div>
                <a href="#" className="btn btn-primary" onClick={this.toggle}>Invest in Loan</a>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>
                <p>Invest in Loan</p>
                {this.props.loan.title}
            </ModalHeader>
            <ModalBody>
            <span>Amount Available: <span style={{color:'red'}}>{this.props.loan.available}</span></span> <br /><span>Annualised Return: {this.props.loan.annualised_return}</span>  <br />
                <span>Tranche: {this.props.loan.tranche}</span><br />
                <span>Loan ends in: {this.millisecondsToStr(this.props.loan.term_remaining)}</span>
            </ModalBody>
            <ModalFooter>
                <FormGroup>
                    <Label for="Amount">Investment amount (£)</Label>
                    <Input placeholder="Amount" type="number" step="1" onChange={(e) =>this.handleChange(e)}/>
                </FormGroup>
                <Button color="primary" onClick={()=>this.submit()}>Invest Now</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
    }
