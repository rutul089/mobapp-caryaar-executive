import React from 'react';
import {StyleSheet, View} from 'react-native';
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
import {DealershipType} from '../../../constants/enums';

const Dealership_Type_Selection_Component = ({
  onBackPress,
  selectedDealershipType,
  onDealerShipType,
  handleNextPress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={onBackPress} />
      <View style={styles.wrapper}>
        <Text>Choose the dealership type</Text>
        <Spacing size="smd" />
        <View style={styles.row}>
          <OptionCard
            value={DealershipType.OEM_DEALER}
            label={'OEM Dealer'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={selectedDealershipType === DealershipType.OEM_DEALER}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={DealershipType.MULTI_BRAND_DEALER}
            label={'Multi-Brand Dealer'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={
              selectedDealershipType === DealershipType.MULTI_BRAND_DEALER
            }
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
        </View>
        <Spacing size="md" />
        <View style={styles.row}>
          <OptionCard
            value={DealershipType.DSA}
            label={'DSA'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={selectedDealershipType === DealershipType.DSA}
            isMedium
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={DealershipType.BROKER}
            label={'Broker'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={selectedDealershipType === DealershipType.BROKER}
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

export default Dealership_Type_Selection_Component;
