import React, { Component } from 'react';
import logo from '../logo.png';

export default class Header extends Component {

    render() {

        return (

            <div className="header">
                <img className="logo" src={logo} alt='logo' />
                <p>Price Converter</p>
            </div>
        )
    }
}
