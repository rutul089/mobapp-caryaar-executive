import React, {Component} from 'react';

import Manage_Members_Component from './Manage_Members_Component';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  createSalesExecutiveThunk,
  deleteSalesExecutiveByIdThunk,
  fetchSalesExecutivesThunk,
  removeSalesExecutive,
} from '../../../redux/actions';
import {salesExecOptions} from '../../../constants/enums';
import {Loader} from '../../../components';
import {
  formatIndianNumber,
  formatMobileNumber,
  getErrorMessage,
  handleFieldChange,
  validateField,
} from '../../../utils/helper';

class ManageMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      fullName: '',
      mobileNumber: '',
      selectedSalesExec: '',
      selectedSalesExecValue: '',
      email: '',
      isLoading: true,
      errors: {
        fullName: '',
        mobileNumber: '',
        selectedSalesExecValue: '',
        email: '',
      },
      isFormValid: false,
    };
    this.handleDeleteMemberPress = this.handleDeleteMemberPress.bind(this);
    this.handleAddNewMemberPress = this.handleAddNewMemberPress.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
  }

  componentDidMount() {
    this.fetchSalesExecutives();
  }

  fetchSalesExecutives = (page = this.props.page, limit = this.props.limit) => {
    this.props.fetchSalesExecutivesThunk(
      page,
      limit,
      () => {},
      () => {},
    );
  };

  handleDeleteMemberPress = (item, index) => {
    Alert.alert(
      'Delete Member',
      `Are you sure you want to delete ${item.fullName || 'this member'}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // Makes the button bold
        },
        {
          text: 'OK',
          onPress: () => this.deleteMember(item, index),
        },
      ],
      {cancelable: true},
    );
  };

  deleteMember = (item, index) => {
    this.props.deleteSalesExecutiveByIdThunk(item?.id);
  };

  handleAddNewMemberPress = () => {
    this.setState({
      isVisible: true,
    });
  };

  onModalHide = () => {
    this.setState({
      isVisible: false,
      fullName: '',
      mobileNumber: '',
      selectedSalesExec: '',
      selectedSalesExecValue: '',
      email: '',
    });
  };

  onPressPrimaryButton = () => {
    const {mobileNumber, fullName, selectedSalesExecValue, email} = this.state;
    const isFormValid = this.validateAllFields();

    if (isFormValid && !this.props.loading) {
      let param = {
        name: fullName,
        mobileNumber: formatMobileNumber(mobileNumber),
        email: email,
        position: selectedSalesExecValue,
      };
      this.props.createSalesExecutiveThunk(
        param,
        response => {
          if (response.success) {
            this.onModalHide();
          }
        },
        error => {
          Alert.alert(getErrorMessage(error));
        },
      );
    }
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
    this.setState(
      {
        selectedSalesExec: item,
      },
      () => {
        this.onChangeField('selectedSalesExecValue', item?.value);
      },
    );
  };

  handleLoadMore = () => {
    const {page, totalPages, limit, loading} = this.props;
    setTimeout(() => {
      if (!loading && page < totalPages) {
        this.setState({
          isLoading: false,
        });
        this.fetchSalesExecutives(page + 1, limit);
      }
    }, 100); // small delay to wait for loading flag
  };

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  validateAllFields = () => {
    const fieldsToValidate = [
      'fullName',
      'mobileNumber',
      'selectedSalesExecValue',
      'email',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  render() {
    const {
      mobileNumber,
      fullName,
      selectedSalesExec,
      isLoading,
      errors,
      email,
    } = this.state;
    const {salesExecutives, loading} = this.props;
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
          onChangeFullName={value => this.onChangeField('fullName', value)}
          onChangeMobileNumber={value =>
            this.onChangeField('mobileNumber', value)
          }
          onChangeEmail={value => this.onChangeField('email', value)}
          setSelectedSalesExec={this.setSelectedSalesExec}
          selectedSalesExec={selectedSalesExec?.label}
          salesExecOptions={salesExecOptions}
          salesExecutives={salesExecutives}
          handleLoadMore={this.handleLoadMore}
          isLoading={isLoading && loading}
          restInputProps={{
            fullName: {
              value: fullName,
              isError: errors.fullName,
              statusMsg: errors.fullName,
              autoCapitalize: 'words',
            },
            mobileNumber: {
              value: mobileNumber,
              isError: errors.mobileNumber,
              statusMsg: errors.mobileNumber,
            },
            selectedSalesExec: {
              isError: errors.selectedSalesExecValue,
              statusMsg: errors.selectedSalesExecValue,
            },
            email: {
              value: email,
              isError: errors.email,
              statusMsg: errors.email,
            },
          }}
        />
        {isLoading && loading && <Loader visible={isLoading && loading} />}
      </>
    );
  }
}

const mapDispatchToProps = {
  fetchSalesExecutivesThunk,
  deleteSalesExecutiveByIdThunk,
  removeSalesExecutive,
  createSalesExecutiveThunk,
};
const mapStateToProps = ({appState, salesExecutives}) => {
  return {
    isInternetConnected: appState.isInternetConnected,
    isLoading: appState.loading,
    salesExecutives: salesExecutives.salesExecutives,
    page: salesExecutives.page,
    limit: salesExecutives.limit,
    total: salesExecutives.total,
    totalPages: salesExecutives.totalPages,
    loading: salesExecutives.loading,
    success: salesExecutives.success,
    message: salesExecutives.message,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageMemberScreen);
