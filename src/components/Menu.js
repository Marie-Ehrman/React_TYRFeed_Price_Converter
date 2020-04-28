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

//             <DropdownButton id="dropdown-basic-button" title="Dropdown button">
//   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
// </DropdownButton>


            <DropdownButton
                className="dropdown"
                variant="warning"
                id="dropdown-basic-button"
                title="Grains"
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
