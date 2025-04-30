import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Partner_Component from './Partner_Component';
import {connect} from 'react-redux';
import {
  fetchPartners,
  resetPartnerDetail,
  resetRegistration,
} from '../../redux/actions';

class PartnersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TAB_OPTIONS: ['active', 'pending'],
      partnersData: [],
      refreshing: false,
    };
    this.onTabPress = this.onTabPress.bind(this);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.pullToRefresh = this.pullToRefresh.bind(this);
  }

  componentDidMount() {
    this.props.fetchPartners();
  }

  onTabPress = value => {
    console.log({value});
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onItemPress = item => {
    this.props.resetPartnerDetail();
    navigate(ScreenNames.PartnerDetail, {params: item});
  };

  callToAction = () => {
    navigate(ScreenNames.PartnerBasicDetails);
    return;
    navigate(ScreenNames.AddPartnerBasicDetail, {
      params: {fromScreen: true, errorSteps: [3], showImages: [1, 2, 3, 4]},
    });
  };

  onAddButtonPress = () => {
    this.props.resetRegistration();
    navigate(ScreenNames.DealershipTypeSelection);
  };

  pullToRefresh = async () => {
    try {
      this.setState({refreshing: true});
      await this.props.fetchPartners(); // your API call function
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({refreshing: false});
    }
  };

  render() {
    const {TAB_OPTIONS, partnersData, refreshing} = this.state;
    const {partnersList} = this.props;

    return (
      <>
        <Partner_Component
          onTabPress={this.onTabPress}
          TAB_OPTIONS={TAB_OPTIONS}
          onRightIconPress={this.onRightIconPress}
          partnersData={partnersList}
          onItemPress={this.onItemPress}
          callToAction={this.callToAction}
          onAddButtonPress={this.onAddButtonPress}
          onRefresh={this.pullToRefresh}
          refreshing={refreshing}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  resetRegistration,
  fetchPartners,
  resetPartnerDetail,
};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    partnersList: state.partners?.partnersList?.data,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
