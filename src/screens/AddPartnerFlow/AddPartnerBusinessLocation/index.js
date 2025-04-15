import React, {Component} from 'react';
import {goBack, navigate} from '../../../navigation/NavigationUtils';
import Partner_Location_Form_Component from './Partner_Location_Form_Component';
import ScreenNames from '../../../constants/ScreenNames';

export default class AddPartnerBusinessLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBackPress = this.onBackPress.bind(this);
    this.handleNextPress = this.handleNextPress.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  handleNextPress = () => {
    navigate(ScreenNames.AddPartnerRequiredDocument);
  };

  render() {
    return (
      <>
        <Partner_Location_Form_Component
          onBackPress={this.onBackPress}
          handleNextPress={this.handleNextPress}
        />
      </>
    );
  }
}
