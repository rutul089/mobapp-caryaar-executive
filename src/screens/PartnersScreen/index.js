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
      refreshing: false,
      searchText: '',
      isSearch: false,
      apiTrigger: 'default', // Tracks how the API was triggered (loadMore, pullToRefresh, etc.)
      activeTab: PARTNER_TAB_OPTIONS[0], // Default selected tab
    };
    this.limit = 10; // Pagination limit
  }

  componentDidMount() {
    this.loadInitialPartners(); // Load data when component mounts
  }

  // Helpers to check active/pending tab
  isActive = () => this.state.activeTab === PARTNER_TAB_OPTIONS[0];
  isPending = () => this.state.activeTab === PARTNER_TAB_OPTIONS[1];

  // Get onboarding status based on selected tab
  getStatus = () =>
    this.isActive()
      ? partnerOnboardingStatus.APPROVED
      : partnerOnboardingStatus.PENDING;

  // Returns appropriate fetch function based on current tab
  getFetchFunction = () =>
    this.isActive()
      ? this.props.fetchActivePartners
      : this.props.fetchPendingPartners;

  // Returns current and total pages depending on mode (search or tab)
  getPageInfo = () => {
    const {
      activePage,
      activeTotalPages,
      pendingPage,
      pendingTotalPages,
      searchPage,
      searchTotalPages,
    } = this.props;
    const {isSearch} = this.state;

    if (isSearch) {
      return [searchPage, searchTotalPages];
    }
    return this.isActive()
      ? [activePage, activeTotalPages]
      : [pendingPage, pendingTotalPages];
  };

  // Returns the appropriate partner list to display
  getDisplayList = () => {
    const {activePartners, pendingPartners, searchPartners} = this.props;
    const {isSearch} = this.state;

    return isSearch
      ? searchPartners
      : this.isActive()
      ? activePartners
      : pendingPartners;
  };

  // Loads data initially if not already present
  loadInitialPartners = () => {
    const list = this.getDisplayList();
    if (list.length === 0) {
      this.getFetchFunction()(1, this.limit);
    }
  };

  // Handles infinite scroll pagination
  loadMorePartners = () => {
    const {isSearch, searchText} = this.state;
    const {loading} = this.props;

    if (loading) {
      return;
    }

    const [currentPage, totalPages] = this.getPageInfo();
    if (currentPage >= totalPages) {
      return;
    }

    const nextPage = currentPage + 1;
    this.setState({apiTrigger: 'loadMore'});

    if (isSearch && searchText.length > 2) {
      this.props.searchPartnersThunk(
        searchText,
        nextPage,
        this.limit,
        () => this.setState({apiTrigger: 'default'}),
        null,
        this.getStatus(),
      );
    } else {
      this.getFetchFunction()(nextPage, this.limit, () =>
        this.setState({apiTrigger: 'default'}),
      );
    }
  };

  // Pull-to-refresh handler
  pullToRefresh = async () => {
    try {
      this.setState({refreshing: true, apiTrigger: 'pullToRefresh'});
      await this.getFetchFunction()(1, this.limit);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({refreshing: false, apiTrigger: 'default'});
    }
  };

  // Tab switching handler
  onTabPress = activeTab => {
    this.setState({activeTab, isSearch: false, searchText: ''}, () => {
      this.props.clearSearchResults();
      if (this.getDisplayList().length === 0) {
        this.getFetchFunction()(1, this.limit);
      }
    });
  };

  // Search bar text change handler
  onSearchText = text => {
    const trimmed = text.trim();
    this.setState({searchText: text}, () => {
      if (trimmed === '') {
        this.setState({isSearch: false});
        this.props.clearSearchResults();
      }
    });
  };

  // Clear the search input and reset search state
  clearSearch = () => {
    this.setState({searchText: '', isSearch: false});
    this.props.clearSearchResults();
  };

  // Triggers search when text is long enough
  searchFromAPI = text => {
    const trimmed = text.trim();
    if (trimmed.length <= 2) {
      this.setState({isSearch: false});
      return;
    }

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
  };

  // Notification icon press
  onRightIconPress = () => navigate(ScreenNames.Notification);

  // FAB button to add new partner
  onAddButtonPress = () => {
    this.props.resetRegistration();
    navigate(ScreenNames.DealershipTypeSelection);
  };

  // Pending Partner Button click (Upload Documents)
  callToAction = () => navigate(ScreenNames.DocumentScreen);

  // Partner card click handler
  onItemPress = item => {
    this.props.resetPartnerDetail();
    navigate(ScreenNames.PartnerDetail, {params: item});
  };

  render() {
    const {refreshing, apiTrigger, searchText} = this.state;
    const {loading} = this.props;

    const displayList = this.getDisplayList();
    const [currentPage, totalPages] = this.getPageInfo();

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
        {/* Show loader only for the initial/default fetch */}
        {loading && apiTrigger === 'default' && <Loader visible />}
      </>
    );
  }
}

// Redux mappings
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
  searchPage: partners.searchPage,
  searchTotalPages: partners.searchTotalPages,
});

// Exporting connected component
export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
