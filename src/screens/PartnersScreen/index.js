// ✅ Updated index.js to avoid redundant API calls on tab change
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
} from '../../redux/actions';
import {Loader} from '../../components';
import {searchPartnersThunk} from '../../redux/actions/partnerFormActions';

class PartnersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TAB_OPTIONS: ['active', 'pending'],
      refreshing: false,
      searchText: '',
      isSearch: false,
      apiTrigger: 'default', // 'default' | 'loadMore' | 'pullToRefresh'
    };
    this.page = 1;
    this.limit = 10;
  }

  componentDidMount() {
    this.loadPartners();
  }

  loadPartners = () => {
    const {activeTab} = this.state;
    const {activePartners, pendingPartners} = this.props;

    if (activeTab === 'active' && activePartners.length === 0) {
      this.props.fetchActivePartners(this.page, this.limit, () => {
        this.page++;
      });
    } else if (activeTab === 'pending' && pendingPartners.length === 0) {
      this.props.fetchPendingPartners(this.page, this.limit, () => {
        this.page++;
      });
    }
  };

  loadMorePartners = () => {
    const {activeTab} = this.state;
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
      if (activeTab === 'active') {
        this.props.fetchActivePartners(activePage + 1, this.limit, () => {
          this.setState({apiTrigger: 'default'});
        });
      } else {
        this.props.fetchPendingPartners(pendingPage + 1, this.limit, () => {
          this.setState({apiTrigger: 'default'});
        });
      }
    }
  };

  onTabPress = value => {
    this.setState({activeTab: value}, () => {
      this.page = 1;
      this.loadPartners();
    });
  };

  pullToRefresh = async () => {
    const {activeTab} = this.state;
    try {
      this.setState({refreshing: true, apiTrigger: 'pullToRefresh'});
      this.page = 1;
      if (activeTab === 'active') {
        await this.props.fetchActivePartners(this.page, this.limit, () => {
          this.page++;
        });
      } else {
        await this.props.fetchPendingPartners(this.page, this.limit, () => {
          this.page++;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({refreshing: false, apiTrigger: 'default'});
    }
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onItemPress = item => {
    this.props.resetPartnerDetail();
    navigate(ScreenNames.PartnerDetail, {params: item});
  };

  callToAction = () => {
    navigate(ScreenNames.DocumentScreen);
  };

  onAddButtonPress = () => {
    this.props.resetRegistration();
    navigate(ScreenNames.DealershipTypeSelection);
  };

  onSearchText = value => {
    this.setState({searchText: value});
  };

  clearSearch = () => {
    this.setState({
      searchText: '',
      isSearch: false,
    });
    this.page = 1;
    this.props.fetchPartners(this.page, this.limit, () => {
      this.page++;
    });
  };

  searchFromAPI = _searchText => {
    if (_searchText.length > 2) {
      this.page = 1;
      this.setState(
        {
          isSearch: true,
        },
        () => {
          this.props.searchPartnersThunk(
            _searchText,
            this.page,
            this.limit,
            () => {
              this.page++;
            },
          );
        },
      );
    } else {
      this.setState({
        isSearch: false,
      });
    }
  };

  render() {
    const {TAB_OPTIONS, refreshing, activeTab, apiTrigger, searchText} =
      this.state;
    const {
      activePartners,
      pendingPartners,
      activePage,
      activeTotalPages,
      pendingPage,
      pendingTotalPages,
      loading,
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
          onSubmitEditing={this.onSubmitEditing}
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
};

const mapStateToProps = ({partners}) => ({
  loading: partners.loading,
  activePartners: partners.activePartners,
  pendingPartners: partners.pendingPartners,
  activePage: partners.activePage,
  activeTotalPages: partners.activeTotalPages,
  pendingPage: partners.pendingPage,
  pendingTotalPages: partners.pendingTotalPages,
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
