import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Documents_Component from './Partner_Documents_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import DocumentUtils from '../../utils/DocumentUtils';

export default class PartnerDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentGroups: [],
      initialDocuments: {},
      previewImage: null,
    };
  }

  componentDidMount() {
    this.fetchDocumentDataFromAPI();
  }

  fetchDocumentDataFromAPI = () => {
    const apiResponse = {
      documents: {
        GST: 'https://votercardprint.com/image/cache/catalog/pan-card-print-500x500.jpg',
        'Shop License': null,
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

  // handleNextPress = () => {
  //   navigate(ScreenNames.PartnerBankDetails);
  // };

  // Bind utility handlers with this.state & this.setState
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

  handleViewImage = label =>
    DocumentUtils.handleViewImage(this.state, this.setState.bind(this), label);

  handleNextPress = () =>
    DocumentUtils.handleNextPress(
      this.state,
      this.uploadDocumentsToServer,
      () => {
        navigate(ScreenNames.PartnerBankDetails);
      },
    );

  uploadDocumentsToServer = async changedDocuments => {
    //API CALL here uncomment bellow code for the api call
    console.log('__changedDocuments__', changedDocuments);
    return {success: true, message: 'Documents uploaded'};
    // try {
    //   const formData = new FormData();
    //   Object.entries(changedDocuments).forEach(([label, image]) => {
    //     if (image && image.isLocal) {
    //       formData.append(label, {
    //         uri: image.uri,
    //         name: `${label}.jpg`,
    //         type: image.type || 'image/jpeg',
    //       });
    //     }
    //   });

    //   const response = await fetch('https://api.example.com/uploadDocuments', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData,
    //   });

    //   const result = await response.json();
    //   return result; // { success: true, message: 'Documents uploaded' }
    // } catch (error) {
    //   console.error('Upload API error:', error);
    //   return { success: false, message: 'Upload failed' };
    // }
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
        <Partner_Documents_Component
          handleNextPress={this.handleNextPress}
          documentGroups={documentGroupsWithHandlers}
        />
      </>
    );
  }
}
