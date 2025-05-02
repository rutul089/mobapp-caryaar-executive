import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Partner_Component from './Partner_Component';
import {connect} from 'react-redux';
import {
  fetchPartners,
  resetPartnerDetail,
  resetRegistration,
  searchPartnersThunk,
} from '../../redux/actions';
import {Loader} from '../../components';

class PartnersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TAB_OPTIONS: ['active', 'pending'],
      partnersData: [],
      refreshing: false,
      searchText: '',
      isSearch: false,
    };
    this.onTabPress = this.onTabPress.bind(this);
    this.onRightIconPress = this.onRightIconPress.bind(this);
    this.onItemPress = this.onItemPress.bind(this);
    this.pullToRefresh = this.pullToRefresh.bind(this);
  }

  componentDidMount() {
    this.props.fetchPartners();
  }

  onTabPress = value => {};

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onItemPress = item => {
    this.props.resetPartnerDetail();
    navigate(ScreenNames.PartnerDetail, {params: item});
  };

  callToAction = () => {
    navigate(ScreenNames.DocumentScreen);
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

  onSearchText = value => {
    this.setState(
      {
        searchText: value,
      },
      () => {
        // this.searchFromAPI(value);
      },
    );
  };

  clearSearch = () => {
    this.setState({
      searchText: '',
      isSearch: false,
    });
  };

  searchFromAPI = _searchText => {
    let text = this.state.searchText;
    if (_searchText.length > 2) {
      this.setState(
        {
          isSearch: true,
        },
        () => {
          this.props.searchPartnersThunk(
            text,
            response => {},
            error => {},
          );
        },
      );
    } else {
      this.setState({
        isSearch: false,
        searchText: text,
      });
    }
  };

  render() {
    const {TAB_OPTIONS, isSearch, refreshing, searchText} = this.state;
    const {partnersList, searchPartners, loading} = this.props;
    return (
      <>
        <Partner_Component
          onTabPress={this.onTabPress}
          TAB_OPTIONS={TAB_OPTIONS}
          onRightIconPress={this.onRightIconPress}
          partnersData={isSearch ? searchPartners : partnersList}
          onItemPress={this.onItemPress}
          callToAction={this.callToAction}
          onAddButtonPress={this.onAddButtonPress}
          onRefresh={this.pullToRefresh}
          refreshing={refreshing}
          onSearchText={this.onSearchText}
          searchText={searchText}
          clearSearch={this.clearSearch}
          setSearch={this.searchFromAPI}
        />
        {loading && !refreshing && <Loader visible={loading && !refreshing} />}
      </>
    );
  }
}

const mapDispatchToProps = {
  resetRegistration,
  fetchPartners,
  resetPartnerDetail,
  searchPartnersThunk,
};
const mapStateToProps = ({appState, partners}) => {
  return {
    isInternetConnected: appState.isInternetConnected,
    partnersList: partners?.partnersList?.data,
    searchPartners: partners?.searchPartners,
    loading: partners?.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
