import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  SafeAreaWrapper,
  BasicDetailsForm,
  Header,
  StepTracker,
} from '../../../components';
import theme from '../../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Partner_Basic_Form_Component = ({
  businessType,
  onBusinessTypePress,
  onChangeBusinessName,
  onChangeYearsInBusiness,
  onChangeMonthlyCarSales,
  onChangeOwnerName,
  onChangeMobileNumber,
  onChangeEmail,
  handleNextPress,
  dropdownOptions,
  onSelectBusinessType,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" />
      <StepTracker selectedId={1} />
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <BasicDetailsForm
          onSelectBusinessType={onSelectBusinessType}
          businessType={businessType}
          dropdownOptions={dropdownOptions}
          handleNextPress={handleNextPress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.background,
    flexGrow: 1,
    padding: theme.sizes.padding,
  },
});

export default Partner_Basic_Form_Component;
