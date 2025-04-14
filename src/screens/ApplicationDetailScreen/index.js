import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Application_Detail_Component from './Application_Detail_Component';
import {getScreenParam, goBack} from '../../navigation/NavigationUtils';
import {formatIndianNumber} from '../../utils/helper';

export default class ApplicationDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationDetail: {},
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let applicationDetail = getScreenParam(route, 'params');
    this.setState(
      {
        applicationDetail,
      },
      () => {
        console.log({applicationDetail: this.state.applicationDetail});
      },
    );
  }

  onBackPress = () => {
    goBack();
  };

  render() {
    return (
      <>
        <Application_Detail_Component
          onBackPress={this.onBackPress}
          applicationDetail={this.state.applicationDetail}
          vehicleDetail={[
            {label: 'Make', value: 'Honda'},
            {label: 'Model', value: 'City | Elegant Edition'},
            {label: 'Registration', value: 'MH 02 AB 1234'},
            {label: 'Price', value: formatIndianNumber(900000)},
            {label: 'Loan Amount', value: formatIndianNumber(800000)},
          ]}
          customerDetail={[
            {label: 'Name', value: 'Rahul Sharma'},
            {label: 'Phone', value: '90874 84013'},
            {label: 'Location', value: 'Mumbai'},
            {label: 'Type', value: 'Salaried'},
          ]}
          loanDetail={[
            {label: 'Amount', value: formatIndianNumber(850000)},
            {label: 'Tenure', value: '60 Months'},
            {label: 'Interest Rate', value: '8.5%'},
            {label: 'EMI', value: formatIndianNumber(17500)},
          ]}
        />
      </>
    );
  }
}
