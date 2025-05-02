// Partner_Component.js
import {
  Card,
  ImageHeader,
  PartnerCard,
  SafeAreaWrapper,
  Spacing,
  Text,
  images,
  theme,
} from '@caryaar/components';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {
  formatDate,
  getLocationText,
  removeCountryCode,
} from '../../utils/helper';
import {partnerDocumentLabelMap} from '../../constants/enums';

const limit = 10;

const Partner_Component = ({
  onRightIconPress,
  onFilterPress,
  onAddButtonPress,
  TAB_OPTIONS = ['active', 'pending'],
  onTabPress = () => {},
  partnersData,
  onItemPress,
  callToAction,
  onRefresh,
  refreshing,
  onSearchText,
  searchText,
  clearSearch,
  setSearch,
  onLoadMore,
  currentPage,
  totalPages,
}) => {
  const [activeTab, setActiveTab] = useState('active');
  const [filteredPartners, setFilteredPartners] = useState([]);

  const selectedStatus = activeTab === 'active' ? 'APPROVED' : 'PENDING';

  useEffect(() => {
    filterPartners();
  }, [activeTab, partnersData]);

  const handleTabSelection = value => {
    setActiveTab(value);
    onTabPress(value);
  };

  const filterPartners = () => {
    const dataArray = Array.isArray(partnersData) ? partnersData : [];
    console.log('dataArray', dataArray.length);
    const filtered = dataArray.filter(
      p => p?.onboardingStatus === selectedStatus,
    );

    console.log('filtered', filtered?.length);

    const paginated = filtered.slice(0, currentPage * limit);
    setFilteredPartners(paginated);
  };

  const renderPartner = ({item}) => {
    const isMissingDocs = item?.missingDocuments?.length > 0;
    const statusObject = {
      text: isMissingDocs ? 'Missing Documents' : 'All Documents Submitted',
      icon: isMissingDocs ? images.infoStatus : images.successCheck,
      color: isMissingDocs ? theme.colors.error : '#4CAF50',
    };
    return activeTab === 'active' ? (
      <>
        <PartnerCard
          name={item.companyName}
          location={getLocationText(item.city, item.state)}
          phone={removeCountryCode(item.owner?.mobileNumber) ?? '-'}
          textColor={theme.colors.textPrimary}
          onPress={() => onItemPress && onItemPress(item)}
        />
        <Spacing size="md" />
      </>
    ) : (
      <>
        <PartnerCard
          name={item?.companyName}
          showPersonalInfo={false}
          subtitle={`Submitted on: ${formatDate(item.createdAt)}`}
          statusObject={statusObject}
          documentError={
            item?.missingDocuments?.map(doc => ({
              value: partnerDocumentLabelMap[doc],
            })) || []
          }
          isCTAShow={isMissingDocs}
          buttonLabel={'Upload Docs'}
          callToAction={callToAction}
          onPress={() => onItemPress && onItemPress(item)}
        />
        <Spacing size="md" />
      </>
    );
  };

  const renderTabButton = tab => {
    const isActive = activeTab === tab;
    return (
      <Pressable
        key={tab}
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        onPress={() => handleTabSelection(tab)}>
        <Text
          hankenGroteskBold={isActive}
          color={isActive ? theme.colors.primary : theme.colors.textLabel}>
          {capitalize(tab)}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        subTittle="Partners"
        searchPlaceHolder="Search by partners name"
        hideProfileIcon
        onRightIconPress={onRightIconPress}
        onFilterPress={onFilterPress}
        showAddBtn
        onAddButtonPress={onAddButtonPress}
        onChangeText={onSearchText}
        value={searchText}
        onCancelIconPress={clearSearch}
        onSubmitEditing={setSearch}
      />
      <View style={styles.container}>
        <Card padding={6} cardContainerStyle={styles.tabContainer}>
          {TAB_OPTIONS.map(renderTabButton)}
        </Card>
      </View>
      <FlatList
        data={filteredPartners}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPartner}
        initialNumToRender={5}
        contentContainerStyle={styles.listContent}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMore}
        ListEmptyComponent={
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Image
              source={images.noData}
              style={{height: 100, width: 90, marginBottom: 15}}
              resizeMode="contain"
            />
            <Text type={'caption'} hankenGroteskMedium size={'h4'}>
              No Result Found
            </Text>
          </View>
        }
      />
    </SafeAreaWrapper>
  );
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const styles = StyleSheet.create({
  container: {
    padding: theme.sizes.padding,
    paddingBottom: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    height: 36,
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#1D95F012',
  },
  listContent: {
    flexGrow: 1,
    padding: theme.sizes.padding,
  },
});

export default Partner_Component;
