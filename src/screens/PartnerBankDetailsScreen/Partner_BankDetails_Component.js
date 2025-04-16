import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Button,
  GroupWrapper,
  Header,
  Input,
  RadioGroupRow,
  SafeAreaWrapper,
  Spacing,
  StepTracker,
  theme,
} from '@caryaar/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import images from '../../assets/images';
import {AccountDetailsForm} from '../../components';

const Partner_BankDetails_Component = ({
  onBackPress,
  transferModes,
  selectedTransferMode,
  onTransferModeSelect,
  onClosePress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" onBackPress={onBackPress} />
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
