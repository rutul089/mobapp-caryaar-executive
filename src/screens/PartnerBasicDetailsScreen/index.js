import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Basic_Details_Component from './Partner_Basic_Details_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

export default class PartnerBasicDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessType: '',
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  onSelectBusinessType = (item, index) => {
    this.setState({
      businessType: item?.label,
    });
  };

  handleNextPress = () => {
    navigate(ScreenNames.BusinessLocation);
  };

  render() {
    return (
      <>
        <Partner_Basic_Details_Component
          onBackPress={this.onBackPress}
          businessType={this.state.businessType}
          onSelectBusinessType={this.onSelectBusinessType}
          handleNextPress={this.handleNextPress}
        />
      </>
    );
  }
}
