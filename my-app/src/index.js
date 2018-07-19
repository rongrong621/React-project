import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import { reducers } from './backstage/reducer/reducer1';
import { BrowserRouter as Router } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

 ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    
    document.getElementById('root')

); 
// }


if (module.hot){
     module.hot.accept()
}