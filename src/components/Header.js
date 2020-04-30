import React, { Component } from 'react';
import logo from '../logo.png';

export default class Header extends Component {

    render() {

        return (

            <div className="header">
                <div className="subheader"><img className="logo" src={logo} alt='logo' /><h1 className="feed">Feed</h1></div>
                <div>
                    <p>Price Converter</p>
                </div>
            </div>
                

        )
    }
}
