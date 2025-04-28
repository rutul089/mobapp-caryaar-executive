import React, {Component} from 'react';
import {
  settlementPreference,
  settlementPreferenceOptions,
} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import Partner_BankDetails_Component from './Partner_BankDetails_Component';

export default class PartnerBankDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTransferMode: settlementPreference.IMPS,
    };
    this.onTransferModeSelect = this.onTransferModeSelect.bind(this);
  }

  onTransferModeSelect = value => {
    this.setState({
      selectedTransferMode: value,
    });
  };

  onClosePress = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  render() {
    const {selectedTransferMode} = this.state;
    return (
      <>
        <Partner_BankDetails_Component
          transferModes={settlementPreferenceOptions}
          selectedTransferMode={selectedTransferMode}
          onTransferModeSelect={this.onTransferModeSelect}
          onClosePress={this.onClosePress}
        />
      </>
    );
  }
}
