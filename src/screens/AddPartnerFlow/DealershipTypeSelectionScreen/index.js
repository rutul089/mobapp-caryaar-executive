import React, {Component} from 'react';
import Dealership_Type_Selection_Component from './Dealership_Type_Selection_Component.js';
import {DealershipType} from '../../../constants/enums.js';
import {navigate} from '../../../navigation/NavigationUtils.js';
import ScreenNames from '../../../constants/ScreenNames.js';
export default class DealershipTypeSelectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDealershipType: DealershipType.MULTI_BRAND_DEALER,
    };
    this.handleNextPress = this.handleNextPress.bind(this);
  }

  onDealerShipType = value => {
    this.setState({
      selectedDealershipType: value,
    });
  };

  handleNextPress = () => {
    navigate(ScreenNames.UserAndCarTypeSelection);
  };

  render() {
    return (
      <>
        <Dealership_Type_Selection_Component
          selectedDealershipType={this.state.selectedDealershipType}
          onDealerShipType={this.onDealerShipType}
          handleNextPress={this.handleNextPress}
        />
      </>
    );
  }
}
