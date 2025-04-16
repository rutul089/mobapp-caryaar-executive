import {
  SafeAreaWrapper,
  StepTracker,
  Header,
  AccountDetailsForm,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import theme from '../../../theme';
import {goBack} from '../../../navigation/NavigationUtils';

const Partner_Bank_Detail_Component = ({
  transferModes,
  selectedTransferMode,
  onTransferModeSelect,
  handleSubmitPress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={() => goBack()} />
      <StepTracker selectedId={4} showImages={[1, 2, 3]} />
      <AccountDetailsForm
        transferModes={transferModes}
        selectedTransferMode={selectedTransferMode}
        onTransferModeSelect={onTransferModeSelect}
        buttonName={'Submit'}
        onButtonPress={handleSubmitPress}
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
});

export default Partner_Bank_Detail_Component;
