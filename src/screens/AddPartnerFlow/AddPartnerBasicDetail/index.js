import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  businessTypeOptions,
  businessTypeValue,
  getLabelFromEnum,
} from '../../../constants/enums';
import ScreenNames from '../../../constants/ScreenNames';
import {getScreenParam, navigate} from '../../../navigation/NavigationUtils';
import {setBasicDetails} from '../../../redux/actions';
import {
  handleFieldChange,
  handleStepNavigation,
  showToast,
  validateField,
} from '../../../utils/helper';
import Partner_Basic_Form_Component from './Partner_Basic_Form_Component';
class AddPartnerBasicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      businessType: '',
      businessTypeValue: '',
      yearsInBusiness: '',
      monthlyCarSales: '',
      ownerName: '',
      mobileNumber: '',
      emailAddress: '',
      errors: {
        businessName: '',
        yearsInBusiness: '',
        monthlyCarSales: '',
        ownerName: '',
        emailAddress: '',
        mobileNumber: '',
        businessType: '',
      },
      isFormValid: false,
      fromScreen: false,
      showImages: [],
      errorSteps: [],
    };
  }

  componentDidMount() {
    const {basicDetail, route} = this.props;
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
      businessName: get(basicDetail, 'businessName', ''),
      businessType: get(basicDetail, 'businessType', ''),
      yearsInBusiness: get(basicDetail, 'yearInBusiness', ''),
      monthlyCarSales: get(basicDetail, 'monthlyCarSale', ''),
      ownerName: get(basicDetail, 'ownerName', ''),
      mobileNumber: get(basicDetail, 'ownerMobileNumber', ''),
      emailAddress: get(basicDetail, 'ownerEmail', ''),
    });
  }

  onSelectBusinessType = item => {
    this.setState(
      {
        businessType: item.value,
        businessTypeValue: item.value,
      },
      () => {
        this.onChangeField('businessType', this.state.businessType);
      },
    );
  };

  handleNextPress = () => {
    const {
      businessName,
      yearsInBusiness,
      monthlyCarSales,
      ownerName,
      mobileNumber,
      emailAddress,
      businessType,
    } = this.state;
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    this.props.setBasicDetails({
      businessName,
      businessType: businessType,
      yearInBusiness: yearsInBusiness,
      monthlyCarSale: monthlyCarSales,
      ownerName,
      ownerMobileNumber: mobileNumber,
      ownerEmail: emailAddress,
    });

    navigate(ScreenNames.AddPartnerBusinessLocation, {
      params: {
        fromScreen: this.state.fromScreen,
        showImages: this.state.showImages,
        errorSteps: this.state.errorSteps,
      },
    });
  };

  validateAllFields = () => {
    const fieldsToValidate = [
      'businessName',
      'businessType',
      'yearsInBusiness',
      'monthlyCarSales',
      'ownerName',
      'mobileNumber',
      'emailAddress',
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

  onStepPress = stepId => {
    const {fromScreen, showImages, errorSteps} = this.state;
    handleStepNavigation(stepId, {fromScreen, showImages, errorSteps});
  };

  render() {
    const {
      businessName,
      businessType,
      yearsInBusiness,
      monthlyCarSales,
      ownerName,
      mobileNumber,
      emailAddress,
      errors,
      showImages,
      errorSteps,
    } = this.state;

    const {selectedPartner} = this.props;

    return (
      <>
        <Partner_Basic_Form_Component
          onSelectBusinessType={this.onSelectBusinessType}
          dropdownOptions={businessTypeOptions}
          businessType={getLabelFromEnum(businessTypeValue, businessType)}
          handleNextPress={this.handleNextPress}
          onChangeBusinessName={value =>
            this.onChangeField('businessName', value)
          }
          onChangeYearsInBusiness={value =>
            this.onChangeField('yearsInBusiness', value)
          }
          onChangeMonthlyCarSales={value =>
            this.onChangeField('monthlyCarSales', value)
          }
          onChangeOwnerName={value => this.onChangeField('ownerName', value)}
          onChangeMobileNumber={value =>
            this.onChangeField('mobileNumber', value)
          }
          onChangeEmail={value => this.onChangeField('emailAddress', value)}
          restInputProps={{
            businessName: {
              value: businessName,
              isError: errors.businessName,
              statusMsg: errors.businessName,
              autoCapitalize: 'words',
            },
            businessType: {
              value: getLabelFromEnum(businessTypeValue, businessType),
              isError: errors.businessType,
              statusMsg: errors.businessType,
            },
            yearsInBusiness: {
              value: yearsInBusiness,
              isError: errors.yearsInBusiness,
              statusMsg: errors.yearsInBusiness,
            },
            monthlyCarSales: {
              value: monthlyCarSales,
              isError: errors.monthlyCarSales,
              statusMsg: errors.monthlyCarSales,
            },
            ownerName: {
              value: ownerName,
              isError: errors.ownerName,
              statusMsg: errors.ownerName,
              autoCapitalize: 'words',
            },
            mobileNumber: {
              value: mobileNumber,
              isError: errors.mobileNumber,
              statusMsg: errors.mobileNumber,
            },
            emailAddress: {
              value: emailAddress,
              isError: errors.emailAddress,
              statusMsg: errors.emailAddress,
            },
          }}
          showImages={showImages}
          errorSteps={errorSteps}
          isNewPartner={
            !selectedPartner || Object.keys(selectedPartner).length === 0
          }
          onStepPress={this.onStepPress}
        />
      </>
    );
  }
}

const mapDispatchToProps = {setBasicDetails};
const mapStateToProps = ({appState, partnerForm, partners}) => {
  return {
    isInternetConnected: appState.isInternetConnected,
    isLoading: appState.loading,
    basicDetail: partnerForm.basicDetails,
    selectedPartner: partners.selectedPartner,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnerBasicDetail);
