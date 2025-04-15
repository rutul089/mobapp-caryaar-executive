import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Select_Partner_Role_Component from './Select_Partner_Role_Component';
import {partnerRole} from '../../../constants/enums';
import {goBack, navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

export default class SelectPartnerRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: partnerRole.dealerPrinciple,
    };
  }

  onRoleSelect = value => {
    this.setState({
      selectedRole: value,
    });
  };

  onBackPress = () => {
    goBack();
  };

  handleNextPress = () => {
    navigate(ScreenNames.AddPartnerBasicDetail);
  };

  render() {
    const {selectedRole} = this.state;
    return (
      <>
        <Select_Partner_Role_Component
          onRoleSelect={this.onRoleSelect}
          selectedRole={selectedRole}
          onBackPress={this.onBackPress}
          handleNextPress={this.handleNextPress}
        />
      </>
    );
  }
}
