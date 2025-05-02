import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Partner_Component from './Partner_Component';
import {connect} from 'react-redux';
import {
  fetchActivePartners,
  fetchPendingPartners,
  resetPartnerDetail,
  resetRegistration,
  clearSearchResults,
  searchPartnersThunk,
} from '../../redux/actions';
import {Loader} from '../../components';

class PartnersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TAB_OPTIONS: ['active', 'pending'],
      refreshing: false,
      searchText: '',
      isSearch: false,
      apiTrigger: 'default',
      activeTab: 'active',
    };
    this.page = 1;
    this.limit = 10;
  }

  // Initial data load based on tab
  componentDidMount() {
    this.loadPartners();
  }

  // Load partners if not already in store
  loadPartners = () => {
    const {activeTab} = this.state;
    const {activePartners, pendingPartners} = this.props;

    if (activeTab === 'active' && activePartners.length === 0) {
      this.props.fetchActivePartners(this.page, this.limit, () => this.page++);
    } else if (activeTab === 'pending' && pendingPartners.length === 0) {
      this.props.fetchPendingPartners(this.page, this.limit, () => this.page++);
    }
  };

  // Load more partners when scrolling
  loadMorePartners = () => {
    const {activeTab, isSearch, searchText} = this.state;
    const {
      loading,
      activePage,
      activeTotalPages,
      pendingPage,
      pendingTotalPages,
    } = this.props;

    const canLoadMore =
      activeTab === 'active'
        ? activePage < activeTotalPages
        : pendingPage < pendingTotalPages;

    if (!loading && canLoadMore) {
      this.setState({apiTrigger: 'loadMore'});
      const pageToLoad =
        activeTab === 'active' ? activePage + 1 : pendingPage + 1;

      if (isSearch && searchText.length > 2) {
        this.props.searchPartnersThunk(
          searchText,
          pageToLoad,
          this.limit,
          () => {
            this.setState({apiTrigger: 'default'});
          },
        );
      } else {
        const fetch =
          activeTab === 'active'
            ? this.props.fetchActivePartners
            : this.props.fetchPendingPartners;
        fetch(pageToLoad, this.limit, () =>
          this.setState({apiTrigger: 'default'}),
        );
      }
    }
  };

  // Handle tab change and avoid refetching if data exists
  onTabPress = value => {
    const {activePartners, pendingPartners} = this.props;
    this.setState({activeTab: value, isSearch: false, searchText: ''}, () => {
      this.props.clearSearchResults();
      this.page = 1;

      if (value === 'active' && activePartners.length === 0) {
        this.props.fetchActivePartners(
          this.page,
          this.limit,
          () => this.page++,
        );
      } else if (value === 'pending' && pendingPartners.length === 0) {
        this.props.fetchPendingPartners(
          this.page,
          this.limit,
          () => this.page++,
        );
      }
    });
  };

  // Pull-to-refresh logic
  pullToRefresh = async () => {
    const {activeTab} = this.state;
    try {
      this.setState({refreshing: true, apiTrigger: 'pullToRefresh'});
      this.page = 1;
      const fetch =
        activeTab === 'active'
          ? this.props.fetchActivePartners
          : this.props.fetchPendingPartners;
      await fetch(this.page, this.limit, () => this.page++);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({refreshing: false, apiTrigger: 'default'});
    }
  };

  // Navigate to Notification screen
  onRightIconPress = () => navigate(ScreenNames.Notification);

  // Navigate to Partner Detail screen
  onItemPress = item => {
    this.props.resetPartnerDetail();
    navigate(ScreenNames.PartnerDetail, {params: item});
  };

  // Navigate to Document Screen
  callToAction = () => navigate(ScreenNames.DocumentScreen);

  // Navigate to Add New Partner
  onAddButtonPress = () => {
    this.props.resetRegistration();
    navigate(ScreenNames.DealershipTypeSelection);
  };

  // Handle search text change
  onSearchText = text => {
    this.setState({searchText: text}, () => {
      if (text.trim() === '') {
        this.setState({isSearch: false});
        this.props.clearSearchResults();
      }
    });
  };

  // Clear search and show original data from reducer
  clearSearch = () => {
    this.setState({searchText: '', isSearch: false});
    this.props.clearSearchResults();
    this.forceUpdate(); // Optional: to re-render list from reducer
  };

  // Trigger API search if input is valid
  searchFromAPI = _searchText => {
    const {activeTab} = this.state;
    const status = activeTab === 'active' ? 'APPROVED' : 'PENDING';

    if (_searchText.length > 2) {
      this.page = 1;
      this.setState({isSearch: true}, () => {
        this.props.searchPartnersThunk(
          _searchText,
          this.page,
          this.limit,
          () => {
            this.page++;
          },
          null,
          status,
        );
      });
    } else {
      this.setState({isSearch: false});
    }
  };

  render() {
    const {
      TAB_OPTIONS,
      refreshing,
      activeTab,
      apiTrigger,
      searchText,
      isSearch,
    } = this.state;
    const {
      activePartners,
      pendingPartners,
      activePage,
      activeTotalPages,
      pendingPage,
      pendingTotalPages,
      loading,
      searchPartners,
    } = this.props;

    const displayList =
      activeTab === 'active' ? activePartners : pendingPartners;
    const currentPage = activeTab === 'active' ? activePage : pendingPage;
    const totalPages =
      activeTab === 'active' ? activeTotalPages : pendingTotalPages;

    return (
      <>
        <Partner_Component
          onTabPress={this.onTabPress}
          TAB_OPTIONS={TAB_OPTIONS}
          onRightIconPress={this.onRightIconPress}
          partnersData={
            isSearch
              ? searchPartners
              : Array.isArray(displayList)
              ? displayList
              : []
          }
          onItemPress={this.onItemPress}
          callToAction={this.callToAction}
          onAddButtonPress={this.onAddButtonPress}
          onRefresh={this.pullToRefresh}
          refreshing={refreshing}
          onLoadMore={this.loadMorePartners}
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          onSearchText={this.onSearchText}
          searchText={searchText}
          clearSearch={this.clearSearch}
          setSearch={this.searchFromAPI}
        />
        {loading && apiTrigger === 'default' && <Loader visible />}
      </>
    );
  }
}

const mapDispatchToProps = {
  resetRegistration,
  fetchActivePartners,
  fetchPendingPartners,
  resetPartnerDetail,
  searchPartnersThunk,
  clearSearchResults,
};

const mapStateToProps = ({partners}) => ({
  loading: partners.loading,
  activePartners: partners.activePartners,
  pendingPartners: partners.pendingPartners,
  activePage: partners.activePage,
  activeTotalPages: partners.activeTotalPages,
  pendingPage: partners.pendingPage,
  pendingTotalPages: partners.pendingTotalPages,
  searchPartners: partners.searchPartners,
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
