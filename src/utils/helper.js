import {Alert} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import theme from '../theme';
import colors from '../theme/colors';

export const formatIndianNumber = (value, showSign = true) => {
  const [intPart, decimalPart] = value?.toString().split('.');
  let cleaned = intPart.replace(/[^0-9]/g, '');

  if (!cleaned) {
    return '';
  }

  let lastThree = cleaned.slice(-3);
  let otherNumbers = cleaned.slice(0, -3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  let formatAmount = decimalPart ? `${formatted}.${decimalPart}` : formatted;
  return showSign ? `₹${formatAmount}` : formatAmount;
};

export const formatAmount = text => {
  // Allow only numbers and one dot
  return text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
};

export const getGradientColors = status => {
  switch (status) {
    case 1: ///Pending
      return colors.appliedGradient;
    case 2: //Approved
      return colors.lenderApprovedGradient;
    case 3: //Rejected
      return colors.onHoldGradient;
    default:
      return colors.defaultGradient;
  }
};

export const getStatusColor = status => {
  switch (status) {
    case 'SAVED':
      return '#1D95F0';
    case 'IN_PROGRESS':
      return 'rgba(243, 105, 110, 0.12)';
    case 'COMPLETED':
      return 'rgba(110, 238, 135, 0.2)';
    default:
      return theme.colors.textPrimary;
  }
};

export const isLastRow = (index, data, item) => {
  const visibleItems = data.filter(d => !d.full); // half-width items
  const totalHalf = visibleItems.length;

  const lastIndex = data.length - 1;

  // Case 1: Last item
  if (index === lastIndex) {
    return true;
  }

  // Case 2: Last two half-width items in even row
  if (!item?.full && data[index + 1] && !data[index + 1].full) {
    return index === lastIndex - 1;
  }

  // Case 3: Only one half-width item at the end
  if (!item?.full && !data[index + 1]) {
    return true;
  }

  return false;
};

export const getGradientColorsLoan = status => {
  switch (status) {
    case 1: //Draft
      return ['#E8E8E8', '#E8E8E8'];
    case 2: //Applied
      return ['#F8A902', '#F3696E'];
    case 3: //lender approved
      return ['#6EEE87', '#5FC52E'];
    case 4: //on hold
      return ['#FF5B5E', '#B60003'];
    default:
      return ['#E8E8E8', '#E8E8E8'];
  }
};

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
 * Preview an image or document from a given URL or local link.
 *
 * @param {string} fileUri - The URL or local URI of the file.
 * @param {(imageUri: string) => void} onImagePreview - Callback to show image preview.
 * @param {string} [label='file'] - The name to save the file as when downloading.
 * @param {(isProcessing: boolean) => void} [onProgressChange] - Callback for loading state.
 */
export const handleViewFilePreview = (
  fileUri,
  onImagePreview,
  label = 'file',
  onProgressChange,
) => {
  if (!fileUri) {
    Alert.alert('No file to preview');
    return;
  }

  const fileExtension = fileUri.split('.').pop().toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
    onImagePreview(fileUri);
  } else {
    const localFile = `${RNFS.DocumentDirectoryPath}/${label}.${fileExtension}`;

    onProgressChange?.(true); // start loading

    RNFS.downloadFile({fromUrl: fileUri, toFile: localFile})
      .promise.then(() => {
        FileViewer.open(localFile)
          .then(() => {
            onProgressChange?.(false); // done
          })
          .catch(error => {
            onProgressChange?.(false);
            Alert.alert('Error opening file', error.message);
          });
      })
      .catch(error => {
        onProgressChange?.(false);
        Alert.alert('Download failed', error.message);
      });
  }
};
