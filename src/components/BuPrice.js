import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


export default function BuPrice(props) {

    
    return (
        <div>
            <ListGroup.Item>{"Bushel = " + " " }
                <output>{ props.buPrice }</output>
            </ListGroup.Item>
        </div>
    )
}
