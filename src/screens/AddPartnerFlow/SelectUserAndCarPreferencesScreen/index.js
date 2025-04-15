import React, {Component} from 'react';
import {View, Text} from 'react-native';
import User_Car_Type_Selection_Component from './User_Car_Type_Selection_Component';
import {userType, vehicleType} from '../../../constants/enums';
import {goBack, navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

export default class UserAndCarTypeSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCarType: vehicleType.used,
      selectedUserType: userType.multiUser,
    };
    this.onUserTypeSelect = this.onUserTypeSelect.bind(this);
    this.onCarTypeSelect = this.onCarTypeSelect.bind(this);
    this.handleNextPress = this.handleNextPress.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
  }

  onUserTypeSelect = value => {
    this.setState({selectedUserType: value});
  };

  onCarTypeSelect = value => {
    this.setState({
      selectedCarType: value,
    });
  };

  handleNextPress = () => {
    navigate(ScreenNames.SelectPartnerRole);
  };

  onBackPress = () => {
    goBack();
  };

  render() {
    const {selectedCarType, selectedUserType} = this.state;
    return (
      <>
        <User_Car_Type_Selection_Component
          selectedUserType={selectedUserType}
          selectedCarType={selectedCarType}
          onUserTypeSelect={this.onUserTypeSelect}
          onCarTypeSelect={this.onCarTypeSelect}
          handleNextPress={this.handleNextPress}
          onBackPress={this.onBackPress}
        />
      </>
    );
  }
}
