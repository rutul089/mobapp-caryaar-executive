import {StyleSheet} from 'react-native';
import theme from '../theme';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: 45,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  inputStyle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.h4,
    fontFamily: theme.typography.fonts.hankenGroteskBold,
    fontWeight: theme.typography.fontWeights.bold,
    textAlign: 'center',
  },
  labelIcon: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
    marginRight: 8,
  },
});
