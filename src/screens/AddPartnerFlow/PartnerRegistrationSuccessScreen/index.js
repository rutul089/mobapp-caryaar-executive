import {get} from 'lodash';
import React, {Component} from 'react';
import ScreenNames from '../../../constants/ScreenNames';
import {
  getScreenParam,
  navigateAndSimpleReset,
  navigateToTab,
} from '../../../navigation/NavigationUtils';
import Partner_Success_Component from './Partner_Success_Component';

export default class PartnerRegistrationSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerId: '',
    };
  }

  componentDidMount() {
    const {route} = this.props;

    let navState = getScreenParam(route, 'params', null);
    let partnerId = get(navState, 'partnerId', '');

    this.setState({
      partnerId,
    });
  }

  onBackToHome = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  onViewPartners = () => {
    navigateToTab(ScreenNames.Partners);
  };

  render() {
    return (
      <>
        <Partner_Success_Component
          onBackToHome={this.onBackToHome}
          onViewPartners={this.onViewPartners}
          partnerId={this.state.partnerId}
        />
      </>
    );
  }
}
