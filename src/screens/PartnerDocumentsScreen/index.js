import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Documents_Component from './Partner_Documents_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

export default class PartnerDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNextPress = () => {
    navigate(ScreenNames.PartnerBankDetails);
  };

  render() {
    return (
      <>
        <Partner_Documents_Component handleNextPress={this.handleNextPress} />
      </>
    );
  }
}
