import React, {Component} from 'react';
import Dealership_Type_Selection_Component from './Dealership_Type_Selection_Component.js';
import {DealershipType} from '../../../constants/enums.js';
import {navigate} from '../../../navigation/NavigationUtils.js';
import ScreenNames from '../../../constants/ScreenNames.js';
import {connect} from 'react-redux';
import {setDealershipType} from '../../../redux/actions';

class DealershipTypeSelectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDealershipType: DealershipType.MULTI_BRAND,
    };
    this.handleNextPress = this.handleNextPress.bind(this);
  }

  onDealerShipType = value => {
    this.setState({
      selectedDealershipType: value,
    });
  };

  handleNextPress = () => {
    this.props.setDealershipType(this.state.selectedDealershipType);
    navigate(ScreenNames.UserAndCarTypeSelection);
  };

  render() {
    const {dealershipType} = this.props;
    return (
      <>
        <Dealership_Type_Selection_Component
          selectedDealershipType={this.state.selectedDealershipType}
          onDealerShipType={this.onDealerShipType}
          handleNextPress={this.handleNextPress}
          dealershipType={dealershipType}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  setDealershipType,
};
const mapStateToProps = state => {
  return {
    dealershipType: state.partnerForm.dealershipType,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DealershipTypeSelectionScreen);
