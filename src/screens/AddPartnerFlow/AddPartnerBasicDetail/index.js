import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../../constants/ScreenNames';
import {navigate} from '../../../navigation/NavigationUtils';
import {setBasicDetails} from '../../../redux/actions';
import Partner_Basic_Form_Component from './Partner_Basic_Form_Component';
import {handleFieldChange, validateField} from '../../../utils/helper';

class AddPartnerBasicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      businessType: '',
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
    };
  }

  onSelectBusinessType = item => {
    this.setState(
      {
        businessType: item.label,
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
    } = this.state;
    return (
      <>
        <Partner_Basic_Form_Component
          onSelectBusinessType={this.onSelectBusinessType}
          dropdownOptions={[
            {label: 'Corporate', value: 'a'},
            {label: 'Salaried', value: 'b'},
            {label: 'Self-Employed', value: 'c'},
            {label: 'Business Owner', value: 'c'},
            {label: 'Freelancer', value: 'c'},
            {label: 'Consultant', value: 'c'},
            {label: 'Retired', value: 'c'},
            {label: 'Unemployed', value: 'c'},
          ]}
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnerBasicDetail);
