import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import HeaderBar from './components/HeaderBar';

class App extends Component {
    render() {
        return (
            <div className="container">
                <HeaderBar />
                <NavigationBar />
                {this.props.children}
            </div>
        );
    }
}
export default App;
