import React, {Component} from 'react';
import Dealership_Type_Selection_Component from './Dealership_Type_Selection_Component.js';
import {DealershipType} from '../../../constants/enums.js';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDealershipType: DealershipType.MULTI_BRAND_DEALER,
    };
  }

  onDealerShipType = value => {
    this.setState({
      selectedDealershipType: value,
    });
  };

  render() {
    return (
      <>
        <Dealership_Type_Selection_Component
          selectedDealershipType={this.state.selectedDealershipType}
          onDealerShipType={this.onDealerShipType}
        />
      </>
    );
  }
}
