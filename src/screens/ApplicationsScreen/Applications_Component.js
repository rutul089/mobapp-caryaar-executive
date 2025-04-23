import {
  CardWrapper,
  CommonModal,
  ImageHeader,
  PartnerCard,
  RadioButton,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getGradientColors} from '../../utils/helper';

const Applications_Component = ({
  onRightIconPress,
  applications,
  onItemPress,
  onTrackApplicationPress,
  onPressPrimaryButton,
}) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = React.useState(false);
  const [activeFilterOption, setActiveFilterOption] = React.useState('');

  const handleApplyFilter = () => {
    onPressPrimaryButton && onPressPrimaryButton(activeFilterOption);
    setActiveFilterOption('');
    setIsFilterModalVisible(false);
  };

  const handleOpenFilter = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseFilter = () => {
    setActiveFilterOption('');
    setIsFilterModalVisible(false);
  };

  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        onRightIconPress={onRightIconPress}
        hideSubHeader={false}
        hideProfileIcon
        subTittle="Applications"
        searchPlaceHolder={'Search by application number...'}
        onFilterPress={handleOpenFilter}
      />

      <FlatList
        contentContainerStyle={styles.wrapper}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        data={applications}
        renderItem={({item}) => (
          <>
            <CardWrapper
              showLeftText
              isLeftTextBold
              isStatusBold
              leftText={'849363'}
              status={item.status?.toUpperCase()}
              gradientColors={getGradientColors(item.type)}
              onPress={() => onItemPress && onItemPress(item)}>
              <PartnerCard
                name={item.name}
                subtitle={`Submitted on: ${item.phone}`}
                showPersonalInfo={false}
                isCTAShow
                callToAction={() =>
                  onTrackApplicationPress && onTrackApplicationPress(item)
                }
                buttonLabel="Track Application"
                processingTime={item.id + ' Days'}
              />
            </CardWrapper>
            <Spacing size="md" />
          </>
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        removeClippedSubviews
        windowSize={10}
      />

      <CommonModal
        isVisible={isFilterModalVisible}
        onModalHide={handleCloseFilter}
        primaryButtonLabel={'Apply'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        onPressPrimaryButton={handleApplyFilter}
        title="Filter by">
        <View style={{paddingVertical: 10}}>
          <RadioButton
            label={'Saved Vehicles'}
            selected={activeFilterOption === 'Saved'}
            onPress={() => setActiveFilterOption('Saved')}
          />
          <Spacing />
          <RadioButton
            label={'Draft Vehicles'}
            selected={activeFilterOption === 'Draft'}
            onPress={() => setActiveFilterOption('Draft')}
          />
        </View>
      </CommonModal>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
});

export default Applications_Component;
