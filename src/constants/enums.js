export const vehicleType = Object.freeze({
  used: 'used',
  new: 'new',
});

export const customerCategory = Object.freeze({
  individual: 'Individual',
  corporate: 'Corporate',
});

export const gender = Object.freeze({
  male: 'male',
  female: 'female',
});

export const currentLoanOptions = Object.freeze({
  yes: 'yes',
  no: 'no',
});

export const loanType = Object.freeze({
  purchase: 1,
  refinance: 2,
  topUp: 3,
  internalBT: 4,
  externalBT: 5,
  loan: 6,
  lease: 7,
  subscribe: 8,
});

export const userType = Object.freeze({
  singleUser: 'SINGLE_USER',
  multiUser: 'MULTI_USER',
});

// enums.js

export const EVehicleStatus = {
  INVENTORY: 'inventory',
  COLLATERALIZED: 'collateralized',
  DELISTED: 'delisted',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SOLD: 'sold',
  BLACKLISTED: 'blacklisted',
  OTHER: 'other',
  AVAILABLE: 'available',
};

export const EVehicleCondition = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  AVERAGE: 'average',
  POOR: 'poor',
  NEW: 'new',
  USED: 'used',
};

export const UserRole = {
  ADMIN: 'ADMIN',
  PARTNER: 'PARTNER',
  SALES_EXECUTIVE: 'SALES_EXECUTIVE',
};

export const DealershipType = {
  OEM: 'OEM',
  MULTI_BRAND: 'MULTI_BRAND',
  DSA: 'DSA',
  BROKER: 'BROKER',
};

export const PartnerOnboardingStatus = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING',
};

export const BusinessType = {
  PVT_LTD: 'PVT_LTD',
  PROPRIETORSHIP: 'PROPRIETORSHIP',
  PARTNERSHIP: 'PARTNERSHIP',
  LLP: 'LLP',
  OTHER: 'OTHER',
};

export const PartnerUserPosition = {
  DEALER_PRINCIPLE: 'DEALER_PRINCIPLE',
  SENIOR_MANAGEMENT: 'SENIOR_MANAGEMENT',
  EMPLOYEE: 'EMPLOYEE',
};

export const PartnerDocumentType = {
  GST_REGISTRATION: 'GST_REGISTRATION',
  SHOP_LICENCE: 'SHOP_LICENCE',
  PAN_CARD: 'PAN_CARD',
  AADHAR_CARD_FRONT: 'AADHAR_CARD_FRONT',
  AADHAR_CARD_BACK: 'AADHAR_CARD_BACK',
  BANK_STATEMENT: 'BANK_STATEMENT',
  CANCELLED_CHEQUE: 'CANCELLED_CHEQUE',
};

export const SettlementPreference = {
  NEFT: 'NEFT',
  IMPS: 'IMPS',
};

export const CommonStatus = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING',
};

export const SalesExecutivePosition = {
  SALES_EXECUTIVE: 'SALES_EXECUTIVE',
  SENIOR_SALES_EXECUTIVE: 'SENIOR_SALES_EXECUTIVE',
  TEAM_LEAD: 'TEAM_LEAD',
  MANAGER: 'MANAGER',
};

export const documentLabelsMap = {
  GST_REGISTRATION: 'GST Registration',
  SHOP_LICENCE: 'Shop License',
  PAN_CARD: 'PAN Card',
  AADHAR_CARD_FRONT: 'Aadhar Card Front',
  AADHAR_CARD_BACK: 'Aadhar Card Back',
  PHOTOGRAPH: 'Photograph',
  BANK_STATEMENT: 'Bank Statement',
  CANCELLED_CHEQUE: 'Cancelled Cheque',
};

export const salesExecOptions = [
  {id: '1', label: 'Sales Executive', value: 'SALES_EXECUTIVE'},
  {id: '2', label: 'Senior Sales Executive', value: 'SENIOR_SALES_EXECUTIVE'},
  {id: '3', label: 'Team Lead', value: 'TEAM_LEAD'},
  {id: '4', label: 'Manager', value: 'MANAGER'},
];

export const SalesExecutiveValue = {
  SALES_EXECUTIVE: 'Sales Executive',
  SENIOR_SALES_EXECUTIVE: 'SENSenior Sales Executive',
  TEAM_LEAD: 'Team Lead',
  MANAGER: 'Manager',
};

/**
 * Function to get label based on the value.
 * @param {string} value - The value you want to look up (e.g., 'SALES_EXECUTIVE').
 * @returns {string} The corresponding label.
 */
export const getSalesExecutiveLabel = value => {
  return SalesExecutiveValue[value] || 'Unknown Position'; // Default to 'Unknown Position' if not found
};
