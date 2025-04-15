import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Input,
  Button,
  Spacing,
  GroupWrapper,
  RadioGroupRow,
  images,
  theme,
} from '@caryaar/components';

const AccountDetailsForm = ({
  accountNumber,
  accountHolderName,
  bankName,
  ifscCode,
  branchName,
  transferModes = [],
  selectedTransferMode,
  onAccountNumberChange,
  onAccountHolderNameChange,
  onBankNamePress,
  onIFSCCodeChange,
  onTransferModeSelect,
  onButtonPress,
  buttonName,
}) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
      <GroupWrapper title="Account Details">
        <Input
          label="Account Number"
          isLeftIconVisible
          leftIconName={images.bank}
          keyboardType="number-pad"
          value={accountNumber}
          onChangeText={onAccountNumberChange}
        />
        <Spacing size="md" />
        <Input
          label="Account Holder Name"
          isLeftIconVisible
          leftIconName={images.bank}
          value={accountHolderName}
          onChangeText={onAccountHolderNameChange}
        />
        <Spacing size="md" />
        <Input
          label="Bank Name"
          isLeftIconVisible
          leftIconName={images.bank}
          isAsDropdown
          isRightIconVisible
          value={bankName}
          onPress={onBankNamePress}
        />
        <Spacing size="md" />
        <Input
          label="IFSC Code"
          isLeftIconVisible
          leftIconName={images.bank}
          rightLabel={branchName}
          value={ifscCode}
          onChangeText={onIFSCCodeChange}
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
      <Button label={buttonName} onPress={onButtonPress} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
});

export default AccountDetailsForm;
