import React, {Component} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Partner_Document_Form_Component from './Partner_Document_Form_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';
import DocumentUtils from '../../../utils/DocumentUtils';
import {ImagePreviewModal} from '../../../components';

export default class AddPartnerRequiredDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentGroups: [],
      initialDocuments: {},
      previewImage: null,
      isImageViewerVisible: false,
    };
  }

  componentDidMount() {
    this.fetchDocumentDataFromAPI();
  }
  fetchDocumentDataFromAPI = () => {
    const apiResponse = {
      documents: {
        GST: 'https://file-examples.com/wp-content/storage/2017/02/file-sample_1MB.doc',
        'Shop License':
          'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        'PAN Card':
          'https://votercardprint.com/image/cache/catalog/pan-card-print-500x500.jpg',
        'Aadhar Card Front':
          'https://4.imimg.com/data4/TB/KH/MY-1817237/pre-printed-aadhar-card-1000x1000.jpg',
        'Aadhar Card Back':
          'https://4.imimg.com/data4/TB/KH/MY-1817237/pre-printed-aadhar-card-1000x1000.jpg',
        Photograph: null,
        'Bank Statement': null,
        'Cancelled Cheque': null,
      },
    };

    const groups = [
      {
        title: 'Business Documents',
        documents: [
          {label: 'GST'},
          {label: 'Shop License'},
          {label: 'PAN Card'},
        ],
      },
      {
        title: 'Personal Documents',
        documents: [
          {label: 'Aadhar Card Front'},
          {label: 'Aadhar Card Back'},
          {label: 'Photograph'},
        ],
      },
      {
        title: 'Bank Documents',
        documents: [{label: 'Bank Statement'}, {label: 'Cancelled Cheque'}],
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
    const changedDocuments = {};

    this.state.documentGroups.forEach(group => {
      group.documents.forEach(doc => {
        const initialUri = this.state.initialDocuments[doc.label] || null;
        const currentUri = doc.image ? doc.image.uri : null;

        if (currentUri !== initialUri) {
          changedDocuments[doc.label] = doc.image;
        }
      });
    });

    console.log('Changed Documents with details:', changedDocuments);
    navigate(ScreenNames.AddPartnersBankDetail);
    return changedDocuments;
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
