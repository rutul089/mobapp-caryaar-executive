import {
  AccountDetailsForm,
  Header,
  SafeAreaWrapper,
  StepTracker,
  theme,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {goBack} from '../../navigation/NavigationUtils';

const Partner_BankDetails_Component = ({
  transferModes,
  selectedTransferMode,
  onTransferModeSelect,
  onClosePress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" onBackPress={() => goBack()} />
      <StepTracker showImages={[1, 2, 3, 4]} errorSteps={[]} />
      <AccountDetailsForm
        buttonName={'Close'}
        onButtonPress={onClosePress}
        contentContainerStyle={styles.wrapper}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.sm,
    // gap: 12,
  },
  flex: {
    flex: 1,
  },
  halfWidth: {
    width: '47%',
  },
});

export default Partner_BankDetails_Component;
