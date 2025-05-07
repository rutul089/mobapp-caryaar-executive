import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {
  clearLoanSearch,
  fetchLoanApplicationsThunk,
  searchLoanApplicationThunk,
} from '../../redux/actions';
import Applications_Component from './Applications_Component';

class ApplicationsScreen extends Component {
  state = {
    refreshing: false,
    apiTrigger: 'default',
    searchText: '',
    isSearch: false,
  };

  limit = 10;

  componentDidMount() {
    this.fetchLoanApplications();
  }

  fetchLoanApplications = (page = 1) => {
    this.props.fetchLoanApplicationsThunk(
      page,
      this.limit,
      this.resetApiTrigger,
      this.resetApiTrigger,
    );
  };

  resetApiTrigger = () => {
    this.setState({apiTrigger: 'default'});
  };

  handleRefresh = async () => {
    this.setState({
      refreshing: true,
      searchText: '',
      isSearch: false,
      apiTrigger: 'pullToRefresh',
    });
    this.props.clearLoanSearch(); // reset search results in Redux
    await this.fetchLoanApplications(1); // fetch first page of normal applications
    this.setState({refreshing: false});
  };

  handleLoadMore = () => {
    const {loading} = this.props;
    const {isSearch, searchText} = this.state;

    if (loading) {
      return;
    }

    const [currentPage, totalPages] = this.getPageInfo();
    if (currentPage >= totalPages) {
      return;
    }

    const nextPage = currentPage + 1;
    this.setState({apiTrigger: 'loadMore'});

    if (isSearch) {
      this.props.searchLoanApplicationThunk(
        searchText.trim(),
        nextPage,
        this.limit,
        this.resetApiTrigger,
      );
    } else {
      this.fetchLoanApplications(nextPage);
    }
  };

  onItemPress = item => {
    navigate(ScreenNames.ApplicationDetail, {params: item});
  };

  onTrackApplicationPress = () => {
    navigate(ScreenNames.TrackApplication);
  };

  onRightIconPress = () => {
    navigate(ScreenNames.Notification);
  };

  onPressPrimaryButton = filters => {
    // TODO Handle filter logic here if needed
    console.log({filters});
  };

  onSearchText = text => {
    const trimmed = text.trim();
    this.setState({searchText: text, apiTrigger: 'default'}, () => {
      if (trimmed === '') {
        this.setState({isSearch: false});
        this.props.clearLoanSearch();
      }
    });
  };

  clearSearch = () => {
    this.setState({searchText: '', isSearch: false});
    this.props.clearLoanSearch();
  };

  searchFromAPI = text => {
    const trimmed = text.trim();
    if (trimmed.length <= 2) {
      this.setState({isSearch: false});
      return;
    }

    this.setState({isSearch: true, apiTrigger: 'default'});
    this.props.searchLoanApplicationThunk(
      trimmed,
      1,
      this.limit,
      this.resetApiTrigger,
    );
  };

  getPageInfo = () => {
    const {loanPage, loanTotalPages, searchPage, searchTotalPages} = this.props;
    const {isSearch} = this.state;

    return isSearch
      ? [searchPage, searchTotalPages]
      : [loanPage, loanTotalPages];
  };

  render() {
    const {loanApplications, searchedLoanApplications, loading} = this.props;
    const {refreshing, apiTrigger, searchText, isSearch} = this.state;

    const applicationsToShow = isSearch
      ? searchedLoanApplications
      : loanApplications;
    const initialLoading = loading && apiTrigger === 'default';
    const [currentPage, totalPages] = this.getPageInfo();

    return (
      <Applications_Component
        applications={applicationsToShow}
        onItemPress={this.onItemPress}
        onTrackApplicationPress={this.onTrackApplicationPress}
        onRightIconPress={this.onRightIconPress}
        onPressPrimaryButton={this.onPressPrimaryButton}
        loading={initialLoading}
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        loadingMore={apiTrigger === 'loadMore' && loading}
        onSearchText={this.onSearchText}
        searchText={searchText}
        clearSearch={this.clearSearch}
        setSearch={this.searchFromAPI}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    );
  }
}

const mapStateToProps = ({applications}) => ({
  loanApplications: applications.loanApplications,
  searchedLoanApplications: applications.searchedLoanApplications,
  loading: applications.loading,
  loanPage: applications.loanPage,
  loanTotalPages: applications.loanTotalPages,
  searchPage: applications.searchPage,
  searchTotalPages: applications.searchTotalPages,
});

const mapDispatchToProps = {
  fetchLoanApplicationsThunk,
  clearLoanSearch,
  searchLoanApplicationThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsScreen);
