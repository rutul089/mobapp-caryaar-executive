// colors.js

// Primary Theme Colors
export const PrimaryColors = {
  primary: '#1D95F0', // Navy Blue
  primaryLight: '#3DADFF', // Light Navy
  primaryDark: '#021F40', // Darker Navy
  primaryBlack: '#0E0F11',
};

// Accent Colors
export const SecondaryColors = {
  secondary: '#F4A900', // Yellow/Orange Accent
  secondaryLight: '#FFCF69', // Light Yellow
};

// Neutral Palette
export const NeutralColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F7FA',
  gray200: '#E1E5EA',
  gray300: '#C7CCD5',
  gray400: '#9FA6B2',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#222222',
};

// Status Colors
export const StatusColors = {
  success: '#28C76F',
  warning: '#FFA800',
  error: '#EA5455',
  info: '#00CFE8',
};

// Backgrounds & Surfaces
export const BackgroundColors = {
  background: '#F6F8FA',
  surface: '#FFFFFF',
  lightGray: '#F9F9F9',
};

// Text Colors
export const TextColors = {
  textPrimary: '#1E293B',
  textSecondary: '#828282',
  textInverse: '#FFFFFF',
  textLabel: '#828282',
  placeHolder: '#828282',
};

export const statusColor = {
  error: '#FF0000',
  success: '#5FC52E',
};

export const GradientColors = {
  authGradient: ['rgba(29, 149, 240, 0)', 'rgba(61, 173, 255, 0.48)'],
  saveGradient: ['rgba(29, 149, 240, 0.12)', 'rgba(61, 173, 255, 0.2)'],
  inProgressGradient: ['rgba(243, 105, 110, 0.12)', 'rgba(248, 169, 2, 0.2)'],
  completedGradient: ['rgba(95, 197, 46, 0.12)', 'rgba(110, 238, 135, 0.2)'],
  defaultGradient: ['#E8E8E8', '#E8E8E8'],
  draftGradient: ['#E8E8E8', '#E8E8E8'],
  appliedGradient: ['#F8A902', '#F3696E'],
  lenderApprovedGradient: ['#6EEE87', '#5FC52E'],
  onHoldGradient: ['#FF5B5E', '#B60003'],
};

// Combined Colors
const colors = {
  ...PrimaryColors,
  ...SecondaryColors,
  ...NeutralColors,
  ...StatusColors,
  ...BackgroundColors,
  ...TextColors,
  ...statusColor,
  ...GradientColors,
  inputBorder: 'rgba(0, 0, 0, 0.12)',
  yellow: '#FFE100',
  gray: '#6c6c6c',
  lightGray1: '#dfe1e0',
};

export default colors;
