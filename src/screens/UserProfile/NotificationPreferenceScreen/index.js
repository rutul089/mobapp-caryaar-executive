import React, {Component} from 'react';
import {goBack} from '../../../navigation/NavigationUtils';
import Notification_Preference_Component from './Notification_Preference_Component';

export default class NotificationPreferenceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueLoanStatusUpdate: true,
      valuePartnerOnboardingStatus: false,
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onLoanStatusUpdateChange = this.onLoanStatusUpdateChange.bind(this);
    this.onPartnerOnboardingStatusChange =
      this.onPartnerOnboardingStatusChange.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  onLoanStatusUpdateChange = value => {
    this.setState({
      valueLoanStatusUpdate: value,
    });
  };

  onPartnerOnboardingStatusChange = value => {
    this.setState({
      valuePartnerOnboardingStatus: value,
    });
  };

  render() {
    return (
      <>
        <Notification_Preference_Component
          onBackPress={this.onBackPress}
          onLoanStatusUpdateChange={this.onLoanStatusUpdateChange}
          valueLoanStatusUpdate={this.state.valueLoanStatusUpdate}
          onPartnerOnboardingStatusChange={this.onPartnerOnboardingStatusChange}
          valuePartnerOnboardingStatus={this.state.valuePartnerOnboardingStatus}
        />
      </>
    );
  }
}
