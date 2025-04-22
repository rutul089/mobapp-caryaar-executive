import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Applications_Component from './Applications_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

export default class ApplicationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [
        {
          id: '1',
          name: 'Automax Motors',
          phone: '15 Jan 2025',
          status: 'Pending',
          type: 1,
        },
        {
          id: '2',
          name: 'Prestige Motors',
          status: 'Approved',
          type: 2,
        },
        {
          id: '3',
          name: 'Carville Motors',
          phone: '10 Jan 2025',
          status: 'Rejected',
          type: 3,
        },
      ],
    };
    this.onItemPress = this.onItemPress.bind(this);
    this.onTrackApplicationPress = this.onTrackApplicationPress.bind(this);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
  }

  onItemPress = item => {
    navigate(ScreenNames.ApplicationDetail, {params: item});
  };

  onTrackApplicationPress = item => {
    navigate(ScreenNames.TrackApplication);
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onPressPrimaryButton = selectedFilters => {
    console.log({selectedFilters});
  };

  render() {
    return (
      <>
        <Applications_Component
          applications={this.state.applications}
          onItemPress={this.onItemPress}
          onTrackApplicationPress={this.onTrackApplicationPress}
          onRightIconPress={this.onRightIconPress}
          onPressPrimaryButton={this.onPressPrimaryButton}
        />
      </>
    );
  }
}
