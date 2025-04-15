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
import {partnerRole} from '../../../constants/enums';

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
            value={partnerRole.dealerPrinciple}
            label={'Dealer Principle'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={selectedRole === partnerRole.dealerPrinciple}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={partnerRole.seniorManagement}
            label={'Senior Management'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={selectedRole === partnerRole.seniorManagement}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
        </View>
        <Spacing size="md" />
        <View style={styles.row}>
          <OptionCard
            value={partnerRole.employee}
            label={'Employee'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={selectedRole === partnerRole.employee}
            isMedium
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />

          <OptionCard
            value={partnerRole.employee}
            label={'Employee'}
            icon={images.userCircle}
            onSelect={onRoleSelect}
            isSelected={partnerRole.employee}
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
