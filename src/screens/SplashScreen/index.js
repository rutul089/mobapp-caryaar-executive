import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import Splash_Component from './Splash_Component';
import {getLoginStatus, setAccessToken} from '../../utils/storage';
import {setLoginStatus} from '../../redux/actions';
import {connect} from 'react-redux';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkLoginStatusAndNavigate();
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGFkY2VlLWIxZjEtNGU0MC04ODgzLTEyMDYwNGQwZWQ5MSIsInJvbGVJZCI6ImIyNTk3ZDY2LTRjNjctNGFiZi1iMWFjLThhYmEzOWM0ZDBlYiIsInJvbGUiOiJTQUxFU19FWEVDVVRJVkUiLCJpYXQiOjE3NDYwOTY5NzMsImV4cCI6MTc0ODY4ODk3M30.tM7kJkS6dOjWKYc9xgS1ZMPuza16ZLrv6jeTVP2uVw4',
    );
  }

  checkLoginStatusAndNavigate = async () => {
    const loginStatus = await getLoginStatus();
    this.props.setLoginStatus(loginStatus);

    setTimeout(() => {
      if (loginStatus) {
        navigateAndSimpleReset(ScreenNames.HomeTab);
      } else {
        navigateAndSimpleReset(ScreenNames.Login);
      }
    }, 1500);
  };

  render() {
    return (
      <>
        <Splash_Component />
      </>
    );
  }
}

const mapDispatchToProps = {setLoginStatus};
const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
