import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import HomePage from './components/HomePage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import ParkingReservationPage from './components/reservation/ParkingReservationPage';
import Success from './components/success/success'
import Logout from './components/login/Logout.js'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="signup" component={SignupPage} />
        <Route path="login" component={LoginPage} />
        <Route path="reservation" component={ParkingReservationPage} />
        <Route path="success" component={Success}/>
        <Route path="logout" component={Logout}/>
    </Route>
)
