import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getScreenParam, goBack} from '../../navigation/NavigationUtils';
import {fetchPartnerFromId} from '../../redux/actions';
import {
  buildDocumentsArray,
  getPartnerAddress,
  handleViewFilePreview,
} from '../../utils/helper';
import Partner_Detail_Component from './Partner_Detail_Component';
class PartnerDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerDetail: {},
      partnerId: null,
      isFetchingDocument: {
        loading: false,
        documentType: '',
      },
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let partnerId = getScreenParam(route, 'params')?.id;
    this.setState(
      {
        partnerId,
      },
      () => {
        this.fetchPartnerFromId(partnerId);
      },
    );
  }

  fetchPartnerFromId = partnerID => {
    console.log({partnerID});
    this.props.fetchPartnerFromId(partnerID);
  };

  onBackPress = () => {
    goBack();
  };

  viewDocument = (type, link) => {
    handleViewFilePreview(
      link,
      imageUri => {
        console.log({imageUri});
        // Callback when image preview is available
        this.setState({previewImage: imageUri});
      },
      type,
      isProcessing => {
        // Callback for loading state
        this.setState({
          isFetchingDocument: {
            loading: isProcessing,
            documentType: type,
          },
        });
      },
    );
  };

  render() {
    const {partnerDetail} = this.props;

    return (
      <>
        <Partner_Detail_Component
          onBackPress={this.onBackPress}
          partnerDetail={partnerDetail}
          contactDetails={[
            {label: 'Owner', value: 'Vijay Sharma'},
            {label: 'Mobile Number', value: '98653 90981'},
            {
              label: 'EmailAddress',
              value: 'aayushman_nayak85@gmail.com',
              full: true,
            },
          ]}
          locationDetail={[
            {
              label: 'Company Name',
              value: get(partnerDetail, 'companyName', '-'),
              full: true,
            },
            {
              label: 'Address',
              value: getPartnerAddress(partnerDetail),
              full: true,
            },
          ]}
          accountDetail={[
            {
              label: 'Account Number',
              value: get(partnerDetail?.bankDetail, 'accountNumber', '-'),
            },
            {
              label: 'Account Holder Name',
              value: get(partnerDetail?.bankDetail, 'accountHolderName', '-'),
            },
            {
              label: 'Bank Name',
              value: get(partnerDetail?.bankDetail, 'bankName', '-'),
            },
            {
              label: 'IFSC Code',
              value: get(partnerDetail?.bankDetail, 'ifscCode', '-'),
            },
            {
              label: 'Branch Name',
              value: get(partnerDetail?.bankDetail, 'branchName', '-'),
            },
            {
              label: 'Settlement Preference',
              value: get(
                partnerDetail?.bankDetail,
                'settlementPreference',
                '-',
              ),
            },
          ]}
          documents={buildDocumentsArray(partnerDetail, this.viewDocument)}
          isFetchingDocument={this.state.isFetchingDocument}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  fetchPartnerFromId,
};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    isLoading: state.appState.loading,
    partnerDetail: state.partners?.partnerDetail?.data,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerDetailScreen);
