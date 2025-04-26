import React, {Component} from 'react';

import Manage_Members_Component from './Manage_Members_Component';
import {Alert} from 'react-native';

class ManageMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: [
        {
          id: '1',
          name: 'Aarav Mehta',
          phone: '98765 43210',
          avatar: 'https://i.pravatar.cc/150?img=11',
        },
        {
          id: '2',
          name: 'Kavya Sharma',
          phone: '91234 56789',
          avatar: 'https://i.pravatar.cc/150?img=12',
        },
        {
          id: '3',
          name: 'Rohan Desai',
          phone: '99887 66554',
          avatar: 'https://i.pravatar.cc/150?img=13',
        },
        {
          id: '4',
          name: 'Ishita Verma',
          phone: '90123 45678',
          avatar: 'https://i.pravatar.cc/150?img=14',
        },
        {
          id: '5',
          name: 'Devansh Kapoor',
          phone: '98701 11223',
          avatar: 'https://i.pravatar.cc/150?img=15',
        },
      ],
      isVisible: false,
      fullName: '',
      mobileNumber: '',
      selectedSalesExec: '',
      salesExecOptions: [
        {id: '1', label: 'Junior Sales Executive', value: 'junior'},
        {id: '2', label: 'Senior Sales Executive', value: 'senior'},
        {id: '3', label: 'Regional Sales Manager', value: 'regional_manager'},
        {id: '4', label: 'National Sales Director', value: 'national_director'},
        {id: '5', label: 'International Sales Head', value: 'intl_head'},
      ],
    };
    this.handleDeleteMemberPress = this.handleDeleteMemberPress.bind(this);
    this.handleAddNewMemberPress = this.handleAddNewMemberPress.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
  }

  componentDidMount() {}

  handleDeleteMemberPress = (item, index) => {
    Alert.alert(JSON.stringify(item));
  };

  handleAddNewMemberPress = () => {
    this.setState({
      isVisible: true,
    });
  };

  onModalHide = () => {
    this.setState({
      isVisible: false,
    });
  };

  onPressPrimaryButton = () => {
    const {mobileNumber, fullName} = this.state;

    Alert.alert(mobileNumber + ' ' + fullName);
  };

  onChangeFullName = value => {
    this.setState({
      fullName: value,
    });
  };

  onChangeMobileNumber = value => {
    this.setState({
      mobileNumber: value,
    });
  };

  setSelectedSalesExec = item => {
    this.setState({
      selectedSalesExec: item?.label,
    });
  };

  render() {
    const {mobileNumber, fullName, selectedSalesExec, salesExecOptions} =
      this.state;
    return (
      <>
        <Manage_Members_Component
          handleDeleteMemberPress={this.handleDeleteMemberPress}
          handleAddNewMemberPress={this.handleAddNewMemberPress}
          memberList={this.state.memberList}
          isVisible={this.state.isVisible}
          onModalHide={this.onModalHide}
          onPressPrimaryButton={this.onPressPrimaryButton}
          mobileNumber={mobileNumber}
          fullName={fullName}
          onChangeFullName={this.onChangeFullName}
          onChangeMobileNumber={this.onChangeMobileNumber}
          setSelectedSalesExec={this.setSelectedSalesExec}
          selectedSalesExec={selectedSalesExec}
          salesExecOptions={salesExecOptions}
        />
      </>
    );
  }
}

export default ManageMemberScreen;
