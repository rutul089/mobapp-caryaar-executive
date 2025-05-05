/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  CardWrapper,
  CommonModal,
  ImageHeader,
  PartnerCard,
  RadioButton,
  SafeAreaWrapper,
  Spacing,
  theme,
  Text,
} from '@caryaar/components';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {formatDate, getGradientColors} from '../../utils/helper';
import {Loader, NoDataFound} from '../../components';

const Applications_Component = ({
  onRightIconPress,
  applications,
  onItemPress,
  onTrackApplicationPress,
  onPressPrimaryButton,
  loading,
  refreshing,
  onRefresh,
  onEndReached,
  loadingMore,
  onSearchText,
  searchText,
  clearSearch,
  setSearch,
  currentPage,
  totalPages,
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
        onChangeText={onSearchText}
        value={searchText}
        onCancelIconPress={clearSearch}
        onSubmitEditing={setSearch}
      />

      <FlatList
        contentContainerStyle={styles.wrapper}
        keyExtractor={(_, index) => index.toString()}
        data={applications}
        renderItem={({item}) => (
          <>
            <CardWrapper
              showLeftText
              isLeftTextBold
              isStatusBold
              leftText={item?.loanApplicationId}
              status={item.status?.toUpperCase()}
              gradientColors={getGradientColors(item.status)}
              onPress={() => onItemPress && onItemPress(item)}>
              <PartnerCard
                name={item?.partner?.businessName}
                subtitle={`Submitted on: ${formatDate(item.createdAt)}`}
                showPersonalInfo={false}
                isCTAShow
                callToAction={() =>
                  onTrackApplicationPress && onTrackApplicationPress(item)
                }
                buttonLabel="Track Application"
                processingTime={item?.ProcessingTime}
              />
            </CardWrapper>
            <Spacing size="md" />
          </>
        )}
        showsVerticalScrollIndicator={false}
        windowSize={10}
        ListEmptyComponent={
          !loading && <NoDataFound text="No Application Found" />
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (loadingMore) {
            return <ActivityIndicator style={{marginVertical: 16}} />;
          }

          if (!loading && currentPage >= totalPages && totalPages > 1) {
            return (
              <Text
                type={'helper-text'}
                style={{
                  alignSelf: 'center',
                }}>
                You have reached the end. All Applications are loaded.
              </Text>
            );
          }

          return null;
        }}
        // ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />

      <CommonModal
        isVisible={isFilterModalVisible}
        onModalHide={handleCloseFilter}
        primaryButtonLabel={'Apply'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        onPressPrimaryButton={handleApplyFilter}
        isTextCenter={false}
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
      {loading && <Loader visible={loading} />}
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
