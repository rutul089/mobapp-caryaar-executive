import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Basic_Form_Component from './Partner_Basic_Form_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

export default class AddPartnerBasicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessType: '',
    };
  }

  onSelectBusinessType = value => {
    this.setState({
      businessType: value.label,
    });
    console.log({value});
  };

  handleNextPress = () => {
    navigate(ScreenNames.AddPartnerBusinessLocation);
  };

  render() {
    const {businessType} = this.state;
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
        />
      </>
    );
  }
}
