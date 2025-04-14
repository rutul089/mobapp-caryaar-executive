import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import Profile_Component from './Profile_Component';
import ScreenNames from '../../constants/ScreenNames';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleMenuPress = this.handleMenuPress.bind(this);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onEditProfilePress = this.onEditProfilePress.bind(this);
  }

  handleMenuPress = (index, item) => {
    if (item.screenName === ScreenNames.Logout) {
      return this.handleLogout();
    }
    navigate(item.screenName);
  };

  handleLogout = () => {
    navigateAndSimpleReset(ScreenNames.Login);
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onEditProfilePress = () => {
    navigate(ScreenNames.EditProfile);
  };

  render() {
    return (
      <>
        <Profile_Component
          handleMenuPress={this.handleMenuPress}
          onRightIconPress={this.onRightIconPress}
          onEditProfilePress={this.onEditProfilePress}
        />
      </>
    );
  }
}
