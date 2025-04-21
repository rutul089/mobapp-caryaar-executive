import React, {Component} from 'react';
import {transferModes} from '../../../constants/enums';
import ScreenNames from '../../../constants/ScreenNames';
import {navigate} from '../../../navigation/NavigationUtils';
import Partner_Bank_Detail_Component from './Partner_Bank_Detail_Component';
import {connect} from 'react-redux';
import {setBankingDetails} from '../../../redux/actions';

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
      isFormValid: false, // This state will track if the form is valid
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
      isFormValid,
    } = this.state;

    if (bankName === '') {
      this.onChangeField('bankName', bankName);
      return;
    }

    if (!isFormValid) {
      const message = 'Please fill all required fields correctly.';
      console.log({message});
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

  validateField = (key, value) => {
    console.log(key, value);
    const trimmedValue = value.trim();

    switch (key) {
      case 'accountNumber':
        const accountNumberRegex = /^[0-9]{9,18}$/; // 9-18 digit numeric only
        return accountNumberRegex.test(trimmedValue)
          ? ''
          : 'Account number must be 9 to 18 digit number';

      case 'accountHolderName':
        return trimmedValue === ''
          ? 'Please enter a valid account holder name'
          : '';

      case 'bankName':
        console.log('123:bankName', trimmedValue === '');
        return trimmedValue === '' ? 'Please select a valid bank name' : '';

      case 'ifscCode':
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/; // Standard IFSC format
        return ifscRegex.test(trimmedValue)
          ? ''
          : 'Please enter a valid IFSC code (e.g., HDFC0001234)';

      default:
        return '';
    }
  };

  onChangeField = (key, value) => {
    const errorMsg = this.validateField(key, value);

    this.setState(prevState => {
      const updatedErrors = {
        ...prevState.errors,
        [key]: errorMsg,
      };

      // Check if all fields are valid
      const isFormValid = Object.values(updatedErrors).every(
        error => error === '',
      );

      return {
        [key]: value,
        errors: updatedErrors,
        isFormValid, // Update form validity status
      };
    });
  };

  onSelectBank = (item, index) => {
    this.setState({bankName: item.label}, () => {
      this.onChangeField('bankName', this.state.bankName);
    });
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
