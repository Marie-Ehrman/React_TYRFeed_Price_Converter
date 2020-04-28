import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../src/components/Header';
import Home from '../src/components/Home';

class App extends Component {

  render() {

    return (

        <BrowserRouter>

          <Header />

            <div className="App">
              <Route exact path='/' component={Home}/>
            </div>

        </BrowserRouter>

    )
  }
}

export default App;
