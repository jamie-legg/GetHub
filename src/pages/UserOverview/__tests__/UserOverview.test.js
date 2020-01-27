import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { UserOverview } from '../UserOverview';

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


  describe('<Application />', () => {

    const history = {
      push: jest.fn(),
    }
  
    it('UserOverview', () => {
      sinon.spy(UserOverview.prototype, 'componentDidMount');
      const wrapper = mount(<UserOverview history={history} />);
      expect(UserOverview.prototype.componentDidMount.calledOnce).toEqual(true);
    });
  
  });