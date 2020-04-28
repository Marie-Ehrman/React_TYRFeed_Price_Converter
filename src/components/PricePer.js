import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
;

export default class PricePer extends Component {


    render() {


        return (

            
            <div className="units">
                <Card style={{ width: '18rem' }}>
                <Card.Header>Price Per:</Card.Header>

                    <ListGroup variant="flush">
                        <ListGroup.Item>Bushel = 
                            <output>{ this.props.buPrice }</output>
                        </ListGroup.Item>
                        <ListGroup.Item>Short Ton = 
                            <output>{ this.props.stPrice }</output>
                        </ListGroup.Item>
                        <ListGroup.Item>Metric Ton = 
                            <output>{ this.props.mtPrice }</output>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>CWT = 
                            <output>{ this.props.cwtPrice }</output>
                    </ListGroup.Item>
                </Card>

            </div>
        )
    }
}
