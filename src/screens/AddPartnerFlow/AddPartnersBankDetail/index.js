import {theme} from '@caryaar/components';
import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from '../../../components';
import {
  settlementPreference,
  settlementPreferenceOptions,
} from '../../../constants/enums';
import ScreenNames from '../../../constants/ScreenNames';
import {
  getScreenParam,
  navigateAndSimpleResetWithParam,
  navigateToTab,
} from '../../../navigation/NavigationUtils';
import {
  createPartnerThunk,
  searchBanksThunk,
  setBankingDetails,
  updatePartnerThunk,
  verifyBankByIFSCThunk,
} from '../../../redux/actions';
import {
  handleFieldChange,
  showToast,
  validateField,
} from '../../../utils/helper';
import {formatPartnerPayload} from '../../../utils/partnerHelpers';
import Partner_Bank_Detail_Component from './Partner_Bank_Detail_Component';

class AddPartnersBankDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      accountHolderName: '',
      bankName: '',
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
      loading: false,
    };
    this.searchBankNameFromAPI = this.searchBankNameFromAPI.bind(this);
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
      branchName: get(bankingDetails, 'branchName', ''),
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
      ifscCode,
      branchName,
      selectedTransferMode,
      fromScreen,
    } = this.state;

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('error', 'Required field cannot be empty.', 'bottom', 3500);
      return;
    }

    let bankingDetail = {
      accountNumber,
      accountHolderName,
      bankName: bankName,
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
      this.props.updatePartnerThunk(
        partnerID,
        requestPayload,
        onSuccess => {
          showToast('success', onSuccess.message);
          if (onSuccess?.success) {
            navigateToTab(ScreenNames.Partners);
          }
        },
        error => {},
      );
      return;
    }

    this.props.createPartnerThunk(
      requestPayload,
      onSuccess => {
        if (onSuccess?.success) {
          navigateAndSimpleResetWithParam(
            ScreenNames.PartnerRegistrationSuccess,
            {
              params: {
                partnerId: onSuccess?.data?.partnerId,
              },
            },
          );
        }
      },
      onFail => {},
    );
  };

  onSelectBank = (item, index) => {
    this.handleInputChange('bankName', item?.bank);
    this.handleInputChange('ifscCode', '');
    this.handleInputChange('branchName', '');
  };

  validateAllFields = (
    fieldsToValidate = [
      'accountNumber',
      'accountHolderName',
      'bankName',
      'ifscCode',
      'branchName',
    ],
  ) => {
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

  handleInputChange = (key, value) => {
    handleFieldChange(this, key, value);
  };

  searchBankNameFromAPI = async query => {
    let searchResult = [];
    await this.props.searchBanksThunk(
      query,
      onSuccess => {
        searchResult = onSuccess;
      },
      error => {
        return [];
      },
    );
    return searchResult;
  };

  verifyBankDetailsByIFSC = () => {
    const {bankName, ifscCode} = this.state;
    const isFormValid = this.validateAllFields(['ifscCode', 'bankName']);
    if (!isFormValid) {
      showToast(
        'error',
        'Please enter valid IFSC Code or Bank Name...',
        'bottom',
        3500,
      );
      return;
    }

    this.setState({loading: true});
    this.props.verifyBankByIFSCThunk(
      bankName,
      ifscCode,
      response => {
        this.setState({loading: false});
        if (!response.isValid) {
          showToast('error', response.message, 'bottom', 3500);
          this.handleInputChange('branchName', '');
          return;
        }
        this.handleInputChange('branchName', response?.data?.branch);
      },
      error => {
        this.setState({loading: false});
      },
    );
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
      loading,
    } = this.state;
    const {isLoading, selectedPartner} = this.props;

    return (
      <>
        <Partner_Bank_Detail_Component
          transferModes={settlementPreferenceOptions}
          bankName={bankName}
          selectedTransferMode={selectedTransferMode}
          onTransferModeSelect={this.onTransferModeSelect}
          handleSubmitPress={this.handleSubmitPress}
          onAccountNumberChange={value =>
            this.handleInputChange('accountNumber', value)
          }
          onAccountHolderNameChange={value =>
            this.handleInputChange('accountHolderName', value)
          }
          onBankNamePress={value => this.handleInputChange('bankName', value)}
          onIFSCCodeChange={value => {
            this.handleInputChange('ifscCode', value.toUpperCase());
            this.handleInputChange('branchName', '');
          }}
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
              rightLabel: 'VERIFY',
              rightLabelColor: theme.colors.primary,
              rightLabelPress: this.verifyBankDetailsByIFSC,
            },
            bankName: {
              value: bankName,
              isError: errors.bankName,
              statusMsg: errors.bankName,
            },
            branchName: {
              value: branchName,
              isDisabled: true,
              isError: errors.branchName,
              statusMsg: errors.branchName,
              restProps: {
                multiline: true,
              },
            },
          }}
          showImages={this.state.showImages}
          errorSteps={this.state.errorSteps}
          searchBankNameFromAPI={this.searchBankNameFromAPI}
          isNewPartner={
            !selectedPartner || Object.keys(selectedPartner).length === 0
          }
        />
        {isLoading || (loading && <Loader visible={isLoading || loading} />)}
      </>
    );
  }
}

const mapDispatchToProps = {
  setBankingDetails,
  createPartnerThunk,
  updatePartnerThunk,
  searchBanksThunk,
  verifyBankByIFSCThunk,
};
const mapStateToProps = ({appState, partnerForm, partners, banks}) => {
  return {
    isInternetConnected: appState.isInternetConnected,
    isLoading: partners.loading,
    success: partners.success,
    documentDetails: partnerForm.documentDetails,
    bankingDetails: partnerForm.bankingDetails,
    basicDetails: partnerForm.basicDetails,
    partnerForm: partnerForm,
    selectedPartner: partners?.selectedPartner,
    bankSuggestion: banks?.bankSuggestions,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnersBankDetail);
