import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/font.css'
import App from './component/App';
import * as serviceWorker from './serviceWorker'

window.$ = $;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
