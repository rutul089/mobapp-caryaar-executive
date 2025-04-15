/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  GroupWrapper,
  Header,
  Input,
  SafeAreaWrapper,
  Spacing,
  StepTracker,
  Text,
  theme,
} from '@caryaar/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import images from '../../assets/images';

const Business_Location_Component = ({params, handleNextPress}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" />
      <StepTracker />
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <GroupWrapper title="Location Details">
          <Input
            label="Company Name"
            leftIconName={images.corporate}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Shop/Office No."
            leftIconName={images.corporate}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Building Name"
            leftIconName={images.corporate}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Street"
            leftIconName={images.locationPin}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Area"
            leftIconName={images.locationPin}
            isLeftIconVisible
          />
          <Spacing size="md" />
          <Input
            label="State"
            leftIconName={images.locationPin}
            isLeftIconVisible
            isAsDropdown
            isRightIconVisible
          />
          <Spacing size="md" />
          <Input
            label="Pincode"
            leftIconName={images.locationPin}
            isLeftIconVisible
            rightLabel="Darjeeling"
          />
          <Spacing size="md" />
          <Text type="label">Google Map Location</Text>
          <View
            style={{
              marginTop: 8,
              backgroundColor: theme.colors.saveGradient[0],
              height: 125,
              borderRadius: 20,
            }}
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button label={'Next'} onPress={handleNextPress} />
      </KeyboardAwareScrollView>
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
