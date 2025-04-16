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
import {goBack} from '../../../navigation/NavigationUtils';

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
      <Header title="Add New Partner" onBackPress={() => goBack()} />
      <StepTracker selectedId={1} />
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
    backgroundColor: theme.colors.background,
    flexGrow: 1,
    padding: theme.sizes.padding,
  },
});

export default Partner_Basic_Form_Component;
