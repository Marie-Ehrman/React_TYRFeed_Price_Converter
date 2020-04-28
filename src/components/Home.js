import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
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


      setPrice = (e) => {
            this.setState({price: e.target.value});
      }

      setGrain(grain){
            this.setState({grain});
      }


      calcPricePerPound = (e) => {
          e.preventDefault();
        const shortTon = 2000;
        const metricTon = 2204.62;      
        

        if(this.state.unit === 'bu'){
            this.setState({pricePerPound: (this.state.price/this.state.grain.TW)})
            this.calcBuPrice();
            this.calcSTPrice();
            this.calcMTPrice();
            this.calcCWTPrice();
        } else if(this.state.unit === 'st') {
            this.setState({pricePerPound: (this.state.price/shortTon)})
            this.calcBuPrice();
            this.calcSTPrice();
            this.calcMTPrice();
            this.calcCWTPrice();
        } else if(this.state.unit === 'mt'){
            this.setState({pricePerPound: (this.state.price/metricTon)})
            this.calcBuPrice();
            this.calcSTPrice();
            this.calcMTPrice();
            this.calcCWTPrice();
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
            this.setState({buPrice: `$ ${price}`})

        } else {
            this.setState({buPrice: `$ ${(grain.TW * pricePerPound).toFixed(2)}`})

        }

      }

      calcSTPrice() {

        const {
          pricePerPound,
        } = this.state;

            this.setState({stPrice: `$ ${(2000 * pricePerPound).toFixed(2)}`})


      }

      calcMTPrice() {

        const {
          pricePerPound,
        } = this.state;

            this.setState({mtPrice: `$ ${(2204.62 * pricePerPound).toFixed(2)}`})


      }

      calcCWTPrice() {
        const {
          pricePerPound,
        } = this.state;

          this.setState({cwtPrice: `$ ${(pricePerPound * 100).toFixed(2)}`})

      }

      render() {

        console.log(this.state.unit);
        console.log(this.state.price);
        console.log(this.state.grain);
        console.log(this.state.buPrice);
        console.log(this.state.stPrice);
        console.log(this.state.mtPrice);
        console.log(this.state.cwtPrice);



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

            <Card className="table">
                <Card.Body>

                    <Card.Title>
                      Select Grain:
                        <Menu
                            grains={grains}
                            setGrain={this.setGrain.bind(this)}
                            onClick={this.setTestWeight}
                          />
                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted">
                      Select Measurement
                      <br></br>
                        <Button 
                            className="card-buttons"
                            variant="success"
                            onClick={this.handleClick}>Bushel</Button>
                        <Button
                            className="card-buttons"
                            variant="success"
                            onClick={this.handleClick}>Short Ton</Button>
                        <Button
                            className="card-buttons"
                            variant="success"
                            onClick={this.handleClick}>Metric Ton</Button>
                    </Card.Subtitle> 
                    
                    {/* {this.state.grain ? this.state.grain : <br></br>} */}


                    <br></br>
                    <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>Quoted Price:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as="input"
                            pattern="[^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$]"
                            aria-label="With textarea"
                            onChange={this.setPrice}/>

                        <Button 
                            variant="outline-success"
                            type="submit"
                            onClick={this.calcPricePerPound}> Calculate
                        </Button>
                    </InputGroup>

                        {/* <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link> */}
                      <div className="price-per">
                        <br></br>
                        <PricePer 
                              tw={testWeight}
                              price={price}
                              unit={unit}
                              buPrice={buPrice}
                              stPrice={stPrice}
                              mtPrice={mtPrice}
                              cwtPrice={cwtPrice}
                        />
                      </div> 
                </Card.Body>
            </Card>

        )
      }
}