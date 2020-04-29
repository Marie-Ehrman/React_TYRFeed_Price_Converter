import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';



export default class Menu extends Component {

    state = {
        testWeight: this.props.testWeight,
        grain: this.props.grain,
        text: ''
    }

    handleDropdown = (e) => {
        // console.log(e.target.innerHTML);
        this.props.grains.map(grain => {
            
            if(e.target.innerHTML === grain.name){
                this.setState({grain});
            }

        })
    }

    render() {

        const grains = this.props.grains;

        return (

            <DropdownButton
                className="dropdown"
                variant="warning"
                id="dropdown-basic-button"
                title={this.props.name ? this.props.name : "Grains"}
                >
                    {
                        grains.map(grain => 
                            // console.log(grain)
                                    <Dropdown.Item 
                                        // href="/action-1"
                                        key={grain.id}
                                        onClick={(e) =>{this.props.setGrain(grain)} }
                                        >
                                            {grain.name}
                                    </Dropdown.Item>
                        )
                    }
            </DropdownButton>
            
            
        )
    }
}
