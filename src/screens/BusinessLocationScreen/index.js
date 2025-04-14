import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Business_Location_Component from './Business_Location_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

export default class BusinessLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNextPress = this.handleNextPress.bind(this);
  }

  handleNextPress = () => {
    navigate(ScreenNames.DocumentScreen);
  };

  render() {
    return (
      <>
        <Business_Location_Component handleNextPress={this.handleNextPress} />
      </>
    );
  }
}
