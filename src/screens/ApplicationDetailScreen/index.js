import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {formatIndianNumber, handleViewFilePreview} from '../../utils/helper';
import Application_Detail_Component from './Application_Detail_Component';
// import {handleViewImage} from './DocumentList';

export default class ApplicationDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationDetail: {},
      isLoading: false,
      panCardLink:
        'https://file-examples.com/storage/fe0d4ef3b467fe96a99bd97/2017/10/file-example_PDF_1MB.pdf',
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let applicationDetail = getScreenParam(route, 'params');
    this.setState(
      {
        applicationDetail,
      },
      () => {
        console.log({applicationDetail: this.state.applicationDetail});
      },
    );
  }

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
    return (
      <>
        <Application_Detail_Component
          onBackPress={this.onBackPress}
          applicationDetail={this.state.applicationDetail}
          vehicleDetail={[
            {label: 'Make', value: 'Honda'},
            {label: 'Model', value: 'City | Elegant Edition'},
            {label: 'Registration', value: 'MH 02 AB 1234'},
            {label: 'Price', value: formatIndianNumber(900000)},
            {label: 'Loan Amount', value: formatIndianNumber(800000)},
          ]}
          customerDetail={[
            {label: 'Name', value: 'Rahul Sharma'},
            {label: 'Phone', value: '90874 84013'},
            {label: 'Location', value: 'Mumbai'},
            {label: 'Type', value: 'Salaried'},
          ]}
          loanDetail={[
            {label: 'Amount', value: formatIndianNumber(850000)},
            {label: 'Tenure', value: '60 Months'},
            {label: 'Interest Rate', value: '8.5%'},
            {label: 'EMI', value: formatIndianNumber(17500)},
          ]}
          onTackApplicationPress={this.onTackApplicationPress}
          viewPanCard={this.viewPanCard}
          isLoading={this.state.isLoading}
        />
      </>
    );
  }
}
