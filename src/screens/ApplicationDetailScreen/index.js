import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {fetchLoanApplicationFromIdThunk} from '../../redux/actions';
import {viewDocumentHelper} from '../../utils/documentUtils';
import {
  formatDate,
  formatIndianNumber,
  getRelativeTime,
  showToast,
} from '../../utils/helper';
import Application_Detail_Component from './Application_Detail_Component';
import {get} from 'lodash';

class ApplicationDetailScreen extends Component {
  state = {
    applicationDetail: {},
    applicationID: '',
    isLoading: false,
    documentType: '',
  };

  componentDidMount() {
    const applicationID = getScreenParam(this.props.route, 'params')?.id;
    this.setState({applicationID}, () => {
      this.props.fetchLoanApplicationFromIdThunk(applicationID);
    });
  }

  onBackPress = () => goBack();

  onTackApplicationPress = () => navigate(ScreenNames.TrackApplication);

  requestDocument = key => showToast('warning', `Request ${key}`);

  onDocumentPress = async (type, link, hasDocument) => {
    if (!hasDocument) {
      return this.requestDocument(type);
    }

    this.setState({isLoading: true, documentType: type});

    await viewDocumentHelper(
      link,
      uri => navigate(ScreenNames.ImagePreviewScreen, {uri}),
      () => showToast('error', 'Could not open the document.'),
      () => this.setState({isLoading: false, documentType: ''}),
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
          {
            label: 'Price',
            value: safeGet(usedVehicle, 'salePrice'),
          },
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
          {label: 'Phone', value: safeGet(customer, 'mobileNumber')},
          {
            label: 'Location',
            value: safeGet(customer?.customerDetails, 'address'),
          },
          {
            label: 'Type',
            value: safeGet(customer?.customerDetails, 'occupation'),
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
            value: `${safeGet(selectedLoanApplications, 'tenure')} Months`,
          },
          {
            label: 'Interest Rate',
            value: `${safeGet(selectedLoanApplications, 'interesetRate')}%`,
          },
          {
            label: 'EMI',
            value: formatIndianNumber(safeGet(selectedLoanApplications, 'emi')),
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
        additionalNotes={usedVehicle?.additionalNotes}
        submittedOn={formatDate(safeGet(selectedLoanApplications, 'createdAt'))}
        processingTime={selectedLoanApplications?.processingTime}
        lastUpdatedOn={getRelativeTime(
          safeGet(selectedLoanApplications, 'updatedAt'),
        )}
        loanDocuments={customer?.loanDocuments}
        kycDocuments={customer?.customerDetails}
        onDocumentPress={this.onDocumentPress}
        documentType={this.state.documentType}
      />
    );
  }
}

const mapStateToProps = ({applications}) => ({
  selectedLoanApplications: applications.selectedLoanApplications,
  loading: applications.loading,
});

const mapDispatchToProps = {fetchLoanApplicationFromIdThunk};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationDetailScreen);
