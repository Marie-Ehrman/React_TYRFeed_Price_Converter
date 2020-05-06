import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BuPrice from "./BuPrice";
import StPrice from "./StPrice";
import MtPrice from "./MtPrice";

export default class PricePer extends Component {

    state = {
        grain: '',
        unit: '',
        price: this.props.price,
        pricePerPound: null,
        buPrice: null,
        stPrice: null,
        mtPrice: null,
        cwtPrice: null
    }  

    calcPricePerPound = () => {
        const shortTon = 2000;
        const metricTon = 2204.62;      
        

        if(this.state.unit === 'bu'){
            this.setState({pricePerPound: (this.state.price/this.props.grain.TW)})

        } else if(this.state.unit === 'st') {
            this.setState({pricePerPound: (this.state.price/shortTon)})

        } else if(this.state.unit === 'mt'){
            this.setState({pricePerPound: (this.state.price/metricTon)})

        }

    }

    calcBuPrice() {

        const {
          pricePerPound,
          price,
          grain
        } = this.state;

        if(this.state.unit === 'bu'){
          console.log("IN BU PRICE 1");
            this.setState({buPrice: `$ ${(price * 1).toFixed(2)}`})
            this.setState({stPrice: `$ ${(2000 * pricePerPound).toFixed(2)}`})


        } else {
          console.log("IN BU PRICE 2");
            this.setState({buPrice: `$ ${(grain.TW * pricePerPound).toFixed(2)}`})

        }

      }

      calcSTPrice() {

        const {
          pricePerPound,
        } = this.state;

        console.log("IN ST PRICE");

            this.setState({stPrice: `$ ${(2000 * pricePerPound).toFixed(2)}`})


      }

      calcMTPrice() {

        const {
          pricePerPound,
        } = this.state;


        console.log("IN MT PRICE");

            this.setState({mtPrice: `$ ${(2204.62 * pricePerPound).toFixed(2)}`})


      }

      calcCWTPrice() {
        const {
          pricePerPound,
        } = this.state;
        
        console.log("IN CWT PRICE");

          this.setState({cwtPrice: `$ ${(pricePerPound * 100).toFixed(2)}`})

      }

    render() {
            console.log(this.props);

        return (

            
                <Card className="units" style={{ width: '18rem' }}>
                <Card.Header>Price Per:</Card.Header>

                    <ListGroup variant="flush">
                        <BuPrice buPrice={this.props.buPrice}/>
                        <StPrice stPrice={this.props.stPrice}/>
                        <MtPrice mtPrice={this.props.mtPrice}/>
                        {/* <ListGroup.Item>{"Bushel = " + " " }
                            <output>{ this.props.buPrice }</output>
                        </ListGroup.Item>
                        <ListGroup.Item>{"Short Ton = " + " " }
                            <output>{ this.props.stPrice }</output>
                        </ListGroup.Item>
                        <ListGroup.Item>{"Metric Ton = " + " " }
                            <output>{ this.props.mtPrice }</output>
                        </ListGroup.Item> */}
                        <ListGroup.Item>{"CWT =" + " " } 
                            <output>{ this.props.cwtPrice }</output>
                    </ListGroup.Item>
                    </ListGroup>

                </Card>

        )
    }
}
