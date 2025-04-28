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
import {dealershipType} from '../../../constants/enums';
import {goBack} from '../../../navigation/NavigationUtils';

const Dealership_Type_Selection_Component = ({
  onBackPress,
  selectedDealershipType,
  onDealerShipType,
  handleNextPress,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={() => goBack()} />
      <View style={styles.wrapper}>
        <Text>Choose the dealership type</Text>
        <Spacing size="smd" />
        <View style={styles.row}>
          <OptionCard
            value={dealershipType.OEM}
            label={'OEM Dealer'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={selectedDealershipType === dealershipType.OEM}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={dealershipType.MULTI_BRAND}
            label={'Multi-Brand Dealer'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={selectedDealershipType === dealershipType.MULTI_BRAND}
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
        </View>
        <Spacing size="md" />
        <View style={styles.row}>
          <OptionCard
            value={dealershipType.DSA}
            label={'DSA'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={selectedDealershipType === dealershipType.DSA}
            isMedium
            textProps={{
              size: 'small',
              hankenGroteskMedium: true,
            }}
          />
          <OptionCard
            value={dealershipType.BROKER}
            label={'Broker'}
            icon={images.userCircle}
            onSelect={onDealerShipType}
            isSelected={selectedDealershipType === dealershipType.BROKER}
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
