import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../../constants/ScreenNames';
import {getScreenParam, navigate} from '../../../navigation/NavigationUtils';
import {setBasicDetails} from '../../../redux/actions';
import Partner_Basic_Form_Component from './Partner_Basic_Form_Component';
import {handleFieldChange, validateField} from '../../../utils/helper';
import {get} from 'lodash';
import {
  businessTypeOption,
  businessTypeOptions,
  generateOptionsAndValueMap,
  salesExecutivePosition,
} from '../../../constants/enums';
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
      yearsInBusiness: get(basicDetail, 'yearsInBusiness', ''),
      monthlyCarSales: get(basicDetail, 'monthlyCarSales', ''),
      ownerName: get(basicDetail, 'ownerName', ''),
      mobileNumber: get(basicDetail, 'mobileNumber', ''),
      emailAddress: get(basicDetail, 'emailAddress', ''),
    });
  }

  onSelectBusinessType = item => {
    this.setState(
      {
        businessType: item.label,
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
      businessType,
      yearsInBusiness,
      monthlyCarSales,
      ownerName,
      mobileNumber,
      emailAddress,
    } = this.state;
    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      console.log('Form is invalid. Please correct the fields.');
      return;
    }

    this.props.setBasicDetails({
      businessName,
      businessType,
      yearsInBusiness,
      monthlyCarSales,
      ownerName,
      mobileNumber,
      emailAddress,
    });

    navigate(ScreenNames.AddPartnerBusinessLocation);
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

    return (
      <>
        <Partner_Basic_Form_Component
          onSelectBusinessType={this.onSelectBusinessType}
          dropdownOptions={businessTypeOptions}
          businessType={businessType}
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
              value: businessType,
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
        />
      </>
    );
  }
}

const mapDispatchToProps = {setBasicDetails};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    isLoading: state.appState.loading,
    basicDetail: state.partnerForm.basicDetails,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnerBasicDetail);
