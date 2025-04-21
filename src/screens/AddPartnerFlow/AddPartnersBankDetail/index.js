import React, {Component} from 'react';
import {transferModes} from '../../../constants/enums';
import ScreenNames from '../../../constants/ScreenNames';
import {navigate} from '../../../navigation/NavigationUtils';
import Partner_Bank_Detail_Component from './Partner_Bank_Detail_Component';
import {connect} from 'react-redux';
import {setBankingDetails} from '../../../redux/actions';
import {handleFieldChange, validateField} from '../../../utils/helper';

class AddPartnersBankDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      accountHolderName: '',
      bankName: '',
      ifscCode: '',
      branchName: '',
      selectedTransferMode: transferModes.imps,
      errors: {
        accountNumber: '',
        accountHolderName: '',
        bankName: '',
        ifscCode: '',
        branchName: '',
      },
      isFormValid: false,
    };
  }

  onTransferModeSelect = value => {
    this.setState({
      selectedTransferMode: value,
    });
  };

  handleSubmitPress = () => {
    const {
      accountNumber,
      accountHolderName,
      bankName,
      ifscCode,
      branchName,
      selectedTransferMode,
    } = this.state;

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      console.log('Form is invalid. Please correct the fields.');
      return;
    }

    this.props.setBankingDetails({
      accountNumber,
      accountHolderName,
      bankName,
      ifscCode,
      branchName,
      selectedTransferMode,
    });
    navigate(ScreenNames.PartnerRegistrationSuccess);
  };

  onSelectBank = (item, index) => {
    this.setState({bankName: item.label}, () => {
      this.onChangeField('bankName', this.state.bankName);
    });
  };

  validateAllFields = () => {
    const fieldsToValidate = [
      'accountNumber',
      'accountHolderName',
      'bankName',
      'ifscCode',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  render() {
    const {
      selectedTransferMode,
      accountNumber,
      accountHolderName,
      bankName,
      ifscCode,
      branchName,
      errors,
    } = this.state;
    return (
      <>
        <Partner_Bank_Detail_Component
          transferModes={[
            {label: 'NEFT', value: transferModes.neft},
            {label: 'IMPS', value: transferModes.imps},
          ]}
          dropdownOptions={[
            {label: 'HDFC Bank', value: 'hdfc'},
            {label: 'ICICI Bank', value: 'icici'},
            {label: 'State Bank of India', value: 'sbi'},
            {label: 'Axis Bank', value: 'axis'},
            {label: 'Kotak Mahindra Bank', value: 'kotak'},
            {label: 'Punjab National Bank', value: 'pnb'},
            {label: 'Bank of Baroda', value: 'bob'},
            {label: 'Yes Bank', value: 'yes'},
          ]}
          bankName={bankName}
          selectedTransferMode={selectedTransferMode}
          onTransferModeSelect={this.onTransferModeSelect}
          handleSubmitPress={this.handleSubmitPress}
          onAccountNumberChange={value =>
            this.onChangeField('accountNumber', value)
          }
          onAccountHolderNameChange={value =>
            this.onChangeField('accountHolderName', value)
          }
          onBankNamePress={value => this.onChangeField('bankName', value)}
          onIFSCCodeChange={value =>
            this.onChangeField('ifscCode', value.toUpperCase())
          }
          onSelectBank={this.onSelectBank}
          restInputProps={{
            accountNumber: {
              value: accountNumber,
              isError: errors.accountNumber,
              statusMsg: errors.accountNumber,
            },
            accountHolderName: {
              value: accountHolderName,
              isError: errors.accountHolderName,
              statusMsg: errors.accountHolderName,
            },
            ifscCode: {
              value: ifscCode,
              isError: errors.ifscCode,
              statusMsg: errors.ifscCode,
            },
            bankName: {
              value: bankName,
              isError: errors.bankName,
              statusMsg: errors.bankName,
            },
          }}
        />
      </>
    );
  }
}

const mapDispatchToProps = {setBankingDetails};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    isLoading: state.appState.loading,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnersBankDetail);
