import React, {Component} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import Notification_Component from './Notification_Component';
import {goBack} from '../../navigation/NavigationUtils';
import {
  fetchNotificationsThunk,
  markAllNotificationsReadThunk,
} from '../../redux/actions';

class NotificationView extends Component {
  state = {
    refreshing: false,
  };

  componentDidMount() {
    this.fetchNotification();
  }

  fetchNotification = async () => {
    try {
      await this.props.fetchNotificationsThunk();
    } catch (error) {
      console.warn('Notification fetch error:', error);
    } finally {
      this.setState({refreshing: false});
    }
  };

  handleRefresh = () => {
    this.setState({refreshing: true}, this.fetchNotification);
  };

  onBackPress = () => {
    goBack();
  };

  // Method for mark all as read
  onPressRightContent = () => {
    const {notifications} = this.props;
    if (!notifications.length > 0) {
      return;
    }
    this.props.markAllNotificationsReadThunk();
  };

  render() {
    const {notifications, loading} = this.props;
    const {refreshing} = this.state;

    return (
      <Notification_Component
        dataList={notifications}
        onBackPress={this.onBackPress}
        onPressRightContent={this.onPressRightContent}
        loading={loading && !refreshing}
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

const mapStateToProps = ({notifications}) => ({
  notifications: notifications.notifications,
  loading: notifications.loading,
});

const mapDispatchToProps = {
  fetchNotificationsThunk,
  markAllNotificationsReadThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationView);
