import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './Redux/Reducers/reducer';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';


const store = createStore(reducer);

ReactDOM.render( <Provider store={store}> <App /> </Provider>,
     document.getElementById('root'));
