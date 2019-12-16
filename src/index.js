import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Counter2 from './Counter2';
import * as serviceWorker from './serviceWorker';
//import Hello from './Hello';
import Counter from './Counter';
//import ContextSample from './ContextSample';

ReactDOM.render(<Counter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
