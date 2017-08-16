import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
