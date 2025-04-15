import React from 'react';
import {Text, View} from 'react-native';
import {
  Header,
  SafeAreaWrapper,
  StepTracker,
  AccountDetailsForm,
} from '../../../components';

const Partner_Bank_Detail_Component = ({
  transferModes,
  selectedTransferMode,
  onTransferModeSelect,
  handleSubmitPress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" />
      <StepTracker selectedId={4} showImages={[1, 2, 3]} />
      <AccountDetailsForm
        transferModes={transferModes}
        selectedTransferMode={selectedTransferMode}
        onTransferModeSelect={onTransferModeSelect}
        buttonName={'Submit'}
        onButtonPress={handleSubmitPress}
      />
    </SafeAreaWrapper>
  );
};

export default Partner_Bank_Detail_Component;
