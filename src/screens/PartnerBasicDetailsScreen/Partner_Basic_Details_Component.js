import {
  BasicDetailsForm,
  Header,
  SafeAreaWrapper,
  StepTracker,
  theme,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {goBack} from '../../navigation/NavigationUtils';

const Partner_Basic_Details_Component = ({
  onBackPress,
  handleNextPress,
  onSelectBusinessType,
  businessType,
  restInputProps,
  dropdownOptions,
  onBusinessTypePress,
  onChangeBusinessName,
  onChangeYearsInBusiness,
  onChangeMonthlyCarSales,
  onChangeOwnerName,
  onChangeMobileNumber,
  onChangeEmail,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" onBackPress={() => goBack()} />
      <StepTracker showImages={[1, 2, 3, 4]} errorSteps={[3]} />
      <BasicDetailsForm
        onSelectBusinessType={onSelectBusinessType}
        businessType={businessType}
        dropdownOptions={dropdownOptions}
        handleNextPress={handleNextPress}
        onBusinessTypePress={onBusinessTypePress}
        onChangeBusinessName={onChangeBusinessName}
        onChangeYearsInBusiness={onChangeYearsInBusiness}
        onChangeMonthlyCarSales={onChangeMonthlyCarSales}
        onChangeOwnerName={onChangeOwnerName}
        onChangeMobileNumber={onChangeMobileNumber}
        onChangeEmail={onChangeEmail}
        restInputProps={restInputProps}
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
