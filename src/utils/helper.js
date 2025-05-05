import moment from 'moment';
import Toast from 'react-native-toast-message';
import {applicationStatus} from '../constants/enums';
import theme from '../theme';
import colors from '../theme/colors';

/**
 * Format a numeric value into Indian currency style (e.g., ₹12,34,567.89)
 * @param {string | number} value - The number to format
 * @param {boolean} [showSign=true] - Whether to prefix with ₹
 * @returns {string}
 */
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

  const formatAmount = decimalPart ? `${formatted}.${decimalPart}` : formatted;
  return showSign ? `₹${formatAmount}` : formatAmount;
};

/**
 * Remove unwanted characters from a currency input string
 * @param {string} text
 * @returns {string}
 */
export const formatAmount = text =>
  text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

/**
 * Get gradient color array based on application status
 * @param {number} status
 * @returns {string[]}
 */
export const getGradientColors = status => {
  switch (status) {
    case applicationStatus.PENDING:
      return colors.appliedGradient;
    case applicationStatus.APPROVED:
      return colors.lenderApprovedGradient;
    case applicationStatus.REJECTED:
      return colors.onHoldGradient;
    default:
      return colors.appliedGradient;
  }
};

/**
 * Return background color for given application status
 * @param {string} status
 * @returns {string}
 */
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

/**
 * Get loan gradient color based on loan status
 * @param {number} status
 * @returns {string[]}
 */
export const getGradientColorsLoan = status => {
  switch (status) {
    case 1:
      return ['#E8E8E8', '#E8E8E8'];
    case 2:
      return ['#F8A902', '#F3696E'];
    case 3:
      return ['#6EEE87', '#5FC52E'];
    case 4:
      return ['#FF5B5E', '#B60003'];
    default:
      return ['#E8E8E8', '#E8E8E8'];
  }
};

/**
 * Validate a form field by key
 * @param {string} key
 * @param {string} value
 * @returns {string} - Error message if invalid, otherwise empty string
 */
export const validateField = (key, value) => {
  const trimmedValue = value?.trim();

  const nameRegex = /^[A-Za-z\s]+$/;
  const numericRegex = /^[0-9]+(\.[0-9]+)?$/;
  const integerRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileNumberRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const accountNumberRegex = /^[0-9]{9,18}$/;

  switch (key) {
    case 'companyName':
      return trimmedValue === '' ? 'Please enter a valid company name' : '';
    case 'businessName':
      return trimmedValue === '' ? 'Please enter a valid business name' : '';

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

    case 'pincode':
      return pincodeRegex.test(trimmedValue)
        ? ''
        : 'Pincode must be a 6-digit number';

    case 'mobileNumber':
      return trimmedValue === ''
        ? 'Please enter a mobile number'
        : !mobileNumberRegex.test(trimmedValue)
        ? 'Mobile number must be a 10-digit number'
        : '';

    case 'emailAddress':
    case 'email':
      return trimmedValue === ''
        ? 'Please enter an email address'
        : !emailRegex.test(trimmedValue)
        ? 'Please enter a valid email address'
        : '';

    case 'accountNumber':
      return accountNumberRegex.test(trimmedValue)
        ? ''
        : 'Account number must be 9 to 18 digit number';

    case 'bankName':
      return trimmedValue === '' ? 'Please select a valid bank name' : '';
    case 'branchName':
      return trimmedValue === ''
        ? 'Branch name is required (Verify IFSC code)'
        : '';
    case 'ifscCode':
      return ifscRegex.test(trimmedValue)
        ? ''
        : 'Please enter a valid IFSC code (e.g., HDFC0001234)';

    default:
      return '';
  }
};

/**
 * Handle change for form fields, validate and update state
 * @param {React.Component} component
 * @param {string} key
 * @param {string} value
 */
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
 * Format location string from city and state
 * @param {string} city
 * @param {string} state
 * @returns {string}
 */
export const getLocationText = (city, state) => {
  return [city, state].filter(Boolean).join(', ');
};

/**
 * Format ISO date string
 * @param {string} isoDate
 * @param {string} [format='DD MMM YYYY']
 * @returns {string}
 */
export const formatDate = (isoDate, format = 'DD MMM YYYY') => {
  const date = moment(isoDate);
  return date.isValid() ? date.format(format) : '';
};

/**
 * Format full partner address string
 * @param {Object} d - Partner detail object
 * @returns {string}
 */
export const getPartnerAddress = d =>
  [
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
 * Parse API error object into readable message
 * @param {any} error
 * @returns {string}
 */
export const getErrorMessage = error => {
  try {
    if (error?.message === 'Network Error') {
      return 'Please check your internet connection.';
    }
    const message = error?.response?.data?.message;
    return message || 'Something went wrong';
  } catch {
    return 'Something went wrong';
  }
};

/**
 * Show toast message
 * @param {'success'|'error'|'info'|'warning'} type
 * @param {string} message
 * @param {'top'|'bottom'} [position='bottom']
 * @param {number} [visibilityTime=2000]
 */
export const showToast = (
  type = 'warning',
  message = '',
  position = 'bottom',
  visibilityTime = 2000,
) => {
  Toast.show({
    type,
    text1: message,
    position,
    bottomOffset: 100,
    topOffset: 100,
    visibilityTime,
  });
};

/**
 * Show API error toast
 * @param {any} error
 */
export const showApiErrorToast = error => {
  const message = getErrorMessage(error);
  showToast('error', message, 'bottom', 3000);
};

/**
 * Show API success toast
 * @param {Object} response
 */
export const showApiSuccessToast = response => {
  showToast('success', response?.message, 'bottom', 3000);
};

/**
 * Ensure mobile number has +91 prefix
 * @param {string} num
 * @returns {string}
 */
export const formatMobileNumber = num => {
  return num.startsWith('+91') ? num : `+91${num}`;
};

/**
 * Remove country code from phone number
 * @param {string} phoneNumber
 * @param {string} [defaultCountryCode='91']
 * @returns {string}
 */
export const removeCountryCode = (phoneNumber, defaultCountryCode = '91') => {
  if (!phoneNumber) {
    return '';
  }

  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.startsWith(defaultCountryCode)) {
    return digitsOnly.slice(defaultCountryCode.length);
  }

  if (digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1);
  }

  return digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
};

// utils/dateUtils.js

export function getRelativeTime(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const units = [
    {name: 'year', seconds: 31536000},
    {name: 'month', seconds: 2592000},
    {name: 'week', seconds: 604800},
    {name: 'day', seconds: 86400},
    {name: 'hour', seconds: 3600},
    {name: 'minute', seconds: 60},
    {name: 'second', seconds: 1},
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}
