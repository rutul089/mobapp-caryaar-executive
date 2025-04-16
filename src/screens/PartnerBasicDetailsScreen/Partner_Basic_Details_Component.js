import {Header, SafeAreaWrapper} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BasicDetailsForm, StepTracker} from '../../components';
import theme from '../../theme';

const dropdownOptions = [
  {label: 'Corporate', value: 'a'},
  {label: 'Salaried', value: 'b'},
  {label: 'Self-Employed', value: 'c'},
  {label: 'Business Owner', value: 'c'},
  {label: 'Freelancer', value: 'c'},
  {label: 'Consultant', value: 'c'},
  {label: 'Retired', value: 'c'},
  {label: 'Unemployed', value: 'c'},
];

const Partner_Basic_Details_Component = ({
  onBackPress,
  handleNextPress,
  onSelectBusinessType,
  businessType,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" onBackPress={onBackPress} />
      <StepTracker showImages={[1, 2, 3, 4]} errorSteps={[]} />
      <BasicDetailsForm
        onSelectBusinessType={onSelectBusinessType}
        businessType={businessType}
        dropdownOptions={dropdownOptions}
        handleNextPress={handleNextPress}
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

export default Partner_Basic_Details_Component;
