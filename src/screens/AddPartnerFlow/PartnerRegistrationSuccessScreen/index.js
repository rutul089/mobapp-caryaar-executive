import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Success_Component from './Partner_Success_Component';
import {navigateAndSimpleReset} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

export default class PartnerRegistrationSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onBackToHome = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  render() {
    return (
      <>
        <Partner_Success_Component onBackToHome={this.onBackToHome} />
      </>
    );
  }
}
