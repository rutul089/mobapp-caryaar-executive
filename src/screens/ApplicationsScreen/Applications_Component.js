import {
  CardWrapper,
  ImageHeader,
  PartnerCard,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {getGradientColors} from '../../utils/helper';

const Applications_Component = ({
  onRightIconPress,
  applications,
  onItemPress,
}) => {
  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        onRightIconPress={onRightIconPress}
        hideSubHeader={false}
        hideProfileIcon
        subTittle="Applications"
      />
      <FlatList
        contentContainerStyle={styles.wrapper}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={({item, index}) => (
          <>
            <CardWrapper
              showLeftText
              leftText={'849363'}
              status={item.status?.toUpperCase()}
              gradientColors={getGradientColors(item.type)}
              onPress={() => onItemPress && onItemPress(item)}>
              <PartnerCard
                name={item.name}
                subtitle={`Submitted on: ${item.phone}`}
                showPersonalInfo={false}
                isCTAShow
                callToAction={() => {}}
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
        data={applications}
      />
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
