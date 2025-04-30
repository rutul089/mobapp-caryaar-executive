import {formatMobileNumber, removeCountryCode} from './helper';

export const formatPartnerDetails = (partnerDetail = {}) => {
  const {
    businessName,
    businessType,
    yearInBusiness = '',
    monthlyCarSale = '',
    companyName,
    shopNo,
    buildingName,
    streetAddress,
    area,
    state,
    pincode,
    latitude,
    longitude,
    city,
    owner: {
      name: ownerName = '',
      mobileNumber: ownerMobileNumber = '',
      email: ownerEmail = '',
    } = {},
    bankDetail: {
      accountNumber = '',
      accountHolderName = '',
      bankName = '',
      ifscCode = '',
      settlementPreference = '',
    } = {},
    sellerType,
    partnerType,
    isMultiUser,
    partnerRole,
  } = partnerDetail;

  return {
    basicDetails: {
      businessName,
      businessType,
      yearInBusiness: String(yearInBusiness),
      monthlyCarSale: String(monthlyCarSale),
      ownerName,
      ownerMobileNumber: removeCountryCode(ownerMobileNumber),
      ownerEmail,
    },
    locationDetails: {
      companyName,
      shopNo,
      buildingName,
      streetAddress,
      area,
      state,
      pincode,
      latitude,
      longitude,
      city,
    },
    bankingDetails: {
      accountNumber,
      accountHolderName,
      bankName,
      ifscCode,
      settlementPreference,
    },
    sellerType,
    partnerType,
    isMultiUser,
    partnerRole,
  };
};

export const formatPartnerPayload = (partnerForm, bankingDetails) => {
  const {
    basicDetails = {},
    locationDetails = {},
    // bankingDetails = {},
    documentDetails = [],
    isMultiUser,
    partnerType,
    partnerRole,
    sellerType,
  } = partnerForm;

  return {
    businessName: basicDetails.businessName,
    partnerType: partnerType,
    sellerType: sellerType,
    companyName: locationDetails.companyName,
    shopNo: locationDetails.shopNo,
    buildingName: locationDetails.buildingName,
    streetAddress: locationDetails.streetAddress,
    area: locationDetails.area,
    city: locationDetails.city,
    state: locationDetails.state,
    pincode: locationDetails.pincode,
    isMultiUser: isMultiUser,
    businessType: basicDetails.businessType,
    yearInBusiness: Number(basicDetails.yearInBusiness),
    monthlyCarSale: Number(basicDetails.monthlyCarSale),
    ownerName: basicDetails.ownerName,
    ownerMobileNumber: formatMobileNumber(basicDetails.ownerMobileNumber),
    ownerEmail: basicDetails.ownerEmail,
    latitude: parseFloat(locationDetails.latitude),
    longitude: parseFloat(locationDetails.longitude),
    partnerRole: partnerRole,
    bankDetail: {
      accountNumber: bankingDetails.accountNumber,
      ifscCode: bankingDetails.ifscCode,
      bankName: bankingDetails.bankName,
      accountHolderName: bankingDetails.accountHolderName,
      settlementPreference: bankingDetails.settlementPreference,
    },
    documents: documentDetails.map(doc => ({
      documentType: doc.documentType,
      documentUrl: doc.documentUrl,
    })),
  };
};
