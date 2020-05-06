import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


export default function StPrice(props) {
    return (
        <div>
            <ListGroup.Item>{"Short Ton = " + " " }
                <output>{ props.stPrice }</output>
            </ListGroup.Item>
        </div>
    )
}
