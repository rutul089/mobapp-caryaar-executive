import React, {Component} from 'react';
import {goBack, navigate} from '../../../navigation/NavigationUtils';
import Partner_Location_Form_Component from './Partner_Location_Form_Component';
import ScreenNames from '../../../constants/ScreenNames';
import {connect} from 'react-redux';
import {setLocationDetails} from '../../../redux/actions';
import {handleFieldChange, validateField} from '../../../utils/helper';

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
      isFormValid: false,
    };
  }

  onBackPress = () => {
    goBack();
  };

  validateAllFields = () => {
    const fieldsToValidate = [
      'companyName',
      'shopNo',
      'buildingName',
      'street',
      'area',
      'stateName',
      'pincode',
      'cityName',
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

  handleNextPress = () => {
    const {
      companyName,
      shopNo,
      buildingName,
      street,
      area,
      stateName,
      pincode,
    } = this.state;

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      console.log('Form is invalid. Please correct the fields.');
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
