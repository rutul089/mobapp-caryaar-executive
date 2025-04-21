import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../../constants/ScreenNames';
import {navigate} from '../../../navigation/NavigationUtils';
import {setBasicDetails} from '../../../redux/actions';
import Partner_Basic_Form_Component from './Partner_Basic_Form_Component';

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
      isFormValid: false, // This state will track if the form is valid
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
      isFormValid,
    } = this.state;

    if (businessType === '') {
      return this.onChangeField('businessType', businessType);
    }

    if (!isFormValid) {
      const message = 'Please fill all required fields correctly.';
      console.log({message});
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

  validateField = (key, value) => {
    const trimmedValue = value.trim();

    switch (key) {
      case 'businessName':
        return trimmedValue === '' ? 'Please enter a valid business name' : '';

      case 'yearsInBusiness':
        return trimmedValue === ''
          ? 'Please enter number of years in business'
          : !/^[0-9]+(\.[0-9]+)?$/.test(trimmedValue)
          ? 'Years in business must be a valid number (not starting with a decimal)'
          : '';

      case 'monthlyCarSales':
        return trimmedValue === ''
          ? 'Please enter monthly car sales'
          : !/^[0-9]+(\.[0-9]+)?$/.test(trimmedValue)
          ? 'Monthly car sales must be a valid number (not starting with a decimal)'
          : '';

      case 'ownerName':
        return trimmedValue === '' ? 'Please enter a valid owner name' : '';
      case 'businessType':
        return trimmedValue === '' ? 'Please select valid business type' : '';

      case 'emailAddress':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return trimmedValue === ''
          ? 'Please enter an email address'
          : !emailRegex.test(trimmedValue)
          ? 'Please enter a valid email address'
          : '';

      case 'mobileNumber':
        const mobileNumberRegex = /^[0-9]{10}$/;
        return trimmedValue === ''
          ? 'Please enter a mobile number'
          : !mobileNumberRegex.test(trimmedValue)
          ? 'Mobile number must be a 10-digit number'
          : '';

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
