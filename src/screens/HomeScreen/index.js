import React, {Component} from 'react';
import Home_Component from './Home_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {connect} from 'react-redux';
import {resetRegistration} from '../../redux/actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onRightIconPress = this.onRightIconPress.bind(this);
  }

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onAddPartner = () => {
    this.props.resetRegistration();
    navigate(ScreenNames.DealershipTypeSelection);
  };

  render() {
    return (
      <>
        <Home_Component
          onRightIconPress={this.onRightIconPress}
          onAddPartner={this.onAddPartner}
        />
      </>
    );
  }
}

const mapDispatchToProps = {resetRegistration};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
