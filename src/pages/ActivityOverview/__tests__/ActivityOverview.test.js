import React from 'react';
import ReactDOM from 'react-dom';
import { ActivityOverview } from '../ActivityOverview';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';

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


  describe('<ActivityOverview />', () => {

    const history = {
      push: jest.fn(),
    }
  
    it('calls componentDidMount', () => {
      sinon.spy(ActivityOverview.prototype, 'componentDidMount');
      const wrapper = mount(<ActivityOverview history={history} />);
      expect(ActivityOverview.prototype.componentDidMount.calledOnce).toEqual(true);
    });
  
  });