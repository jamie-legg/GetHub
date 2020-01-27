import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


ReactDOM.render(<App />, document.getElementById('root'));
configure({ adapter: new Adapter() })
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
