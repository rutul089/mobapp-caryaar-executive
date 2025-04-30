import {ImagePreviewModal} from '@caryaar/components';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../../constants/ScreenNames';
import {getScreenParam, navigate} from '../../../navigation/NavigationUtils';
import {setDocumentDetails} from '../../../redux/actions';
import DocumentUtils from '../../../utils/DocumentUtils';
import Partner_Document_Form_Component from './Partner_Document_Form_Component';
import {partnerDocumentType} from '../../../constants/enums';
import {get} from 'lodash';

class AddPartnerRequiredDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentGroups: [],
      initialDocuments: {},
      previewImage: null,
      isImageViewerVisible: false,
      showImages: [1, 2],
      errorSteps: [],
      fromScreen: false,
    };
  }

  componentDidMount() {
    const {route} = this.props;
    let navState = getScreenParam(route, 'params', null);
    let fromScreen = get(navState, 'fromScreen', false);
    if (fromScreen) {
      this.setState({
        showImages: get(navState, 'showImages', []),
        errorSteps: get(navState, 'errorSteps', []),
      });
    }
    this.setState({
      fromScreen: fromScreen,
    });
    this.fetchDocumentDataFromAPI();
  }
  fetchDocumentDataFromAPI = () => {
    const apiResponse = {
      documents: {
        GST: null,
        ShopLicense: null,
        'PAN Card': null,
        'Aadhar Card Front': null,
        'Aadhar Card Back': null,
        Photograph: null,
        'Bank Statement': null,
        'Cancelled Cheque': null,
      },
      // documents: {
      //   GST: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_1MB.doc',
      //   'Shop License':
      //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      //   'PAN Card':
      //     'https://votercardprint.com/image/cache/catalog/pan-card-print-500x500.jpg',
      //   'Aadhar Card Front':
      //     'https://4.imimg.com/data4/TB/KH/MY-1817237/pre-printed-aadhar-card-1000x1000.jpg',
      //   'Aadhar Card Back':
      //     'https://4.imimg.com/data4/TB/KH/MY-1817237/pre-printed-aadhar-card-1000x1000.jpg',
      //   Photograph: null,
      //   'Bank Statement': null,
      //   'Cancelled Cheque': null,
      // },
    };

    const groups = [
      {
        title: 'Business Documents',
        documents: [
          {
            label: 'GST',
            stateName: 'gst',
            documentType: partnerDocumentType.GST_REGISTRATION,
          },
          {
            label: 'Shop License',
            stateName: 'shopLicense',
            documentType: partnerDocumentType.SHOP_LICENSE,
          },
          {
            label: 'PAN Card',
            stateName: 'panCard',
            documentType: partnerDocumentType.PAN_CARD,
          },
        ],
      },
      {
        title: 'Personal Documents',
        documents: [
          {
            label: 'Aadhar Card Front',
            stateName: 'aadharCardFront',
            documentType: partnerDocumentType.AADHAR_CARD_FRONT,
          },
          {
            label: 'Aadhar Card Back',
            stateName: 'aadharCardBack',
            documentType: partnerDocumentType.AADHAR_CARD_BACK,
          },
          {
            label: 'Photograph',
            stateName: 'photograph',
            documentType: partnerDocumentType.PHOTOGRAPH,
          },
        ],
      },
      {
        title: 'Bank Documents',
        documents: [
          {
            label: 'Bank Statement',
            stateName: 'bankStatement',
            documentType: partnerDocumentType.BANK_STATEMENT,
          },
          {
            label: 'Cancelled Cheque',
            stateName: 'cancelledCheque',
            documentType: partnerDocumentType.CANCELLED_CHEQUE,
          },
        ],
      },
    ];

    const documentGroups = groups.map(group => ({
      ...group,
      documents: group.documents.map(doc => ({
        ...doc,
        image: apiResponse.documents[doc.label]
          ? {
              uri: apiResponse.documents[doc.label],
              isLocal: false,
              type: null,
              fileSize: null,
            }
          : null,
      })),
    }));

    this.setState({
      documentGroups,
      initialDocuments: apiResponse.documents,
    });
  };
  handleUploadMedia = (groupTitle, label) =>
    DocumentUtils.handleUploadMedia(
      this.state,
      this.setState.bind(this),
      groupTitle,
      label,
    );

  handleDeleteMedia = (groupTitle, label) =>
    DocumentUtils.handleDeleteMedia(
      this.state,
      this.setState.bind(this),
      groupTitle,
      label,
    );

  handleViewImage = label => {
    DocumentUtils.handleViewImage(
      this.state,
      this.setState.bind(this),
      label,
      () => this.setState({isImageViewerVisible: true}),
    );
  };
  // handleViewImage = label => {
  //   const foundImage = this.state.documentGroups
  //     .flatMap(group => group.documents)
  //     .find(doc => doc.label === label)?.image;
  //   console.log('foundImage', foundImage);
  //   if (foundImage) {
  //     this.setState({previewImage: foundImage});
  //   } else {
  //     console.log('No image found for:', label);
  //   }
  // };

  handleNextPress = () => {
    const changedDocuments = [];

    this.state.documentGroups.forEach(group => {
      group.documents.forEach(doc => {
        const initialUri = this.state.initialDocuments[doc.label] || null;
        const currentUri = doc.image ? doc.image.uri : null;
        if (currentUri !== null) {
          changedDocuments.push({
            documentType: doc.documentType || '', // safe fallback
            // documentUrl: currentUri,
            documentUrl:
              'https://file-examples.com/wp-content/storage/2017/02/file-sample_1MB.doc',
          });
        }

        // if (currentUri !== initialUri) {
        //   changedDocuments[doc.label] = doc.image;
        // }
      });
    });

    console.log('changedDocuments,', JSON.stringify(changedDocuments));
    this.props.setDocumentDetails(changedDocuments);
    navigate(ScreenNames.AddPartnersBankDetail, {
      params: {
        fromScreen: this.state.fromScreen,
        showImages: this.state.showImages,
        errorSteps: this.state.errorSteps,
      },
    });
  };

  render() {
    const documentGroupsWithHandlers =
      DocumentUtils.getDocumentGroupsWithHandlers(
        this.state,
        this.setState.bind(this),
        this.handleUploadMedia,
        this.handleDeleteMedia,
        this.handleViewImage,
      );

    return (
      <>
        <Partner_Document_Form_Component
          documentGroups={documentGroupsWithHandlers}
          handleNextPress={this.handleNextPress}
          showImages={this.state.showImages}
          errorSteps={this.state.errorSteps}
        />
        <ImagePreviewModal
          visible={this.state.isImageViewerVisible}
          imageUri={this.state.previewImage}
          onClose={() =>
            this.setState({isImageViewerVisible: false, previewImage: null})
          }
        />
      </>
    );
  }
}

const mapDispatchToProps = {setDocumentDetails};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    isLoading: state.appState.loading,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnerRequiredDocument);
