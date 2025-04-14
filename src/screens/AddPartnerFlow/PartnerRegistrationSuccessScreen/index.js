import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Success_Component from './Partner_Success_Component';

export default class PartnerRegistrationSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Partner_Success_Component />
      </>
    );
  }
}
