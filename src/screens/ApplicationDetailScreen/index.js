import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {fetchLoanApplicationFromIdThunk} from '../../redux/actions';
import {handleViewFilePreview} from '../../utils/documentUtils';
import {
  formatDate,
  formatIndianNumber,
  getRelativeTime,
} from '../../utils/helper';
import Application_Detail_Component from './Application_Detail_Component';
// import {handleViewImage} from './DocumentList';
import {get} from 'lodash';

class ApplicationDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationDetail: {},
      applicationID: '',
      isLoading: false,
      panCardLink:
        'https://file-examples.com/storage/fe0d4ef3b467fe96a99bd97/2017/10/file-example_PDF_1MB.pdf',
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    const applicationID = getScreenParam(route, 'params')?.id;

    this.setState({applicationID}, () => {
      this.fetchApplicationDetailById(applicationID);
    });
  }

  fetchApplicationDetailById = id => {
    this.props.fetchLoanApplicationFromIdThunk(id);
  };

  onBackPress = () => {
    goBack();
  };

  onTackApplicationPress = () => {
    navigate(ScreenNames.TrackApplication);
  };

  viewPanCard = () => {
    handleViewFilePreview(
      this.state.panCardLink,
      imageUri => {
        console.log({imageUri});
        // Callback when image preview is available
        this.setState({previewImage: imageUri});
      },
      'Pancard',
      isProcessing => {
        // Callback for loading state
        this.setState({isLoading: isProcessing});
      },
    );
  };

  render() {
    const {loading, selectedLoanApplications} = this.props;
    const {
      partner = {},
      usedVehicle = {},
      customer = {},
      vehicle = {},
    } = selectedLoanApplications || {};

    const safeGet = (obj, path) => (loading ? '-' : get(obj, path, '-'));
    return (
      <>
        <Application_Detail_Component
          onBackPress={this.onBackPress}
          applicationDetail={this.state.applicationDetail}
          vehicleDetail={[
            {label: 'Make', value: safeGet(vehicle, 'make')},
            {label: 'Model', value: safeGet(vehicle, 'model')},
            {
              label: 'Registration',
              value: safeGet(usedVehicle, 'registerNumber'),
            },
            {label: 'Price', value: formatIndianNumber(900000)},
            {
              label: 'Loan Amount',
              value: formatIndianNumber(
                safeGet(selectedLoanApplications, 'loanAmount'),
              ),
            },
          ]}
          customerDetail={[
            {
              label: 'Name',
              value: safeGet(customer?.customerDetails, 'applicantName'),
            },
            {
              label: 'Phone',
              value: safeGet(customer, 'mobileNumber'),
            },
            {label: 'Location', value: 'Mumbai'},
            {
              label: 'Type',
              value: safeGet(customer?.customerDetails, 'incomeSource'),
            },
          ]}
          loanDetail={[
            {
              label: 'Amount',
              value: formatIndianNumber(
                safeGet(selectedLoanApplications, 'loanAmount'),
              ),
            },
            {
              label: 'Tenure',
              value: ` ${safeGet(selectedLoanApplications, 'tenure')} Month`,
            },
            {
              label: 'Interest Rate',
              value: safeGet(selectedLoanApplications, 'interesetRate'),
            },
            {
              label: 'EMI',
              value: formatIndianNumber(
                safeGet(selectedLoanApplications, 'emi'),
              ),
            },
          ]}
          onTackApplicationPress={this.onTackApplicationPress}
          viewPanCard={this.viewPanCard}
          isLoading={this.state.isLoading}
          loading={loading}
          loanApplicationId={safeGet(
            selectedLoanApplications,
            'loanApplicationId',
          )}
          loanStatus={safeGet(selectedLoanApplications, 'status')}
          businessName={safeGet(partner, 'businessName')}
          submittedOn={formatDate(
            safeGet(selectedLoanApplications, 'createdAt'),
          )}
          processingTime={selectedLoanApplications?.processingTime}
          lastUpdatedOn={getRelativeTime(
            safeGet(selectedLoanApplications, 'updatedAt'),
          )}
        />
      </>
    );
  }
}

const mapDispatchToProps = {fetchLoanApplicationFromIdThunk};
const mapStateToProps = ({applications}) => {
  return {
    selectedLoanApplications: applications.selectedLoanApplications,
    loading: applications.loading,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationDetailScreen);
