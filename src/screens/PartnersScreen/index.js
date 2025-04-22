import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Partner_Component from './Partner_Component';
import {connect} from 'react-redux';
import {resetRegistration} from '../../redux/actions';

class PartnersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TAB_OPTIONS: ['active', 'pending'],
      partnersData: [
        {
          id: '1',
          name: 'Automax Motors',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
        {
          id: '2',
          name: 'Prestige Motors',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
        {
          id: '3',
          name: 'Carville Motors',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
        {
          id: '4',
          name: 'Car Express',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
        {
          id: '3',
          name: 'Carville Motors',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
        {
          id: '4',
          name: 'Car Express',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
        {
          id: '3',
          name: 'Carville Motors',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
        {
          id: '4',
          name: 'Car Express',
          phone: '91448 82901',
          location: 'Mumbai, Maharashtra',
        },
      ],
    };
    this.onTabPress = this.onTabPress.bind(this);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
  }

  onTabPress = value => {
    console.log({value});
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onItemPress = item => {
    navigate(ScreenNames.PartnerDetail, {params: item});
  };

  callToAction = () => {
    navigate(ScreenNames.PartnerBasicDetails);
    return;
    navigate(ScreenNames.AddPartnerBasicDetail, {
      params: {fromScreen: true, errorSteps: [3], showImages: [1, 2, 3, 4]},
    });
  };

  onAddButtonPress = () => {
    this.props.resetRegistration();
    navigate(ScreenNames.DealershipTypeSelection);
  };

  render() {
    const {TAB_OPTIONS, partnersData} = this.state;

    return (
      <>
        <Partner_Component
          onTabPress={this.onTabPress}
          TAB_OPTIONS={TAB_OPTIONS}
          onRightIconPress={this.onRightIconPress}
          partnersData={partnersData}
          onItemPress={this.onItemPress}
          callToAction={this.callToAction}
          onAddButtonPress={this.onAddButtonPress}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  resetRegistration,
};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
