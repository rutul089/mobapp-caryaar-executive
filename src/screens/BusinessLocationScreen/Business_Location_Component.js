import {
  Header,
  LocationDetailsForm,
  SafeAreaWrapper,
  StepTracker,
  theme,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';

import {goBack} from '../../navigation/NavigationUtils';

const Business_Location_Component = ({params, handleNextPress}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" onBackPress={() => goBack()} />
      <StepTracker showImages={[1, 2, 3, 4]} errorSteps={[]} />
      <LocationDetailsForm
        contentContainerStyle={styles.wrapper}
        handleNextPress={handleNextPress}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
});

export default Business_Location_Component;
