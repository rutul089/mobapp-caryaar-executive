import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Header,
  SafeAreaWrapper,
  StepTracker,
  LocationDetailsForm,
} from '../../../components';
import theme from '../../../theme';

const Partner_Location_Form_Component = ({onBackPress, handleNextPress}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={onBackPress} />
      <StepTracker selectedId={2} showImages={[1]} />
      <LocationDetailsForm
        contentContainerStyle={styles.wrapper}
        handleNextPress={handleNextPress}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
});
export default Partner_Location_Form_Component;
