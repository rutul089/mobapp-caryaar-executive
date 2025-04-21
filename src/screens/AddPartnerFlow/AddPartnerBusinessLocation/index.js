import React, {Component} from 'react';
import {goBack, navigate} from '../../../navigation/NavigationUtils';
import Partner_Location_Form_Component from './Partner_Location_Form_Component';
import ScreenNames from '../../../constants/ScreenNames';
import {connect} from 'react-redux';
import {setLocationDetails} from '../../../redux/actions';

class AddPartnerBusinessLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      shopNo: '',
      buildingName: '',
      street: '',
      area: '',
      stateName: '',
      pincode: '',
      cityName: '',
      errors: {
        companyName: '',
        shopNo: '',
        buildingName: '',
        street: '',
        area: '',
        pincode: '',
        stateName: '',
      },
      isFormValid: '', // This state will track if the form is valid
    };
  }

  onBackPress = () => {
    goBack();
  };

  // Validation functions for each field
  validateField = (key, value) => {
    switch (key) {
      case 'companyName':
        return value.trim() === '' ? 'Please enter a valid company name' : '';
      case 'shopNo':
        return value.trim() === ''
          ? 'Please enter a valid shop/office number'
          : '';
      case 'buildingName':
        return value.trim() === '' ? 'Please enter a valid building name' : '';
      case 'street':
        return value.trim() === '' ? 'Please enter a valid street' : '';
      case 'area':
        return value.trim() === '' ? 'Please enter a valid area' : '';
      case 'stateName':
        return value.trim() === '' ? 'Please select a valid State Name' : '';
      case 'pincode':
        const pincodeRegex = /^[0-9]{6}$/; // Only 6 digit numbers
        return pincodeRegex.test(value.trim())
          ? ''
          : 'Pincode must be a 6-digit number';
      default:
        return '';
    }
  };

  // Update field and validate
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

  handleNextPress = () => {
    const {
      companyName,
      shopNo,
      buildingName,
      street,
      area,
      stateName,
      pincode,
      isFormValid,
    } = this.state;

    if (stateName === '') {
      return this.onChangeField('stateName', stateName);
    }

    if (!isFormValid) {
      const message = 'Please fill all required fields correctly.';
      return;
    }

    this.props.setLocationDetails({
      companyName,
      shopNo,
      buildingName,
      street,
      area,
      stateName,
      pincode,
    });

    navigate(ScreenNames.AddPartnerRequiredDocument);
  };

  onGoogleMapPress = () => {
    // handle map press
  };

  onSelectState = (item, index) => {
    this.setState(
      {
        stateName: item?.label,
      },
      () => {
        this.onChangeField('stateName', this.state.stateName);
      },
    );
  };

  render() {
    const {
      companyName,
      shopNo,
      buildingName,
      street,
      area,
      stateName,
      pincode,
      errors,
      isFormValid,
    } = this.state;

    return (
      <>
        <Partner_Location_Form_Component
          onBackPress={this.onBackPress}
          handleNextPress={this.handleNextPress}
          onChangeCompanyName={value =>
            this.onChangeField('companyName', value)
          }
          onChangeShopNo={value => this.onChangeField('shopNo', value)}
          onChangeBuildingName={value =>
            this.onChangeField('buildingName', value)
          }
          onChangeStreet={value => this.onChangeField('street', value)}
          onChangeArea={value => this.onChangeField('area', value)}
          onChangePincode={value => this.onChangeField('pincode', value)}
          onGoogleMapPress={this.onGoogleMapPress}
          restInputProps={{
            companyName: {
              value: companyName,
              isError: errors.companyName,
              statusMsg: errors.companyName,
            },
            shopOfficeNumber: {
              value: shopNo,
              isError: errors.shopNo,
              statusMsg: errors.shopNo,
            },
            buildingName: {
              value: buildingName,
              isError: errors.buildingName,
              statusMsg: errors.buildingName,
            },
            street: {
              value: street,
              isError: errors.street,
              statusMsg: errors.street,
            },
            area: {
              value: area,
              isError: errors.area,
              statusMsg: errors.area,
            },
            state: {
              value: stateName,
              isError: errors.stateName,
              statusMsg: errors.stateName,
            },
            pincode: {
              value: pincode,
              isError: errors.pincode,
              statusMsg: errors.pincode,
              rightLabel: 'City Name',
              rightLabelPress: () => {},
              keyboardType: 'numeric',
            },
          }}
          nextButtonDisabled={!isFormValid} // Disable the button if form is not valid
          onSelectState={this.onSelectState}
          stateName={stateName}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  setLocationDetails,
};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    isLoading: state.appState.loading,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnerBusinessLocation);
