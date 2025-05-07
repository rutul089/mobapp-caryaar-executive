import {StyleSheet} from 'react-native';
import {theme} from '@caryaar/components';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsContainer: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  statBox: {
    width: '31%',
    backgroundColor: theme.colors.gray900,
    borderRadius: theme.sizes.borderRadius.xl,
    padding: theme.sizes.spacing.smd,
  },
  header: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.padding,
    paddingBlock: theme.sizes.spacing.smd,
  },
  flatListStyle: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    paddingTop: theme.sizes.spacing.smd,
    backgroundColor: theme.colors.background,
  },
  headerWrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.sizes.padding,
    paddingBottom: theme.sizes.spacing.smd,
    backgroundColor: theme.colors.background,
  },
});
