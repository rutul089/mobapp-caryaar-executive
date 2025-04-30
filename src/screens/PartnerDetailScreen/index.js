import {images} from '@caryaar/components';
import {get} from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from '../../components';
import {businessTypeValue, getLabelFromEnum} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {
  fetchPartnerFromId,
  resetPartnerDetail,
  resetRegistration,
  setBankingDetails,
  setBasicDetails,
  setDealershipType,
  setLocationDetails,
  setPartnerRole,
  setSellerType,
  setUserType,
} from '../../redux/actions';
import {
  buildDocumentsArray,
  getLocationText,
  getPartnerAddress,
  handleViewFilePreview,
  removeCountryCode,
} from '../../utils/helper';
import Partner_Detail_Component from './Partner_Detail_Component';
import {formatPartnerDetails} from '../../utils/partnerHelpers';
class PartnerDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPartner: {},
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

  onEditPartnerDetail = () => {
    const {selectedPartner} = this.props;

    const {
      basicDetails,
      locationDetails,
      bankingDetails,
      sellerType,
      partnerType,
      isMultiUser,
      partnerRole,
    } = formatPartnerDetails(selectedPartner);

    this.props.setUserType(isMultiUser);
    this.props.setPartnerRole(partnerRole);
    this.props.setDealershipType(partnerType);
    this.props.setSellerType(sellerType);
    this.props.setBasicDetails(basicDetails);
    this.props.setLocationDetails(locationDetails);
    this.props.setBankingDetails(bankingDetails);

    navigate(ScreenNames.AddPartnerBasicDetail, {
      params: {
        fromScreen: true,
        showImages: [1, 2, 3, 4],
        errorSteps: [],
      },
    });
  };

  render() {
    const {selectedPartner, isLoading} = this.props;
    const {owner = {}, bankDetail = {}} = selectedPartner || {};
    // const safeGet = (obj, path) => get(obj, path, '-');
    const safeGet = (obj, path) => {
      if (isLoading) {
        return '-';
      }
      return get(obj, path, '-');
    };

    return (
      <>
        <Partner_Detail_Component
          onBackPress={this.onBackPress}
          partnerDetail={selectedPartner}
          contactDetails={[
            {label: 'Owner', value: safeGet(owner, 'name')},
            {label: 'Mobile Number', value: safeGet(owner, 'mobileNumber')},
            {label: 'EmailAddress', value: safeGet(owner, 'email'), full: true},
          ]}
          locationDetail={[
            {
              label: 'Company Name',
              value: safeGet(selectedPartner, 'companyName'),
              full: true,
            },
            {
              label: 'Address',
              value: getPartnerAddress(selectedPartner),
              full: true,
            },
          ]}
          accountDetail={[
            {
              label: 'Account Number',
              value: safeGet(bankDetail, 'accountNumber'),
            },
            {
              label: 'Account Holder Name',
              value: safeGet(bankDetail, 'accountHolderName'),
            },
            {label: 'Bank Name', value: safeGet(bankDetail, 'bankName')},
            {label: 'IFSC Code', value: safeGet(bankDetail, 'ifscCode')},
            {label: 'Branch Name', value: safeGet(bankDetail, 'branchName')},
            {
              label: 'Settlement Preference',
              value: safeGet(bankDetail, 'settlementPreference'),
            },
          ]}
          documents={buildDocumentsArray(selectedPartner, this.viewDocument)}
          isFetchingDocument={this.state.isFetchingDocument}
          businessType={getLabelFromEnum(
            businessTypeValue,
            selectedPartner?.businessType,
          )}
          infoRowDetails={[
            {
              value: safeGet(owner, 'mobileNumber'),
              icon: images.phoneOutline,
              color: 'white',
            },
            {
              value: getLocationText(
                safeGet(selectedPartner, 'city'),
                safeGet(selectedPartner, 'state'),
              ),
              icon: images.locationPin,
              color: 'white',
            },
          ]}
          footerInfo={[
            {
              label: 'Years in Business',
              value: safeGet(selectedPartner, 'yearInBusiness'),
            },
            {
              label: 'Monthly Car Sales',
              value: safeGet(selectedPartner, 'monthlyCarSale'),
            },
          ]}
          onEditPartnerDetail={this.onEditPartnerDetail}
        />
        {isLoading && <Loader visible={isLoading} />}
      </>
    );
  }
}

const mapDispatchToProps = {
  fetchPartnerFromId,
  resetPartnerDetail,
  resetRegistration,
  setBasicDetails,
  setLocationDetails,
  setBankingDetails,
  setSellerType,
  setDealershipType,
  setUserType,
  setPartnerRole,
};
const mapStateToProps = ({appState, partners}) => {
  return {
    isInternetConnected: appState.isInternetConnected,
    isLoading: partners.loading,
    selectedPartner: partners?.selectedPartner,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerDetailScreen);
