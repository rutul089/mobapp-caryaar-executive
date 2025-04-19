import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import {
  setLoginStatus as setReduxLoginStatus,
  setUserDetails,
} from '../../redux/actions';
import {setLoginStatus} from '../../utils/storage';
import OTP_Verification_Component from './OTP_Verification_Component';
const timerValue = 30;

class OTPVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      timer: timerValue,
      isResendDisabled: true,
      otp: '',
      isError: false,
    };
    this.interval = null;
    this.resendOTP = this.resendOTP.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onOtpComplete = this.onOtpComplete.bind(this);
  }

  componentDidMount() {
    const {phone} = this.props;
    this.setState(
      {
        mobileNumber: phone,
      },
      () => this.startTimer(),
    );
  }

  startTimer = () => {
    this.setState({isResendDisabled: true, timer: timerValue});

    this.interval = setInterval(() => {
      this.setState(
        prevState => ({timer: prevState.timer - 1}),
        () => {
          if (this.state.timer === 0) {
            clearInterval(this.interval);
            this.setState({isResendDisabled: false});
          }
        },
      );
    }, 1000);
  };

  resendOTP = () => {
    if (this.state.isResendDisabled) {
      return;
    }
    this.startTimer();
  };

  onBackPress = () => {
    goBack();
  };

  onOtpComplete = value => {
    this.setState(
      {
        otp: value,
      },
      () => {
        this.handleVerify();
      },
    );
  };

  handleVerify = async () => {
    const {otp} = this.state;
    const {phone} = this.props;

    if (otp.length === 4) {
      this.props.setUserDetails({
        name: 'John',
        email: 'john@example.com',
        address: 'New York',
        phone: phone,
      });
      await setLoginStatus(true);
      this.props.setReduxLoginStatus(true);
      return navigateAndSimpleReset(ScreenNames.HomeTab);
    } else {
      this.setState({
        isError: true,
      });
    }
  };

  render() {
    const {mobileNumber, timer, isResendDisabled} = this.state;
    return (
      <>
        <OTP_Verification_Component
          mobileNumber={mobileNumber}
          timer={timer}
          isResendDisabled={isResendDisabled}
          resendOTP={this.resendOTP}
          validateOTP={this.handleVerify}
          onOtpComplete={this.onOtpComplete}
          onBackPress={this.onBackPress}
          isError={this.state.isError}
          errorMessage="Please enter valid OTP"
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  setReduxLoginStatus,
  setUserDetails,
};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
    phone: state.user.userDetails?.phone,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OTPVerification);
