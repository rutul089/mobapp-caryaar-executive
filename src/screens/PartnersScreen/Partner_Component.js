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
import React, {useEffect} from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {formatDate, getLocationText} from '../../utils/helper';

const limit = 10;

const Partner_Component = ({
  onRightIconPress,
  onFilterPress,
  onAddButtonPress,
  TAB_OPTIONS,
  onTabPress = () => {},
  partnersData,
  onItemPress,
  callToAction,
  onRefresh,
  refreshing,
}) => {
  const [activeTab, setActiveTab] = React.useState('active');
  const [filteredPartners, setFilteredPartners] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const selectedStatus = activeTab === 'active' ? 'ACTIVE' : 'PENDING';

  useEffect(() => {
    filterAndPaginate();
  }, [activeTab, partnersData, currentPage]);

  const handleTabSelection = value => {
    setActiveTab(value);
    onTabPress(value);
    setCurrentPage(1);
  };

  const filterAndPaginate = () => {
    const filtered = partnersData?.filter(
      p => p.onboardingStatus === selectedStatus,
    );
    const paginated = filtered?.slice(0, currentPage * limit);
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
          phone={item.phone ?? '-'}
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
            item?.missingDocuments?.map(doc => ({value: doc})) || []
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
      />
      <View style={styles.container}>
        <Card padding={6} cardContainerStyle={styles.tabContainer}>
          {TAB_OPTIONS.map(renderTabButton)}
        </Card>
      </View>
      <FlatList
        data={filteredPartners}
        keyExtractor={(item, index) => index}
        renderItem={renderPartner}
        initialNumToRender={5}
        contentContainerStyle={styles.listContent}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
      {/* {activeTab === TAB_OPTIONS[0] ? (
        <FlatList
          data={partnersData}
          keyExtractor={(item, index) => index}
          renderItem={renderPartner}
          initialNumToRender={5}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <ScrollView contentContainerStyle={{padding: 24}}>
          <PartnerCard
            name={'Automax Motors'}
            showPersonalInfo={false}
            subtitle={'Submitted on: 15 Jan 2025'}
            statusObject={{
              text: 'Missing Documents',
              icon: images.infoStatus,
              color: theme.colors.error,
            }}
            documentError={[
              {value: 'GST Registration'},
              {value: 'Bank Statements'},
            ]}
            isCTAShow
            buttonLabel={'Request Docs'}
            callToAction={callToAction}
          />
          <Spacing size="md" />

          <PartnerCard
            name={'Carville Motors'}
            showPersonalInfo={false}
            subtitle={'Submitted on: 15 Jan 2025'}
            statusObject={{
              text: 'All Documents Submitted',
              icon: images.successCheck,
              color: '#5FC52E',
            }}
            isCTAShow
            buttonLabel={'Send To OPS'}
            callToAction={callToAction}
          />
        </ScrollView>
      )} */}
    </SafeAreaWrapper>
  );
};

// const PartnerCard = ({name, onPress}) => (
//   <>
//     <Card padding={16} onPress={onPress}>
//       <View style={styles.row}>
//         <Text hankenGroteskMedium style={styles.partnerName}>
//           {name}
//         </Text>
//         <Image source={images.arrow_right} style={styles.arrowIcon} />
//       </View>
//       <View style={styles.infoRowGroup}>
//         <InfoRow
//           text={item.phone}
//           iconSource={images.callOutline}
//           containerStyle={styles.phoneInfo}
//         />
//         <InfoRow
//           text={item.location}
//           iconSource={images.locationPin}
//           containerStyle={styles.locationInfo}
//         />
//       </View>
//     </Card>
//     <Spacing size="md" />
//   </>
// );

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  partnerName: {
    width: '90%',
  },
  arrowIcon: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  infoRowGroup: {
    flexDirection: 'row',
    marginTop: theme.sizes.spacing.smd,
  },

  phoneInfo: {
    flex: 0.4,
  },
  locationInfo: {
    flex: 0.6,
  },

  listContent: {
    flexGrow: 1,
    padding: theme.sizes.padding,
  },
});

export default Partner_Component;
