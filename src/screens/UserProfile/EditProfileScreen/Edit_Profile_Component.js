import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Card,
  Header,
  images,
  Input,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import {goBack} from '../../../navigation/NavigationUtils';

const Edit_Profile_Component = ({
  handleSavePress,
  state,
  onFullNameChange,
  onEmailChange,
  onMobileChange,
  onSalesPositionSelection,
}) => {
  const profileCard = () => {
    return (
      <View style={styles.profileCard}>
        <Pressable>
          <Image source={images.edit_profile} style={styles.iconImage} />
        </Pressable>
        <Image source={images.placeholder_image} style={styles.profilePic} />
        <Pressable>
          <Image source={images.ic_delete} style={styles.iconImage} />
        </Pressable>
      </View>
    );
  };

  const refs = {
    fullName: useRef(null),
    email: useRef(null),
    mobileNumber: useRef(null),
    salesExecutivePosition: useRef(null),
  };

  const focusNext = key => {
    refs[key]?.current?.focus();
  };

  return (
    <SafeAreaWrapper>
      <Header title={'Edit Profile'} onBackPress={() => goBack()} />
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.wrapper}>
        <View style={styles.profileWrapper}>{profileCard()}</View>
        <View style={{padding: theme.sizes.padding}}>
          <Text>Personal Details</Text>
          <Spacing size="smd" />
          <Card>
            <Input
              ref={refs.fullName}
              label="Full Name"
              leftIconName={images.user}
              isLeftIconVisible
              value={state.name}
              onChangeText={onFullNameChange}
              returnKeyType="next"
              onSubmitEditing={() => focusNext('email')}
            />
            <Spacing size="smd" />
            <Input
              ref={refs.email}
              label="Email Address"
              leftIconName={images.email}
              isLeftIconVisible
              value={state.email}
              onChangeText={onEmailChange}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => focusNext('mobileNumber')}
            />
            <Spacing size="smd" />
            <Input
              ref={refs.mobileNumber}
              label="Mobile Number"
              leftIconName={images.callOutline}
              isLeftIconVisible
              value={state.mobileNumber}
              onChangeText={onMobileChange}
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={() => focusNext('salesExecutivePosition')}
            />
            <Spacing size="smd" />
            <Input
              ref={refs.salesExecutivePosition}
              label="Sales Executive Position"
              leftIconName={images.businessSuitcase}
              isLeftIconVisible
              isAsDropdown
              isRightIconVisible
              value="Name"
            />
          </Card>
          <Spacing size="xl" />

          <Button label={'Save'} onPress={handleSavePress} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  profileWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.padding,
    paddingTop: theme.sizes.spacing.md,
  },
  profileCard: {
    backgroundColor: theme.colors.gray900,
    padding: theme.sizes.spacing.smd,
    borderRadius: theme.sizes.borderRadius.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.sizes.spacing.lg,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: theme.sizes.borderRadius.md,
  },
  iconImage: {
    height: theme.sizes.icons.lg,
    width: theme.sizes.icons.lg,
  },
});

export default Edit_Profile_Component;
