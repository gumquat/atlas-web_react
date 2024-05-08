import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Notifications from "../Notifications/Notifications";
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

describe('App', () => {
  let wrapper;
  let logOutMock;

  beforeEach(() => {
    logOutMock = jest.fn();
    wrapper = shallow(<App logOut={logOutMock} />);
  });

  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('contains the Notifications component', () => {
    expect(wrapper.contains(<Notifications />)).toBe(true);
  });

  it('contains the Header component', () => {
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it('contains the Login component', () => {
    expect(wrapper.contains(<Login />)).toBe(true);
  });

  it('contains the Footer component', () => {
    expect(wrapper.contains(<Footer />)).toBe(true);
  });

  it('does not render CourseList when isLoggedIn is false', () => {
      const wrapper = shallow(<App isLoggedIn={false} />);
      expect(wrapper.find(CourseList).length).toBe(0);
  });

  describe('when isLoggedIn is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isLoggedIn: true });
    });

    it('does not render Login component', () => {
      expect(wrapper.find(Login).length).toBe(0);
    });

    it('renders CourseList component', () => {
      expect(wrapper.find(CourseList).length).toBe(1);
  });
});

  it('calls logOut function and displays alert when control and h keys are pressed', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const keydownEvent = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });

    wrapper.instance().handleKeyDown(keydownEvent);

    expect(consoleSpy).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
