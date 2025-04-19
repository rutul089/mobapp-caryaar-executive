import React, {Component, use} from 'react';
import {connect} from 'react-redux';
import {Loader} from '../../components';
import ScreenNames from '../../constants/ScreenNames';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import {fetchUser, resetAppState, setLoginStatus} from '../../redux/actions';
import {clearLoginStatus} from '../../utils/storage';
import Profile_Component from './Profile_Component';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
    };
    this.handleMenuPress = this.handleMenuPress.bind(this);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onEditProfilePress = this.onEditProfilePress.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
  }

  async componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    return;
    this.props.fetchUser(
      5,
      user => {
        console.log('User Data', JSON.stringify(user));
      },
      error => {
        console.log('error', JSON.stringify(error));
      },
    );
  };

  handleMenuPress = (index, item) => {
    if (item.screenName === ScreenNames.Logout) {
      return this.handleLogout();
    }
    navigate(item.screenName);
  };

  handleLogout = () => {
    this.toggleLogoutModal(true);
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onEditProfilePress = () => {
    navigate(ScreenNames.EditProfile);
  };

  toggleLogoutModal = visible => {
    this.setState({showLogoutModal: visible});
  };

  onPressPrimaryButton = async () => {
    this.toggleLogoutModal(false);
    await clearLoginStatus();
    this.props.resetAppState();
    this.props.setLoginStatus(false);
    navigateAndSimpleReset(ScreenNames.Login);
  };

  onModalHide = () => {
    this.toggleLogoutModal(false);
  };

  render() {
    const {showLogoutModal} = this.state;
    const {userDetail, user} = this.props;
    console.log(JSON.stringify(user));

    return (
      <>
        <Profile_Component
          handleMenuPress={this.handleMenuPress}
          onRightIconPress={this.onRightIconPress}
          onEditProfilePress={this.onEditProfilePress}
          showLogoutModal={showLogoutModal}
          onPressPrimaryButton={this.onPressPrimaryButton}
          onModalHide={this.onModalHide}
          address={userDetail?.address}
          name={user?.name}
          email={user?.email}
          phone={user?.phone}
          userID={user?.company?.name}
        />
        {this.props.loading && <Loader visible={this.props.loading} />}
      </>
    );
  }
}

const mapDispatchToProps = {
  setLoginStatus,
  resetAppState,
  fetchUser,
};
const mapStateToProps = state => {
  return {
    userDetail: state.user?.userDetails,
    loading: state.user.loading,
    user: state.user.userProfile,
    error: state.user.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
