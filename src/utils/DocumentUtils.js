import {launchImageLibrary} from 'react-native-image-picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {Alert} from 'react-native';

export default {
  handleUploadMedia: (state, setState, groupTitle, label) => {
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

        const updatedGroups = state.documentGroups.map(group => {
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

        setState({documentGroups: updatedGroups});
      }
    });
  },

  handleDeleteMedia: (state, setState, groupTitle, label) => {
    const updatedGroups = state.documentGroups.map(group => {
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

    setState({documentGroups: updatedGroups});
  },

  handleViewImage: (state, setState, label, onImageFound) => {
    const imageUri = state.initialDocuments[label];
    if (!imageUri) {
      Alert.alert('No file to preview');
      return;
    }

    const fileExtension = imageUri.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
      setState(prev => ({...prev, previewImage: imageUri}));
      onImageFound?.();
    } else {
      // For pdf/doc files — download & open
      const localFile = `${RNFS.DocumentDirectoryPath}/${label}.${fileExtension}`;

      RNFS.downloadFile({fromUrl: imageUri, toFile: localFile})
        .promise.then(() => {
          FileViewer.open(localFile)
            .then(() => {})
            .catch(error => {
              Alert.alert('Error opening file', error.message);
            });
        })
        .catch(error => {
          Alert.alert('Download failed', error.message);
        });
    }
  },

  // handleViewImage: (state, setState, label) => {
  //   const foundImage = state.documentGroups
  //     .flatMap(group => group.documents)
  //     .find(doc => doc.label === label)?.image;

  //   if (foundImage) {
  //     setState({previewImage: foundImage});
  //   } else {
  //     console.log('No image found for:', label);
  //   }
  // },

  // handleNextPress: (state, navigateToNextScreen) => {
  //   const changedDocuments = {};

  //   state.documentGroups.forEach(group => {
  //     group.documents.forEach(doc => {
  //       const initialUri = state.initialDocuments[doc.label] || null;
  //       const currentUri = doc.image ? doc.image.uri : null;

  //       if (currentUri !== initialUri) {
  //         changedDocuments[doc.label] = doc.image;
  //       }
  //     });
  //   });

  //   console.log('Changed Documents with details:', changedDocuments);
  //   navigateToNextScreen();
  //   return changedDocuments;
  // },

  handleNextPress: async (state, uploadApiFn, navigateToNextScreen) => {
    const changedDocuments = {};

    state.documentGroups.forEach(group => {
      group.documents.forEach(doc => {
        const initialUri = state.initialDocuments[doc.label] || null;
        const currentUri = doc.image ? doc.image.uri : null;

        if (currentUri !== initialUri) {
          changedDocuments[doc.label] = doc.image;
        }
      });
    });

    console.log('Changed Documents to upload:', changedDocuments);

    // If nothing changed, skip API call
    if (Object.keys(changedDocuments).length === 0) {
      console.log('No changes detected, navigating ahead.');
      navigateToNextScreen();
      return;
    }

    try {
      // Call the API function (passed in from the screen)
      const response = await uploadApiFn(changedDocuments);

      if (response.success) {
        console.log('Documents uploaded successfully');
        navigateToNextScreen();
      } else {
        console.error('Upload failed:', response.message);
        // You can handle a failure case here — alert, toast, etc.
      }
    } catch (error) {
      console.error('API error:', error);
    }
  },

  getDocumentGroupsWithHandlers: (
    state,
    setState,
    uploadFn,
    deleteFn,
    viewFn,
  ) => {
    return state.documentGroups.map(group => ({
      ...group,
      documents: group.documents.map(doc => ({
        ...doc,
        onDeletePress: () => deleteFn(group.title, doc.label),
        viewImage: () => viewFn(doc.label),
        uploadMedia: () => uploadFn(group.title, doc.label),
      })),
    }));
  },
};
