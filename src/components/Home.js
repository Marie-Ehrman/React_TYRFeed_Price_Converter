import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form';


import Menu from './Menu';
import PricePer from './PricePer'
// import APIkey from './config';



export default class Home extends Component {

    constructor() {

        super()
        this.state = {
            data: [],
            grain: '',
            unit: '',
            price: null,
            pricePerPound: null,
            buPrice: null,
            stPrice: null,
            mtPrice: null,
            cwtPrice: null


    
        }
      }


      componentDidMount() {
            this.getData()
      }

      getData() {
        
        axios.get('../../data.json')
        .then(response => 
        //   console.log(response.data.grains)
          this.setState({data: response.data.grains})
          )

        //SEARCH QUERY - requires a query string
        // axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${APIkey}&query=${food}`)
    
        //LIST QUERY - queries the entire list of food
        // axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${APIkey}`)
    
        // // WORD QUERY - requires am FDC ID #
        // axios.get(`https://api.nal.usda.gov/fdc/v1/food/${food}?api_key=${APIkey}`)
    
        //QUERY BY FDC ID#
        // .then(response => this.setState({data: response.data}))
      }
    

    //HANDLERS

      handleClick = (e) => {
          if(e.target.innerHTML === 'Bushel'){
            this.setState({unit: 'bu'});
          } else if(e.target.innerHTML === 'Short Ton') {
            this.setState({unit: 'st'});
          } else if(e.target.innerHTML === 'Metric Ton'){
            this.setState({unit: 'mt'});
          }
      }

      handleSubmit = (e) => {
          this.calcPricePerPound();
          this.calcBuPrice();
          this.calcSTPrice();
          this.calcMTPrice();
          this.calcCWTPrice();
          
          e.preventDefault();
      }

      setPrice = (e) => {
            this.setState({price: e.target.value});

      }

      setGrain(grain){
            this.setState({grain});
      }


      calcPricePerPound = () => {
        const shortTon = 2000;
        const metricTon = 2204.62;      
        

        if(this.state.unit === 'bu'){
            this.setState({pricePerPound: (this.state.price/this.state.grain.TW)})
            // this.calcBuPrice();
            // this.calcSTPrice();
            // this.calcMTPrice();
            // this.calcCWTPrice();
        } else if(this.state.unit === 'st') {
            this.setState({pricePerPound: (this.state.price/shortTon)})
            // this.calcBuPrice();
            // this.calcSTPrice();
            // this.calcMTPrice();
            // this.calcCWTPrice();
        } else if(this.state.unit === 'mt'){
            this.setState({pricePerPound: (this.state.price/metricTon)})
            // this.calcBuPrice();
            // this.calcSTPrice();
            // this.calcMTPrice();
            // this.calcCWTPrice();
        }


        console.log(this.state.pricePerPound)

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

          this.setState({cwtPrice: `$ ${(pricePerPound * 100).toFixed(2)}`})

      }

      render() {

          const grains = this.state.data;

          const {
            testWeight,
            price,
            unit,
            buPrice,
            stPrice,
            mtPrice,
            cwtPrice

          } = this.state;

        return (

            <Card className="table" border="success">
                <Card.Body>

                    <Card.Title>
                      Select Grain:
                      <br></br>
                        <Menu
                            grains={grains}
                            setGrain={this.setGrain.bind(this)}
                            onClick={this.setTestWeight}
                            name={this.state.grain.name}
                          />
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                      Select Units
                      <br></br>
                      <style type="text/css">
                              {`
                              .btn-flat {
                                background-color: #285844;
                                color: white;
                              }
                              `}
                            </style>
                        <Button 
                            className="card-buttons"
                            variant="flat"
                            active
                            onClick={this.handleClick}>Bushel</Button>
                        <Button
                            className="card-buttons"
                            variant="flat"
                            active
                            onClick={this.handleClick}>Short Ton</Button>
                        <Button
                            className="card-buttons"
                            variant="flat"
                            active
                            onClick={this.handleClick}>Metric Ton</Button>
                    </Card.Subtitle> 
                    <br></br>
                    <Form>
                        <Form.Group>
                          <Form.Label>Quoted Price</Form.Label>
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
                          <Form.Text className="text-muted">
                          </Form.Text>
                        </Form.Group>
                      </Form>

                        <PricePer 
                              tw={testWeight}
                              price={price}
                              unit={unit}
                              buPrice={buPrice}
                              stPrice={stPrice}
                              mtPrice={mtPrice}
                              cwtPrice={cwtPrice}
                        />
                </Card.Body>
            </Card>

        )
      }
}