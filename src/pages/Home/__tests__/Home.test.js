import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';
import { mount,shallow } from 'enzyme';
import Home from '../Home';

const router = {
    history: new BrowserRouter().history,
    route: {
      location: {},
      match: {},
    },
  };
  
  const createContext = () => ({
    context: { router },
    childContextTypes: { router: shape({}) },
  });
  
  export function mountWrap(node) {
    return mount(node, createContext());
  }


  describe("<Home />", () => {

    const history = {
        push: jest.fn(),
      }

    it("renders in the dom", () => {
        const wrapper = shallow(<Home history={history} />);
        expect(wrapper).toBeTruthy();
     });
 });