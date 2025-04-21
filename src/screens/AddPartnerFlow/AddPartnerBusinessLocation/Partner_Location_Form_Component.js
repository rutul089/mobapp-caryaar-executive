import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Header,
  LocationDetailsForm,
  SafeAreaWrapper,
  StepTracker,
  theme,
} from '@caryaar/components';

const stateList = [
  {label: 'Maharashtra', value: 'maharashtra'},
  {label: 'Gujarat', value: 'gujarat'},
  {label: 'Karnataka', value: 'karnataka'},
  {label: 'Tamil Nadu', value: 'tamil_nadu'},
  {label: 'Delhi', value: 'delhi'},
  {label: 'Rajasthan', value: 'rajasthan'},
  {label: 'Madhya Pradesh', value: 'madhya_pradesh'},
  {label: 'Punjab', value: 'punjab'},
  {label: 'Uttar Pradesh', value: 'uttar_pradesh'},
  {label: 'West Bengal', value: 'west_bengal'},
];
const Partner_Location_Form_Component = ({
  onBackPress,
  handleNextPress,
  onChangeCompanyName,
  onChangeShopNo,
  onChangeBuildingName,
  onChangeStreet,
  onChangeArea,
  onChangePincode,
  onGoogleMapPress,
  restInputProps,
  onSelectState = () => {},
  stateName,
}) => {
  const formRef = React.useRef();
  // formRef.current?.focusNext('buildingName');

  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={onBackPress} />
      <StepTracker selectedId={2} showImages={[1]} />
      <LocationDetailsForm
        contentContainerStyle={styles.wrapper}
        handleNextPress={handleNextPress}
        ref={formRef}
        onChangeCompanyName={onChangeCompanyName}
        onChangeShopNo={onChangeShopNo}
        onChangeBuildingName={onChangeBuildingName}
        onChangeStreet={onChangeStreet}
        onChangeArea={onChangeArea}
        onChangePincode={onChangePincode}
        onGoogleMapPress={onGoogleMapPress}
        restInputProps={restInputProps}
        onSelectState={onSelectState}
        dropdownOptions={stateList}
        stateName={stateName}
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
