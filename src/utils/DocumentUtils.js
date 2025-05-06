import {pick, types} from '@react-native-documents/picker';
import {Alert} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {partnerDocumentLabelMap} from '../constants/enums';

/**
 * Launches a file picker based on type: camera, gallery, or document.
 *
 * @param {'camera' | 'gallery' | 'document'} type - Picker type.
 * @param {(file: object | null) => void} callback - Callback with selected file or null.
 */
export const handleFileSelection = async (type, callback) => {
  try {
    if (type === 'camera') {
      const result = await launchCamera({mediaType: 'photo', quality: 0.8});

      if (!result.didCancel && result.assets?.length > 0) {
        callback(result.assets[0]);
      } else {
        callback(null);
      }
    } else if (type === 'gallery') {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (!result.didCancel && result.assets?.length > 0) {
        callback(result.assets[0]);
      } else {
        callback(null);
      }
    } else if (type === 'document') {
      const res = await pick({
        allowMultiSelection: false,
        type: [types.pdf, types.images],
      });
      callback(res[0]);
    }
  } catch (err) {
    if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
      callback(null);
    } else {
      callback(null);
    }
  }
};

/**
 * Extracts file type from a file URI.
 *
 * @param {string} fileUri - URI of the file.
 * @returns {'image' | 'pdf' | 'doc' | null} - File type.
 */
export const getFileType = fileUri => {
  if (!fileUri) {
    return null;
  }

  const ext = fileUri.split('.').pop().toLowerCase();

  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    return 'image';
  }
  if (ext === 'pdf') {
    return 'pdf';
  }
  if (['doc', 'docx'].includes(ext)) {
    return 'doc';
  }

  return null;
};

/**
 * Finds an uploaded document from a list by type.
 *
 * @param {string} type - Document type.
 * @param {Array} uploadedDocs - Array of uploaded documents.
 * @returns {Object | undefined} - The matched document or undefined.
 */
const findUploadedDoc = (type, uploadedDocs = []) =>
  uploadedDocs.find(doc => doc.documentType === type);

/**
 * Builds the full document list for a partner.
 *
 * @param {Object} partnerDetail - Partner details with uploaded/missing documents.
 * @param {(type: string, url?: string) => void} onPressHandler - Callback when item is pressed.
 * @returns {Array} - List of document objects.
 */
export const buildDocumentsArray = (partnerDetail, onPressHandler) => {
  const allDocTypes = Object.keys(partnerDocumentLabelMap);
  const uploadedDocs = partnerDetail?.documents || [];
  const missingDocs = partnerDetail?.missingDocuments || [];

  return allDocTypes.map(type => {
    const uploadedDoc = findUploadedDoc(type, uploadedDocs);
    return {
      label: partnerDocumentLabelMap[type],
      documentType: type,
      uploaded: !!uploadedDoc,
      isMissing: missingDocs.includes(type),
      ...uploadedDoc,
      onPress: () => onPressHandler(type, uploadedDoc?.documentUrl),
    };
  });
};

/**
 * Helper to view documents or images from URI.
 *
 * @param {string} uri - The URI to the document (can be HTTP, HTTPS, or local file path).
 * @param {(uri: string) => void} [onImage] - Callback if the file is an image.
 * @param {(error: Error) => void} [onError] - Callback if an error occurs.
 * @param {() => void} [onLoading] - Callback when loading finishes.
 */
export const viewDocumentHelper = async (uri, onImage, onError, onLoading) => {
  try {
    if (
      !uri ||
      typeof uri !== 'string' ||
      !(
        uri.startsWith('http://') ||
        uri.startsWith('https://') ||
        uri.startsWith('file://') ||
        uri.startsWith(RNFS.DocumentDirectoryPath)
      )
    ) {
      throw new Error('Invalid document URI. Must be HTTP(S) or a local file.');
    }

    // Check for image
    if (uri.startsWith('http')) {
      const response = await fetch(uri, {method: 'HEAD'});
      const contentType = response.headers.get('Content-Type') || '';
      const isImage = contentType.startsWith('image/');

      if (isImage) {
        onImage?.(uri);
        return;
      }

      // Otherwise, download and open
      const extension = contentType.split('/')[1] || 'pdf';
      const localFileName = `temp_file_${Date.now()}.${extension}`;
      const localPath = `${RNFS.DocumentDirectoryPath}/${localFileName}`;

      const result = await RNFS.downloadFile({
        fromUrl: uri,
        toFile: localPath,
      }).promise;

      if (result.statusCode === 200) {
        await FileViewer.open(localPath, {showOpenWithDialog: true});
      } else {
        throw new Error('Failed to download the file.');
      }
    } else {
      // Assume it's a local file (already on device)
      await FileViewer.open(uri, {showOpenWithDialog: true});
    }
  } catch (err) {
    console.warn('Error opening file:', err);
    onError?.(err);
  } finally {
    onLoading?.();
  }
};
