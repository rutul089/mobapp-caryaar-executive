/* eslint-disable react-native/no-inline-styles */
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
import {PartnerUserPosition} from '../../../constants/enums';

const Select_Partner_Role_Component = ({
  onBackPress,
  selectedRole,
  onRoleSelect,
  handleNextPress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={onBackPress} />
      <View style={styles.wrapper}>
        <Text>Who are you?</Text>
        <Spacing size="smd" />
        <View style={styles.row}>
          <OptionCard
            value={PartnerUserPosition.DEALER_PRINCIPLE}
            label={'Dealer Principle'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={selectedRole === PartnerUserPosition.DEALER_PRINCIPLE}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={PartnerUserPosition.SENIOR_MANAGEMENT}
            label={'Senior Management'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={selectedRole === PartnerUserPosition.SENIOR_MANAGEMENT}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
        </View>
        <Spacing size="md" />
        <View style={styles.row}>
          <OptionCard
            value={PartnerUserPosition.EMPLOYEE}
            label={'Employee'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={selectedRole === PartnerUserPosition.EMPLOYEE}
            isMedium
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />

          <OptionCard
            value={PartnerUserPosition.EMPLOYEE}
            label={'Employee'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={selectedRole === PartnerUserPosition.EMPLOYEE}
            isMedium
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
            containerStyle={{opacity: 0}}
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

export default Select_Partner_Role_Component;
