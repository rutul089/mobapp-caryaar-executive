import React from 'react';
import {Text, View} from 'react-native';
import {
  Button,
  GroupWrapper,
  Header,
  SafeAreaWrapper,
  StepTracker,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import theme from '../../theme';

const Partner_Documents_Component = ({handleNextPress}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" />
      <StepTracker />
      <KeyboardAwareScrollView
        contentContainerStyle={{padding: theme.sizes.padding}}>
        <GroupWrapper title="Business Documents" />
        <Button label={'Next'} onPress={handleNextPress} />
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};
export default Partner_Documents_Component;
