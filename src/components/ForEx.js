import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import PricePer from './PricePer';



export default class ForEx extends Component {

state = {
    exchangeRate: null,
    toggleCanadian: false,
    buPriceCAD: null,
    stPriceCAD: null,
    mtPriceCAD: null,
    cwtPriceCAD: null
}


componentDidMount() {
    // axios.get(`https://api.exchangeratesapi.io/latest?base=USD&symbols=CAD`)
    //     .then(res => this.setState({exchangeRate: res.data.rates.CAD}))
}

handleSubmit = (e) => {
    this.calcPricePerPoundCAD();

    e.preventDefault();
}

handleClick = (e) => {
    if(this.state.toggleCanadian === false){
        this.setState({toggleCanadian: true});
    } else if(this.state.toggleCanadian === true){
        this.setState({toggleCanadian: false});
    }
}

setPrice = (e) => {
        this.setState({exchangeRate: e.target.value});
}


calcPricePerPoundCAD() {
// const buPrice = (this.props.buPrice).slice(2);
// console.log(buPrice);


        this.setState(() => {
          this.setState({
            buPriceCAD: `$ ${((this.props.buPrice).slice(2) * this.state.exchangeRate).toFixed(2)}`,
            stPriceCAD: `$ ${((this.props.stPrice).slice(2) * this.state.exchangeRate).toFixed(2)}`,
            mtPriceCAD: `$ ${((this.props.mtPrice).slice(2) * this.state.exchangeRate).toFixed(2)}`,
            cwtPriceCAD: `$ ${((this.props.cwtPrice).slice(2) * this.state.exchangeRate).toFixed(2)}`
          })
        })

    }

    render() {

console.log(this.state.exchangeRate);
console.log(this.state.toggleCanadian);

    const {
        buPriceCAD,
        stPriceCAD,
        mtPriceCAD,
        cwtPriceCAD

    } = this.state;

        return (


            <div>
                <br></br>
                <Button 
                    variant="outline-success"
                    type="submit"
                    onClick={this.handleClick}> Currency Conversion
                </Button> 

                {this.state.toggleCanadian ? 
                <Form>
                <br></br>
                <Form.Group>
                    <Form.Label>Exchange Rate</Form.Label>
                    <FormControl
                    as="input"
                    pattern="[^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$]"
                    aria-label="With textarea"
                    onChange={this.setPrice}/> 
                <Button 
                    variant="outline-success"
                    type="submit"
                    onClick={this.handleSubmit}> Calculate
                </Button>  
                <PricePer 
                              buPrice={buPriceCAD}
                              stPrice={stPriceCAD}
                              mtPrice={mtPriceCAD}
                              cwtPrice={cwtPriceCAD}
                        />    
                
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
            </Form> 
            
            :

            <br></br>
                }
                
            </div>
        )
    }
}
