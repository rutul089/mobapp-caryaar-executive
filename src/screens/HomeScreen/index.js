import React, {Component} from 'react';
import Home_Component from './Home_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onRightIconPress = this.onRightIconPress.bind(this);
  }

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  render() {
    return (
      <>
        <Home_Component onRightIconPress={this.onRightIconPress} />
      </>
    );
  }
}
