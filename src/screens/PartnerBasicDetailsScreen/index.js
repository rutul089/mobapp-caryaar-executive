import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import Partner_Basic_Details_Component from './Partner_Basic_Details_Component';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {handleFieldChange} from '../../utils/helper';

class PartnerBasicDetailsScreen extends Component {
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
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    const {basicDetail} = this.props;
    this.setState({
      businessName: get(basicDetail, 'businessName', ''),
      businessType: get(basicDetail, 'businessType', ''),
      yearsInBusiness: get(basicDetail, 'yearsInBusiness', ''),
      monthlyCarSales: get(basicDetail, 'monthlyCarSales', ''),
      ownerName: get(basicDetail, 'ownerName', ''),
      mobileNumber: get(basicDetail, 'mobileNumber', ''),
      emailAddress: get(basicDetail, 'emailAddress', ''),
    });
  }

  onBackPress = () => {
    goBack();
  };

  onSelectBusinessType = (item, index) => {
    this.setState({
      businessType: item?.label,
    });
  };

  handleNextPress = () => {
    navigate(ScreenNames.BusinessLocation);
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
        <Partner_Basic_Details_Component
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
        />
      </>
    );
  }
}

const mapDispatchToProps = {};
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
)(PartnerBasicDetailsScreen);
