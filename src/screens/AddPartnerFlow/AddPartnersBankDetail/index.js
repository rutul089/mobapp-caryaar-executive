import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from '../../../components';
import {
  settlementPreference,
  settlementPreferenceOptions,
} from '../../../constants/enums';
import ScreenNames from '../../../constants/ScreenNames';
import {getScreenParam, navigate} from '../../../navigation/NavigationUtils';
import {
  createPartnerThunk,
  setBankingDetails,
  updatePartnerThunk,
} from '../../../redux/actions';
import {
  handleFieldChange,
  showToast,
  validateField,
} from '../../../utils/helper';
import Partner_Bank_Detail_Component from './Partner_Bank_Detail_Component';
import {formatPartnerPayload} from '../../../utils/partnerHelpers';

class AddPartnersBankDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      accountHolderName: '',
      bankName: '',
      bankNameValue: '',
      ifscCode: '',
      branchName: '',
      selectedTransferMode: settlementPreference.IMPS,
      errors: {
        accountNumber: '',
        accountHolderName: '',
        bankName: '',
        ifscCode: '',
        branchName: '',
      },
      isFormValid: false,
      showImages: [1, 2, 3],
      errorSteps: [],
      fromScreen: false,
    };
  }
  componentDidMount() {
    const {bankingDetails, route} = this.props;

    let navState = getScreenParam(route, 'params', null);
    let fromScreen = get(navState, 'fromScreen', false);
    if (fromScreen) {
      this.setState({
        showImages: get(navState, 'showImages', []),
        errorSteps: get(navState, 'errorSteps', []),
      });
    }

    this.setState({
      fromScreen: fromScreen,
      accountNumber: get(bankingDetails, 'accountNumber', ''),
      ifscCode: get(bankingDetails, 'ifscCode', ''),
      bankName: get(bankingDetails, 'bankName', ''),
      accountHolderName: get(bankingDetails, 'accountHolderName', ''),
      selectedTransferMode: get(
        bankingDetails,
        'settlementPreference',
        settlementPreference.IMPS,
      ),
    });
  }

  onTransferModeSelect = value => {
    this.setState({
      selectedTransferMode: value,
    });
  };

  handleSubmitPress = () => {
    const {partnerForm, selectedPartner} = this.props;
    const {
      accountNumber,
      accountHolderName,
      bankName,
      bankNameValue,
      ifscCode,
      branchName,
      selectedTransferMode,
      fromScreen,
    } = this.state;

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      console.log('Form is invalid. Please correct the fields.');
      return;
    }

    let bankingDetail = {
      accountNumber,
      accountHolderName,
      bankName: bankNameValue,
      ifscCode,
      branchName,
      settlementPreference: selectedTransferMode,
    };

    this.props.setBankingDetails(bankingDetail);

    const requestPayload = formatPartnerPayload(partnerForm, bankingDetail);

    if (fromScreen) {
      let partnerID = selectedPartner.id;
      delete requestPayload.documents;
      delete requestPayload.sellerType;
      delete requestPayload.partnerType;
      delete requestPayload.isMultiUser;
      delete requestPayload.partnerRole;
      console.log('requestPayload---------->', requestPayload);
      this.props.updatePartnerThunk(
        partnerID,
        requestPayload,
        onSuccess => {
          showToast(onSuccess.message);
        },
        error => {},
      );
      return;
    }
    console.log('requestPayload---------->', requestPayload);

    this.props.createPartnerThunk(
      requestPayload,
      onSuccess => {
        console.log({onSuccess});
        if (onSuccess?.success) {
          navigate(ScreenNames.PartnerRegistrationSuccess);
        }
      },
      onFail => {},
    );
  };

  onSelectBank = (item, index) => {
    this.setState({bankName: item?.label}, () => {
      this.onChangeField('bankNameValue', item?.value);
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
    const {isLoading} = this.props;
    return (
      <>
        <Partner_Bank_Detail_Component
          transferModes={settlementPreferenceOptions}
          dropdownOptions={[
            {label: 'HDFC Bank', value: 'HDFC'},
            {label: 'ICICI Bank', value: 'ICICI'},
            {label: 'State Bank of India', value: 'SBI'},
            {label: 'Axis Bank', value: 'AXIS'},
            {label: 'Kotak Mahindra Bank', value: 'KOTAK'},
            {label: 'Other Bank', value: 'OTHER'},
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
          showImages={this.state.showImages}
          errorSteps={this.state.errorSteps}
        />
        {isLoading && <Loader visible={isLoading} />}
      </>
    );
  }
}

const mapDispatchToProps = {
  setBankingDetails,
  createPartnerThunk,
  updatePartnerThunk,
};
const mapStateToProps = ({appState, partnerForm, partners}) => {
  return {
    isInternetConnected: appState.isInternetConnected,
    isLoading: partners.loading,
    success: partners.success,
    documentDetails: partnerForm.documentDetails,
    bankingDetails: partnerForm.bankingDetails,
    basicDetails: partnerForm.basicDetails,
    partnerForm: partnerForm,
    selectedPartner: partners?.selectedPartner,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnersBankDetail);
