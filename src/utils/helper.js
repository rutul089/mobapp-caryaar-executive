import moment from 'moment';
import {Alert} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import theme from '../theme';
import colors from '../theme/colors';
import {documentLabelsMap} from '../constants/enums';
import Toast from 'react-native-toast-message';

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

export const validateField = (key, value) => {
  const trimmedValue = value?.trim();

  // Regular Expressions
  const nameRegex = /^[A-Za-z\s]+$/;
  const numericRegex = /^[0-9]+(\.[0-9]+)?$/;
  const integerRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileNumberRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const accountNumberRegex = /^[0-9]{9,18}$/;

  switch (key) {
    // Company & Business Names
    case 'companyName':
    case 'businessName':
      return trimmedValue === ''
        ? 'Please enter a valid company name'
        : !nameRegex.test(trimmedValue)
        ? 'Name should contain only alphabets'
        : '';

    // Numeric only fields with optional decimal — no leading decimal
    case 'yearsInBusiness':
    case 'monthlyCarSales':
      return trimmedValue === ''
        ? `Please enter ${
            key === 'yearsInBusiness'
              ? 'number of years in business'
              : 'monthly car sales'
          }`
        : !numericRegex.test(trimmedValue) || trimmedValue.startsWith('.')
        ? `${
            key === 'yearsInBusiness'
              ? 'Years in business'
              : 'Monthly car sales'
          } must be a valid number (not starting with a decimal)`
        : '';

    // Names
    case 'fullName':
    case 'ownerName':
    case 'accountHolderName':
      return trimmedValue === ''
        ? `Please enter a valid ${
            key === 'ownerName'
              ? 'owner name'
              : key === 'fullName'
              ? 'Full Name'
              : 'account holder name'
          }`
        : !nameRegex.test(trimmedValue)
        ? 'Name should contain only alphabets'
        : '';

    // Address Fields
    case 'shopNo':
      return trimmedValue === ''
        ? 'Please enter a valid shop/office number'
        : '';
    case 'buildingName':
      return trimmedValue === '' ? 'Please enter a valid building name' : '';
    case 'street':
      return trimmedValue === '' ? 'Please enter a valid street' : '';
    case 'area':
      return trimmedValue === '' ? 'Please enter a valid area' : '';
    case 'stateName':
      return trimmedValue === '' ? 'Please select a valid State Name' : '';
    case 'businessType':
      return trimmedValue === '' ? 'Please select a valid business type' : '';
    case 'selectedSalesExec':
    case 'selectedSalesExecValue':
      return trimmedValue === '' ? 'Please select a valid Position' : '';

    // Pincode
    case 'pincode':
      return pincodeRegex.test(trimmedValue)
        ? ''
        : 'Pincode must be a 6-digit number';

    // Mobile Number
    case 'mobileNumber':
      return trimmedValue === ''
        ? 'Please enter a mobile number'
        : !mobileNumberRegex.test(trimmedValue)
        ? 'Mobile number must be a 10-digit number'
        : '';

    // Email
    case 'emailAddress':
    case 'email':
      return trimmedValue === ''
        ? 'Please enter an email address'
        : !emailRegex.test(trimmedValue)
        ? 'Please enter a valid email address'
        : '';

    // Account Number
    case 'accountNumber':
      return accountNumberRegex.test(trimmedValue)
        ? ''
        : 'Account number must be 9 to 18 digit number';

    // Bank Name
    case 'bankName':
      return trimmedValue === '' ? 'Please select a valid bank name' : '';

    // IFSC Code
    case 'ifscCode':
      return ifscRegex.test(trimmedValue)
        ? ''
        : 'Please enter a valid IFSC code (e.g., HDFC0001234)';

    default:
      return '';
  }
};

export const handleFieldChange = (component, key, value) => {
  const errorMsg = validateField(key, value);

  component.setState(prevState => {
    const updatedErrors = {
      ...prevState.errors,
      [key]: errorMsg,
    };

    const isFormValid = Object.values(updatedErrors).every(
      error => error === '',
    );

    return {
      [key]: value,
      errors: updatedErrors,
      isFormValid,
    };
  });
};

/**
 * Returns a formatted location string based on city and state.
 * If both are present, returns "City, State".
 * If only one is present, returns that one.
 * If neither is present, returns an empty string.
 *
 * @param {string} city - The name of the city.
 * @param {string} state - The name of the state.
 * @returns {string} The formatted location string.
 */
export const getLocationText = (city, state) => {
  return [city, state].filter(Boolean).join(', ');
};

/**
 * Format ISO date string into a readable format
 * @param {string} isoDate - ISO formatted date string (e.g. '2025-04-26T03:52:04.254Z')
 * @param {string} format - Desired output format (e.g. 'DD MMM YYYY, hh:mm A')
 * @returns {string} - Formatted date string
 */
export const formatDate = (isoDate, format = 'DD MMM YYYY') => {
  const date = moment(isoDate);
  return date.isValid() ? date.format(format) : '';
};

export const getPartnerAddress = d =>
  [
    // d?.shopNo && `Shop No: ${d.shopNo}`,
    d?.shopNo,
    d?.buildingName,
    d?.streetAddress,
    d?.area,
    d?.city,
    d?.state,
    d?.pincode,
  ]
    .filter(Boolean)
    .join(', ');

/**
 * Helper to find uploaded document by type
 * @param {string} type
 * @param {Array} uploadedDocs
 * @returns {Object|undefined}
 */
const findUploadedDoc = (type, uploadedDocs = []) =>
  uploadedDocs.find(doc => doc.documentType === type);

/**
 * Builds a full document list with uploaded and missing flags
 * @param {Object} partnerDetail
 * @param {Function} onPressHandler - function to call when document is clicked
 * @returns {Array}
 */
export const buildDocumentsArray = (partnerDetail, onPressHandler) => {
  const allDocTypes = Object.keys(documentLabelsMap);
  const uploadedDocs = partnerDetail?.documents || [];
  const missingDocs = partnerDetail?.missingDocuments || [];

  return allDocTypes.map(type => {
    const uploadedDoc = findUploadedDoc(type, uploadedDocs);

    return {
      label: documentLabelsMap[type],
      documentType: type,
      uploaded: !!uploadedDoc,
      isMissing: missingDocs.includes(type),
      ...uploadedDoc, // Spread all fields from uploaded doc if exists
      onPress: () => onPressHandler(type, uploadedDoc?.documentUrl),
    };
  });
};

export const getErrorMessage = error => {
  try {
    if (error?.message === 'Network Error') {
      return 'Please check your internet connection.';
    }
    const message = error?.response?.data?.message;
    if (message) {
      return message;
    } else {
      return 'Something went wrong';
    }
  } catch (err) {
    return 'Something went wrong';
  }
};

export const showToast = (
  type = 'warning',
  message = '',
  position = 'bottom',
  visibilityTime = 2000,
) => {
  Toast.show({
    type: type,
    text1: message,
    position: position,
    bottomOffset: 100,
    topOffset: 100,
    visibilityTime,
  });
};

export const showApiErrorToast = error => {
  const message = getErrorMessage(error);
  Toast.show({
    type: 'error',
    text1: message,
    position: 'bottom',
    bottomOffset: 100,
    visibilityTime: 3000,
  });
};
