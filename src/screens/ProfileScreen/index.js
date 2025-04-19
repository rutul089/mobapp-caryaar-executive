import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import Profile_Component from './Profile_Component';
import {clearLoginStatus} from '../../utils/storage';
import {connect} from 'react-redux';
import {clearAllData, setLoginStatus} from '../../redux/actions';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
    };
    this.handleMenuPress = this.handleMenuPress.bind(this);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onEditProfilePress = this.onEditProfilePress.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
  }

  handleMenuPress = (index, item) => {
    if (item.screenName === ScreenNames.Logout) {
      return this.handleLogout();
    }
    navigate(item.screenName);
  };

  handleLogout = () => {
    this.toggleLogoutModal(true);
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onEditProfilePress = () => {
    navigate(ScreenNames.EditProfile);
  };

  toggleLogoutModal = visible => {
    this.setState({showLogoutModal: visible});
  };

  onPressPrimaryButton = () => {
    this.toggleLogoutModal(false);
    this.props.clearLoginStatus();
    this.props.clearAllData();
    this.props.setLoginStatus(false);
    navigateAndSimpleReset(ScreenNames.Login);
  };

  onModalHide = () => {
    this.toggleLogoutModal(false);
  };

  render() {
    const {showLogoutModal} = this.state;
    const {userDetail} = this.props;
    return (
      <>
        <Profile_Component
          handleMenuPress={this.handleMenuPress}
          onRightIconPress={this.onRightIconPress}
          onEditProfilePress={this.onEditProfilePress}
          showLogoutModal={showLogoutModal}
          onPressPrimaryButton={this.onPressPrimaryButton}
          onModalHide={this.onModalHide}
          address={userDetail?.address}
          name={userDetail?.name}
          email={userDetail?.email}
          phone={userDetail?.phone}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  setLoginStatus,
  clearAllData,
  clearLoginStatus,
};
const mapStateToProps = state => {
  return {
    userDetail: state.user?.userDetails,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
