import React, {Component} from 'react';
import {transferModes} from '../../constants/enums';
import Partner_BankDetails_Component from './Partner_BankDetails_Component';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

export default class PartnerBankDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTransferMode: transferModes.imps,
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
          transferModes={[
            {label: 'NEFT', value: transferModes.neft},
            {label: 'IMPS', value: transferModes.imps},
          ]}
          selectedTransferMode={selectedTransferMode}
          onTransferModeSelect={this.onTransferModeSelect}
          onClosePress={this.onClosePress}
        />
      </>
    );
  }
}
