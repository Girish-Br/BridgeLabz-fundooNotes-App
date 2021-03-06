/******************************************************************************
 *  @Purpose        : to test login component with jest and enzyme
 *  @file           : login.test.js
 *  @author         : GIRISH B R
 *  @since          : 05-12-2019
 *******************************************************************************/
import React from 'react';
import { shallow} from 'enzyme';
import Login from '../components/login';
import '../setUpTest'
describe('Login Component', () => {
  //testing rendering of login component
    it('should render without throwing an error', () => {
        expect(shallow(< Login />).exists()).toBe(true)
    })
    //testing the email and password input existence
    it('renders a email input', () => {
        expect(shallow( < Login /> ).find('#outlined-email-input').length).toEqual(1)
      })
      it('renders a password input', () => {
        expect(shallow( < Login /> ).find('#outlined-pass-input').length).toEqual(1)
      })
})
describe('Email input', () => {
  //testing email input
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-email-input').simulate('change', {
        target: {
          name: 'email',
          value: 'girishpacchu1427@gmail.com'
        }
      });
      expect(wrapper.state('email')).toEqual('girishpacchu@gmail.com');
    })
  })
  describe('Password input', () => {
    //testing password input
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-pass-input')
        .simulate('change', {
          target: {
            name: 'password',
            value: 'giri141519'
          }
        });
      expect(wrapper.state('password')).toEqual('giri141519');
    })
  })