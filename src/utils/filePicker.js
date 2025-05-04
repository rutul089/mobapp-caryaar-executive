// utils/filePicker.js
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {pick, types} from '@react-native-documents/picker';

export const pickImage = async (fromCamera = false) => {
  const options = {
    mediaType: 'photo',
    quality: 1,
  };

  return new Promise((resolve, reject) => {
    const picker = fromCamera ? launchCamera : launchImageLibrary;
    picker(options, response => {
      if (response.didCancel) {
        resolve(null);
      } else if (response.errorMessage) {
        reject(response.errorMessage);
      } else {
        const asset = response.assets?.[0];
        resolve(asset);
      }
    });
  });
};

// export const pickDocument = async () => {
//   try {
//     const res = await DocumentPicker.pickSingle({
//       type: [DocumentPicker.types.allFiles],
//     });

//     return res;
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       return null;
//     }
//     throw err;
//   }
// };

export const pickDocument = async () => {
  try {
    const res = await pick({
      allowMultiSelection: false,
      // type: ['*/*'], // for all files
      type: [types.pdf, types.docx, types.images],
    });

    return res[0]; // since multi-selection is false, we only get one item
  } catch (err) {
    if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
      return null;
    }
    throw err;
  }
};

/**
 * Show file picker based on user selection: Camera, Gallery, or Documents
 * @param {('camera'|'gallery'|'document')} type - Type of picker to open
 * @param {(file: object | null) => void} callback - Callback with selected file or null
 */
export const handleFileSelection = async (type, callback) => {
  try {
    if (type === 'camera') {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
      });

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
        // type: ['*/*'], // for all files
        type: [types.pdf, types.images],
      });

      callback(res[0]);
    }
  } catch (err) {
    if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
      callback(null);
    }
    callback(null);
  }
};
