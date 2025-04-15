import React, {Component} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Partner_Document_Form_Component from './Partner_Document_Form_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

export default class AddPartnerRequiredDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentGroups: [],
      initialDocuments: {},
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

  handleUploadMedia = (groupTitle, label) => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];

        const newImageData = {
          uri: asset.uri,
          type: asset.type,
          fileSize: asset.fileSize,
          isLocal: true,
        };

        const updatedGroups = this.state.documentGroups.map(group => {
          if (group.title === groupTitle) {
            return {
              ...group,
              documents: group.documents.map(doc =>
                doc.label === label ? {...doc, image: newImageData} : doc,
              ),
            };
          }
          return group;
        });

        this.setState({documentGroups: updatedGroups});
      }
    });
  };

  handleDeleteMedia = (groupTitle, label) => {
    const updatedGroups = this.state.documentGroups.map(group => {
      if (group.title === groupTitle) {
        return {
          ...group,
          documents: group.documents.map(doc =>
            doc.label === label ? {...doc, image: null} : doc,
          ),
        };
      }
      return group;
    });

    this.setState({documentGroups: updatedGroups});
  };

  handleViewImage = label => {
    const foundImage = this.state.documentGroups
      .flatMap(group => group.documents)
      .find(doc => doc.label === label)?.image;
    console.log('foundImage', foundImage);
    if (foundImage) {
      this.setState({previewImage: foundImage});
    } else {
      console.log('No image found for:', label);
    }
  };

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
    const documentGroupsWithHandlers = this.state.documentGroups.map(group => ({
      ...group,
      documents: group.documents.map(doc => ({
        ...doc,
        onDeletePress: () => this.handleDeleteMedia(group.title, doc.label),
        viewImage: () => this.handleViewImage(doc.label),
        uploadMedia: () => this.handleUploadMedia(group.title, doc.label),
      })),
    }));

    return (
      <Partner_Document_Form_Component
        documentGroups={documentGroupsWithHandlers}
        handleNextPress={this.handleNextPress}
      />
    );
  }
}
