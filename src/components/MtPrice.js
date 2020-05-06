import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


export default function MtPrice(props) {
    return (
        <div>
            <ListGroup.Item>{"Metric Ton = " + " " }
                <output>{ props.mtPrice }</output>
            </ListGroup.Item>
        </div>
    )
}
