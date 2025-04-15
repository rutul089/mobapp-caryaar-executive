import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Input,
  Button,
  Spacing,
  GroupWrapper,
  Text,
  images,
  theme,
} from '@caryaar/components';

const LocationDetailsForm = ({
  companyName,
  shopNo,
  buildingName,
  street,
  area,
  state,
  pincode,
  onChangeCompanyName,
  onChangeShopNo,
  onChangeBuildingName,
  onChangeStreet,
  onChangeArea,
  onChangeState,
  onChangePincode,
  onGoogleMapPress,
  handleNextPress,
  contentContainerStyle,
}) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={contentContainerStyle}>
      <GroupWrapper title="Location Details">
        <Input
          label="Company Name"
          leftIconName={images.corporate}
          isLeftIconVisible
          value={companyName}
          onChangeText={onChangeCompanyName}
        />
        <Spacing size="md" />
        <Input
          label="Shop/Office No."
          leftIconName={images.corporate}
          isLeftIconVisible
          value={shopNo}
          onChangeText={onChangeShopNo}
        />
        <Spacing size="md" />
        <Input
          label="Building Name"
          leftIconName={images.corporate}
          isLeftIconVisible
          value={buildingName}
          onChangeText={onChangeBuildingName}
        />
        <Spacing size="md" />
        <Input
          label="Street"
          leftIconName={images.locationPin}
          isLeftIconVisible
          value={street}
          onChangeText={onChangeStreet}
        />
        <Spacing size="md" />
        <Input
          label="Area"
          leftIconName={images.locationPin}
          isLeftIconVisible
          value={area}
          onChangeText={onChangeArea}
        />
        <Spacing size="md" />
        <Input
          label="State"
          leftIconName={images.locationPin}
          isLeftIconVisible
          isAsDropdown
          isRightIconVisible
          value={state}
          onPress={onChangeState}
        />
        <Spacing size="md" />
        <Input
          label="Pincode"
          leftIconName={images.locationPin}
          isLeftIconVisible
          value={pincode}
          onChangeText={onChangePincode}
          rightLabel="Darjeeling"
        />
        <Spacing size="md" />

        <Text type="label">Google Map Location</Text>
        <View style={styles.mapContainer} onTouchEnd={onGoogleMapPress} />
      </GroupWrapper>

      <Spacing size="xl" />
      <Button label={'Next'} onPress={handleNextPress} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
  },
  mapContainer: {
    marginTop: 8,
    backgroundColor: theme.colors.saveGradient[0],
    height: 125,
    borderRadius: 20,
  },
});

export default LocationDetailsForm;
