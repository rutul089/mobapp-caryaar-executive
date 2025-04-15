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
      <StepTracker />
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <GroupWrapper title="Account Details">
          <Input
            label="Account Number"
            isLeftIconVisible
            leftIconName={images.bank}
            keyboardType="number-pad"
          />
          <Spacing size="md" />
          <Input
            label="Account Holder Name"
            isLeftIconVisible
            leftIconName={images.bank}
          />
          <Spacing size="md" />
          <Input
            label="Bank Name"
            isLeftIconVisible
            leftIconName={images.bank}
            isAsDropdown
            isRightIconVisible
          />
          <Spacing size="md" />
          <Input
            label="IFSC Code"
            isLeftIconVisible
            leftIconName={images.bank}
            rightLabel="Branch Name"
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={'Settlement Preference'}
            options={transferModes}
            selectedValue={selectedTransferMode}
            onChange={onTransferModeSelect}
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button label={'Close'} onPress={onClosePress} />
      </KeyboardAwareScrollView>
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
