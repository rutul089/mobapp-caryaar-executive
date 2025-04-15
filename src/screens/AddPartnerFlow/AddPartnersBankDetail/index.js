import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Bank_Detail_Component from './Partner_Bank_Detail_Component';
import {transferModes} from '../../../constants/enums';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

export default class AddPartnersBankDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTransferMode: transferModes.imps,
    };
  }

  onTransferModeSelect = value => {
    this.setState({
      selectedTransferMode: value,
    });
  };

  handleSubmitPress = () => {
    navigate(ScreenNames.PartnerRegistrationSuccess);
  };

  render() {
    const {selectedTransferMode} = this.state;
    return (
      <>
        <Partner_Bank_Detail_Component
          transferModes={[
            {label: 'NEFT', value: transferModes.neft},
            {label: 'IMPS', value: transferModes.imps},
          ]}
          selectedTransferMode={selectedTransferMode}
          onTransferModeSelect={this.onTransferModeSelect}
          handleSubmitPress={this.handleSubmitPress}
        />
      </>
    );
  }
}
