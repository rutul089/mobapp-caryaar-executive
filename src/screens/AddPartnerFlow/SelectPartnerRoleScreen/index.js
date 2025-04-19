import React, {Component} from 'react';
import {connect} from 'react-redux';
import {partnerRole} from '../../../constants/enums';
import ScreenNames from '../../../constants/ScreenNames';
import {goBack, navigate} from '../../../navigation/NavigationUtils';
import Select_Partner_Role_Component from './Select_Partner_Role_Component';
import {setPartnerRole} from '../../../redux/actions';

class SelectPartnerRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: partnerRole.dealerPrinciple,
    };
  }

  onRoleSelect = value => {
    this.setState({
      selectedRole: value,
    });
  };

  onBackPress = () => {
    goBack();
  };

  handleNextPress = () => {
    const {selectedRole} = this.state;
    this.props.setPartnerRole(selectedRole);
    navigate(ScreenNames.AddPartnerBasicDetail);
  };

  render() {
    const {selectedRole} = this.state;
    return (
      <>
        <Select_Partner_Role_Component
          onRoleSelect={this.onRoleSelect}
          selectedRole={selectedRole}
          onBackPress={this.onBackPress}
          handleNextPress={this.handleNextPress}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  setPartnerRole,
};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectPartnerRole);
