import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Button,
  GroupWrapper,
  Header,
  Input,
  SafeAreaWrapper,
  Spacing,
  DropdownModal,
} from '@caryaar/components';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import theme from '../../theme';
import strings from '../../locales/strings';
import images from '../../assets/images';
import {StepTracker} from '../../components';

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
  const [showModal, setShowModal] = React.useState(false);

  return (
    <SafeAreaWrapper>
      <Header title="Partner Details" onBackPress={onBackPress} />
      {/* <StepTracker errorSteps={[]} /> */}
      {/* <StepTracker showImages={[]} errorSteps={[]} selectedId={1} /> */}
      <StepTracker showImages={[1, 2, 3, 4]} errorSteps={[]} />
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <GroupWrapper title="Basic Detail">
          <Input
            label="Business Name"
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
          />
          <Spacing size="md" />
          <Input
            label="Business Type"
            isRightIconVisible
            isAsDropdown
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            onPress={() => setShowModal(true)}
            value={businessType}
            placeholder="Select"
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.businessSuitcase}
                label="Years in Business"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.businessSuitcase}
                label="Monthly Car Sales"
                keyboardType="decimal-pad"
                returnKeyType="next"
              />
            </View>
          </View>
        </GroupWrapper>
        <Spacing size="lg" />
        <GroupWrapper title="Contact Detail">
          <Input
            label="Owner Name"
            isLeftIconVisible
            leftIconName={images.user}
          />
          <Spacing size="md" />
          <Input
            label="Mobile Number"
            isLeftIconVisible
            leftIconName={images.callOutline}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Spacing size="md" />
          <Input
            label="Email"
            isLeftIconVisible
            leftIconName={images.email}
            keyboardType="email-address"
          />
        </GroupWrapper>
        <Spacing size="xl" />
        <Button label={strings.next} onPress={handleNextPress} />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={dropdownOptions}
        selectedItem={businessType}
        onSelect={(item, index) => {
          onSelectBusinessType && onSelectBusinessType(item, index);
        }}
        onClose={() => setShowModal(false)}
        title="Select Business Type"
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
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.sm,
    // gap: 12,
  },
  flex: {
    flex: 1,
  },
  halfWidth: {
    width: '47%',
  },
});

export default Partner_Basic_Details_Component;
