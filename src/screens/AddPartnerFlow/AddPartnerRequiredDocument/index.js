/* eslint-disable react-native/no-inline-styles */
import {get} from 'lodash';
import React, {Component} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {connect} from 'react-redux';
// import {uploadDocumentMultipart} from '../../../api/uploadApi'; // replace with your actual API function
import {ActivityIndicator} from 'react-native';
import {
  partnerDocumentLabelMap,
  partnerDocumentType,
} from '../../../constants/enums';
import {getScreenParam, navigate} from '../../../navigation/NavigationUtils';
import {setDocumentDetails} from '../../../redux/actions';
import {showApiErrorToast, viewDocumentHelper} from '../../../utils/helper';
import Partner_Document_Form_Component from './Partner_Document_Form_Component';

import {View} from 'react-native';
import ScreenNames from '../../../constants/ScreenNames';

class AddPartnerRequiredDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: {},
      previewImage: null,
      isImageViewerVisible: false,
      showImages: [],
      errorSteps: [],
      isLoadingDocument: false,
    };
  }

  componentDidMount() {
    const {route, documentDetails, navigation} = this.props;
    const navState = getScreenParam(route, 'params', null);
    const fromScreen = get(navState, 'fromScreen', false);
    const apiDocs = get(navState, 'documents', []);

    const formattedDocs = {};

    if (fromScreen) {
      documentDetails?.forEach(doc => {
        formattedDocs[doc.documentType] = {
          uri: doc.documentUrl,
          isLocal: false,
          type: null,
          fileSize: null,
          uploadedUrl: doc.documentUrl,
        };
      });
    }

    this.setState({
      fromScreen,
      showImages: get(navState, 'showImages', []),
      errorSteps: get(navState, 'errorSteps', []),
      documents: formattedDocs,
    });

    this.blurListener = navigation.addListener('blur', () => {
      console.log('blurListener');
      this.setState({
        isImageViewerVisible: false,
        previewImage: null,
      });
    });
  }

  componentWillUnmount() {
    this.setState(
      {
        isImageViewerVisible: false,
        previewImage: null,
      },
      () => {
        const {isImageViewerVisible, previewImage} = this.state;
        console.log({isImageViewerVisible, previewImage});
      },
    );
    this.blurListener && this.blurListener(); // clean up the listener
  }

  handleViewImage = async uri => {
    if (!uri) {
      return;
    }

    // Step 1: Hide image preview first to avoid flicker overlap
    this.setState(
      {
        isImageViewerVisible: false,
        previewImage: null,
      },
      async () => {
        // Step 2: Slight delay before showing loader (optional but improves UI flow)
        setTimeout(async () => {
          this.setState({isLoadingDocument: true});

          try {
            await viewDocumentHelper(
              uri,
              imageUri => {
                // Show preview after loading completes
                this.setState({
                  previewImage: imageUri,
                  isImageViewerVisible: true,
                });
              },
              error => {
                console.warn('Error opening file:', error);
                showApiErrorToast({message: 'Could not open the document.'});
              },
            );
          } finally {
            this.setState({isLoadingDocument: false});
          }
        }, 50); // 50ms delay
      },
    );
  };

  // handleViewImage = async uri => {
  //   if (!uri) {
  //     return;
  //   }

  //   this.setState({isLoadingDocument: true}); // Start loading

  //   try {
  //     const response = await fetch(uri, {method: 'HEAD'});
  //     const contentType = response.headers.get('Content-Type') || '';
  //     const isImage = contentType.startsWith('image/');

  //     if (isImage) {
  //       this.setState({
  //         previewImage: uri,
  //         isImageViewerVisible: true,
  //         isLoadingDocument: false, // Stop loading
  //       });
  //     } else {
  //       const extension = contentType.split('/')[1] || 'pdf';
  //       const localFileName = `temp_file_${Date.now()}.${extension}`;
  //       const localPath = `${RNFS.DocumentDirectoryPath}/${localFileName}`;

  //       const downloadResult = await RNFS.downloadFile({
  //         fromUrl: uri,
  //         toFile: localPath,
  //       }).promise;

  //       if (downloadResult.statusCode === 200) {
  //         await FileViewer.open(localPath, {
  //           showOpenWithDialog: true,
  //         });
  //       } else {
  //         throw new Error('Failed to download file');
  //       }
  //     }
  //   } catch (error) {
  //     console.warn('Error opening file:', error);
  //     showApiErrorToast({message: 'Could not open the document.'});
  //   } finally {
  //     this.setState({isLoadingDocument: false}); // Always stop loading
  //   }
  // };

  handleDeleteMedia = type => {
    this.setState(prev => {
      const updated = {...prev.documents};
      delete updated[type];
      return {documents: updated};
    });
  };

  handleUploadMedia = async type => {
    try {
      const result = await launchImageLibrary({mediaType: 'mixed'});
      const asset = result.assets?.[0];

      if (!asset?.uri) {
        return;
      }

      const docObj = {
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
        isLocal: true,
        fileSize: asset.fileSize,
      };

      this.setState(
        prev => ({
          documents: {
            ...prev.documents,
            [type]: docObj,
          },
        }),
        async () => {
          return;
          try {
            const formData = new FormData();
            formData.append('file', {
              uri: docObj.uri,
              type: docObj.type,
              name: docObj.name,
            });

            const response = await uploadDocumentMultipart(formData);
            const url = response?.data?.url;

            if (url) {
              this.setState(prev => ({
                documents: {
                  ...prev.documents,
                  [type]: {
                    ...prev.documents[type],
                    uploadedUrl: url,
                  },
                },
              }));
            }
          } catch (error) {
            showApiErrorToast(error);
          }
        },
      );
    } catch (error) {
      showApiErrorToast(error);
    }
  };

  handleNextPress = () => {
    const payload = Object.keys(this.state.documents).map(key => ({
      documentType: key,
      documentUrl: this.state.documents[key].uploadedUrl,
    }));
    console.log('Final Payload:', payload);
    this.props.setDocumentDetails(payload);
    navigate(ScreenNames.AddPartnersBankDetail, {
      params: {
        fromScreen: this.state.fromScreen,
        showImages: this.state.showImages,
        errorSteps: this.state.errorSteps,
      },
    });
    // Navigate or dispatch with this payload
  };

  render() {
    const {documents, isLoadingDocument} = this.state;
    return (
      <>
        <Partner_Document_Form_Component
          showImages={this.state.showImages}
          errorSteps={this.state.errorSteps}
          handleNextPress={this.handleNextPress}
          businessDocuments={[
            {
              type: partnerDocumentType.GST_REGISTRATION,
              label: partnerDocumentLabelMap.GST_REGISTRATION,
              docObject: documents[partnerDocumentType.GST_REGISTRATION],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.GST_REGISTRATION),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.GST_REGISTRATION),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.GST_REGISTRATION]?.uri,
                ),
            },
            {
              type: partnerDocumentType.SHOP_LICENSE,
              label: partnerDocumentLabelMap.SHOP_LICENSE,
              docObject: documents[partnerDocumentType.SHOP_LICENSE],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.SHOP_LICENSE),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.SHOP_LICENSE),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.SHOP_LICENSE]?.uri,
                ),
            },
            {
              type: partnerDocumentType.PAN_CARD,
              label: partnerDocumentLabelMap.PAN_CARD,
              docObject: documents[partnerDocumentType.PAN_CARD],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.PAN_CARD),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.PAN_CARD),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.PAN_CARD]?.uri,
                ),
            },
          ]}
          otherDocuments={[
            {
              type: partnerDocumentType.AADHAR_CARD_FRONT,
              label: partnerDocumentLabelMap.AADHAR_CARD_FRONT,
              docObject: documents[partnerDocumentType.AADHAR_CARD_FRONT],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.AADHAR_CARD_FRONT),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.AADHAR_CARD_FRONT),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.AADHAR_CARD_FRONT]?.uri,
                ),
            },
            {
              type: partnerDocumentType.AADHAR_CARD_BACK,
              label: partnerDocumentLabelMap.AADHAR_CARD_BACK,
              docObject: documents[partnerDocumentType.AADHAR_CARD_BACK],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.AADHAR_CARD_BACK),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.AADHAR_CARD_BACK),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.AADHAR_CARD_BACK]?.uri,
                ),
            },
            {
              type: partnerDocumentType.PHOTOGRAPH,
              label: partnerDocumentLabelMap.PHOTOGRAPH,
              docObject: documents[partnerDocumentType.PHOTOGRAPH],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.PHOTOGRAPH),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.PHOTOGRAPH),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.PHOTOGRAPH]?.uri,
                ),
            },
          ]}
          bankDocuments={[
            {
              type: partnerDocumentType.BANK_STATEMENT,
              label: partnerDocumentLabelMap.BANK_STATEMENT,
              docObject: documents[partnerDocumentType.BANK_STATEMENT],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.BANK_STATEMENT),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.BANK_STATEMENT),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.BANK_STATEMENT]?.uri,
                ),
            },
            {
              type: partnerDocumentType.CANCELLED_CHEQUE,
              label: partnerDocumentLabelMap.CANCELLED_CHEQUE,
              docObject: documents[partnerDocumentType.CANCELLED_CHEQUE],
              onDeletePress: () =>
                this.handleDeleteMedia(partnerDocumentType.CANCELLED_CHEQUE),
              uploadMedia: () =>
                this.handleUploadMedia(partnerDocumentType.CANCELLED_CHEQUE),
              viewImage: () =>
                this.handleViewImage(
                  documents[partnerDocumentType.CANCELLED_CHEQUE]?.uri,
                ),
            },
          ]}
        />
        {isLoadingDocument && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              zIndex: 999,
              // backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
        {/* {this.state.isImageViewerVisible && this.state.previewImage && (
          <ImagePreviewModal
            visible={this.state.isImageViewerVisible}
            imageUri={this.state.previewImage}
            onClose={() =>
              this.setState({isImageViewerVisible: false, previewImage: null})
            }
          />
        )} */}
      </>
    );
  }
}

const mapDispatchToProps = {setDocumentDetails};
const mapStateToProps = ({appState, partnerForm}) => ({
  isInternetConnected: appState.isInternetConnected,
  isLoading: appState.loading,
  documentDetails: partnerForm?.documentDetails,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPartnerRequiredDocument);
