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
import {
  PARTNER_TAB_OPTIONS,
  partnerOnboardingStatus,
} from '../../constants/enums';

class PartnersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false, // Pull-to-refresh state
      searchText: '', // Search query input
      isSearch: false, // Whether search is active
      apiTrigger: 'default', // Used to differentiate fetch types for loader
      activeTab: PARTNER_TAB_OPTIONS[0], // Tracks which tab is active
    };
    this.limit = 10; // Items per page for pagination
  }

  componentDidMount() {
    this.loadInitialPartners();
  }

  // Helper to determine current tab status
  getStatus = () =>
    this.isActive()
      ? partnerOnboardingStatus.APPROVED
      : partnerOnboardingStatus.PENDING;

  isActive = () => this.state.activeTab === PARTNER_TAB_OPTIONS[0];
  isPending = () => this.state.activeTab === PARTNER_TAB_OPTIONS[1];

  // Load initial partners on mount or tab switch
  loadInitialPartners = () => {
    const {activePartners, pendingPartners} = this.props;
    if (this.isActive() && activePartners.length === 0) {
      this.props.fetchActivePartners(1, this.limit);
    } else if (this.isPending() && pendingPartners.length === 0) {
      this.props.fetchPendingPartners(1, this.limit);
    }
  };

  // Fetch next page based on current context (search/tab)
  loadMorePartners = () => {
    const {isSearch, searchText} = this.state;
    const {
      loading,
      activePage,
      activeTotalPages,
      pendingPage,
      pendingTotalPages,
      searchPage,
      searchTotalPages,
    } = this.props;

    if (loading) {
      return;
    }

    // Decide which pagination to use
    const [currentPage, totalPages] = isSearch
      ? [searchPage, searchTotalPages]
      : this.isActive()
      ? [activePage, activeTotalPages]
      : [pendingPage, pendingTotalPages];

    if (currentPage >= totalPages) {
      return;
    }

    const nextPage = currentPage + 1;
    this.setState({apiTrigger: 'loadMore'});

    if (isSearch && searchText.length > 2) {
      // Load more search results
      this.props.searchPartnersThunk(
        searchText,
        nextPage,
        this.limit,
        () => this.setState({apiTrigger: 'default'}),
        null,
        this.getStatus(),
      );
    } else {
      // Load more partners from tab
      const fetch = this.isActive()
        ? this.props.fetchActivePartners
        : this.props.fetchPendingPartners;
      fetch(nextPage, this.limit, () => this.setState({apiTrigger: 'default'}));
    }
  };

  // Pull-to-refresh handler
  pullToRefresh = async () => {
    try {
      this.setState({refreshing: true, apiTrigger: 'pullToRefresh'});
      const fetch = this.isActive()
        ? this.props.fetchActivePartners
        : this.props.fetchPendingPartners;
      await fetch(1, this.limit);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({refreshing: false, apiTrigger: 'default'});
    }
  };

  // Handles tab switching
  onTabPress = activeTab => {
    const {activePartners, pendingPartners} = this.props;
    this.setState({activeTab, isSearch: false, searchText: ''}, () => {
      this.props.clearSearchResults();
      if (this.isActive() && activePartners.length === 0) {
        this.props.fetchActivePartners(1, this.limit);
      } else if (this.isPending() && pendingPartners.length === 0) {
        this.props.fetchPendingPartners(1, this.limit);
      }
    });
  };

  // Updates search input and clears results on empty string
  onSearchText = text => {
    this.setState({searchText: text}, () => {
      if (text.trim() === '') {
        this.setState({isSearch: false});
        this.props.clearSearchResults();
      }
    });
  };

  clearSearch = () => {
    this.setState({searchText: '', isSearch: false});
    this.props.clearSearchResults();
  };

  // Initiates search API call
  searchFromAPI = text => {
    const trimmed = text.trim();
    if (trimmed.length > 2) {
      this.setState({isSearch: true}, () => {
        this.props.searchPartnersThunk(
          trimmed,
          1,
          this.limit,
          () => {},
          null,
          this.getStatus(),
        );
      });
    } else {
      this.setState({isSearch: false});
    }
  };

  // Notification icon press
  onRightIconPress = () => navigate(ScreenNames.Notification);

  // Add icon press for adding new partners
  onAddButtonPress = () => {
    this.props.resetRegistration();
    navigate(ScreenNames.DealershipTypeSelection);
  };

  // Pending partners button click ( Upload Docs)
  callToAction = () => navigate(ScreenNames.DocumentScreen);

  // Navigate to Partner Detail screen
  onItemPress = item => {
    this.props.resetPartnerDetail();
    navigate(ScreenNames.PartnerDetail, {params: item});
  };

  render() {
    const {refreshing, apiTrigger, searchText, isSearch} = this.state;
    const {
      activePartners,
      pendingPartners,
      searchPartners,
      activePage,
      activeTotalPages,
      pendingPage,
      pendingTotalPages,
      searchPage,
      searchTotalPages,
      loading,
    } = this.props;

    const isActiveTab = this.isActive();

    // Dynamically choose data based on tab/search context
    const displayList = isSearch
      ? searchPartners
      : isActiveTab
      ? activePartners
      : pendingPartners;

    const currentPage = isSearch
      ? searchPage
      : isActiveTab
      ? activePage
      : pendingPage;

    const totalPages = isSearch
      ? searchTotalPages
      : isActiveTab
      ? activeTotalPages
      : pendingTotalPages;

    return (
      <>
        <Partner_Component
          onTabPress={this.onTabPress}
          TAB_OPTIONS={PARTNER_TAB_OPTIONS}
          onRightIconPress={this.onRightIconPress}
          partnersData={Array.isArray(displayList) ? displayList : []}
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
        {/* Only show loader during default API fetch (not pagination or refresh) */}
        {loading && apiTrigger === 'default' && <Loader visible />}
      </>
    );
  }
}

// Redux: dispatch actions
const mapDispatchToProps = {
  resetRegistration,
  fetchActivePartners,
  fetchPendingPartners,
  resetPartnerDetail,
  searchPartnersThunk,
  clearSearchResults,
};

// Redux: map state to props
const mapStateToProps = ({partners}) => ({
  loading: partners.loading,
  activePartners: partners.activePartners,
  pendingPartners: partners.pendingPartners,
  activePage: partners.activePage,
  activeTotalPages: partners.activeTotalPages,
  pendingPage: partners.pendingPage,
  pendingTotalPages: partners.pendingTotalPages,
  searchPartners: partners.searchPartners,
  searchPage: partners.searchPage,
  searchTotalPages: partners.searchTotalPages,
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
