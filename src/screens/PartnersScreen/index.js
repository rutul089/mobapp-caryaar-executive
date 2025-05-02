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
    this.props.fetchPartners(this.page, this.limit, () => {
      this.page++;
    });
  };

  loadMorePartners = () => {
    if (!this.props.loading && this.page <= this.props.totalPages) {
      this.setState({isLoadMore: true, apiTrigger: 'loadMore'}); // UPDATED
      if (this.state.isSearch) {
        this.props.searchPartnersThunk(
          this.state.searchText,
          this.page,
          this.limit,
          () => {
            this.page++;
            this.setState({isLoadMore: false, apiTrigger: 'default'}); // UPDATED
          },
        );
      } else {
        this.props.fetchPartners(this.page, this.limit, () => {
          this.page++;
          this.setState({isLoadMore: false, apiTrigger: 'default'}); // UPDATED
        });
      }
    }
  };

  // loadMorePartners = () => {
  //   if (!this.props.loading && this.page <= this.props.totalPages) {
  //     this.setState({isLoadMore: true});
  //     if (this.state.isSearch) {
  //       this.props.searchPartnersThunk(
  //         this.state.searchText,
  //         this.page,
  //         this.limit,
  //         () => {
  //           this.page++;
  //           this.setState({isLoadMore: false});
  //         },
  //       );
  //     } else {
  //       this.loadPartners();
  //     }
  //   }
  // };

  onTabPress = value => {
    // optional: clear state on tab change
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

  pullToRefresh = async () => {
    try {
      this.setState({refreshing: true, apiTrigger: 'pullToRefresh'}); // UPDATED
      this.page = 1;
      if (this.state.isSearch) {
        await this.props.searchPartnersThunk(
          this.state.searchText,
          this.page,
          this.limit,
          () => {
            this.page++;
          },
        );
      } else {
        await this.props.fetchPartners(this.page, this.limit, () => {
          this.page++;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({refreshing: false, apiTrigger: 'default'}); // UPDATED
    }
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
    const {TAB_OPTIONS, isSearch, refreshing, searchText, apiTrigger} =
      this.state;
    const {partnersList, searchPartners, loading} = this.props;
    const displayList = isSearch ? searchPartners : partnersList;

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
          onSearchText={this.onSearchText}
          searchText={searchText}
          clearSearch={this.clearSearch}
          setSearch={this.searchFromAPI}
          onLoadMore={this.loadMorePartners}
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          loading={loading}
        />
        {loading && apiTrigger === 'default' && <Loader visible />}
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

const mapStateToProps = ({appState, partners}) => ({
  isInternetConnected: appState.isInternetConnected,
  partnersList: partners?.partnersList,
  searchPartners: partners?.searchPartners,
  loading: partners?.loading,
  currentPage: partners?.currentPage,
  totalPages: partners?.totalPages,
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersScreen);
