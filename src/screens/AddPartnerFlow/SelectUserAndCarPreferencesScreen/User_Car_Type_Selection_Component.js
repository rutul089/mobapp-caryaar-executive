import {
  Button,
  Header,
  images,
  OptionCard,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {userType, vehicleType} from '../../../constants/enums';

const User_Car_Type_Selection_Component = ({
  onBackPress,
  selectedUserType,
  onUserTypeSelect,
  selectedCarType,
  onCarTypeSelect,
  handleNextPress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={onBackPress} />
      <View style={styles.wrapper}>
        <Text>How many users are going to use this app?</Text>
        <Spacing size="smd" />
        <View style={styles.row}>
          <OptionCard
            value={userType.singleUser}
            label={'Single User'}
            icon={images.userCircle}
            onSelect={onUserTypeSelect}
            isSelected={selectedUserType === userType.singleUser}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={userType.multiUser}
            label={'Multi User'}
            icon={images.userGroup}
            onSelect={onUserTypeSelect}
            isSelected={selectedUserType === userType.multiUser}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
        </View>
        <Spacing size="lg" />
        <Text>What type of cars do you sell?</Text>
        <Spacing size="smd" />
        <View style={styles.row}>
          <OptionCard
            value={vehicleType.new}
            label={'New Car'}
            icon={images.newVehicle}
            onSelect={onCarTypeSelect}
            isSelected={selectedCarType === vehicleType.new}
            isMedium
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={vehicleType.used}
            label={'Used Car'}
            icon={images.usedVehicle}
            onSelect={onCarTypeSelect}
            isSelected={selectedCarType === vehicleType.used}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
        </View>
        <Spacing size="xl" />
        <Button label={'Next'} onPress={handleNextPress} />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default User_Car_Type_Selection_Component;
