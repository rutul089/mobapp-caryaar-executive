import {
  Button,
  Card,
  CommonModal,
  Header,
  Input,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  images,
  theme,
} from '@caryaar/components';
import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {goBack} from '../../../navigation/NavigationUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const mockAddresses = [
  {id: '1', label: 'Junior Sales Executive', value: 'junior'},
  {id: '2', label: 'Senior Sales Executive', value: 'senior'},
  {id: '3', label: 'Regional Sales Manager', value: 'regional_manager'},
  {id: '4', label: 'National Sales Director', value: 'national_director'},
  {id: '5', label: 'International Sales Head', value: 'intl_head'},
];

const Manage_Members_Component = ({
  handleAddNewMemberPress,
  handleDeleteMemberPress,
  memberList,
  isVisible,
  onCloseVerifyOTP,
  onModalHide,
  onPressPrimaryButton,
  fullName,
  mobileNumber,
  onChangeFullName,
  onChangeMobileNumber,
  selectedSalesExec,
  setSelectedSalesExec = () => {},
  salesExecOptions,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const renderItem = ({item, index}) => (
    <>
      <Card cardContainerStyle={styles.cardWrapper} padding={12}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <View style={styles.textWrapper}>
          <Text>{item.name}</Text>
          <Text size={'small'} color={theme.colors.textSecondary}>
            {item.phone}
          </Text>
        </View>
        <Pressable
          onPress={() =>
            handleDeleteMemberPress && handleDeleteMemberPress(item, index)
          }>
          <Image source={images.icon_delete} style={styles.deleteIcon} />
        </Pressable>
      </Card>
      <Spacing size="md" />
    </>
  );
  return (
    <SafeAreaWrapper>
      <Header title="Manage Members" onBackPress={() => goBack()} />
      <FlatList
        bounces={false}
        data={memberList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.wrapper}
        ListFooterComponent={
          <>
            <Spacing size="xl" />
            <Button
              label={'Add New Member'}
              onPress={handleAddNewMemberPress}
            />
          </>
        }
      />
      <CommonModal
        isVisible={isVisible}
        onModalHide={onModalHide}
        primaryButtonLabel={'Send Invite'}
        isScrollableContent={true}
        isPrimaryButtonVisible={true}
        modalHeight={'75%'}
        onPressPrimaryButton={onPressPrimaryButton}
        title="Add New Member">
        <View
          enableOnAndroid={true}
          extraScrollHeight={0}
          extraHeight={0}
          keyboardVerticalOffset={0}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingVertical: 15}}>
          <Input
            label="Full Name"
            value={fullName}
            onChangeText={onChangeFullName}
            onFocus={() => {
              setShowDropdown(false);
            }}
          />
          <Spacing size="lg" />
          <Input
            label="Mobile Number"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={onChangeMobileNumber}
            maxLength={10}
            onFocus={() => {
              setShowDropdown(false);
            }}
          />
          <Spacing size="lg" />
          <Input
            label="Select Sales Executive Position"
            keyboardType="default"
            isRightIconVisible
            isAsDropdown
            onPress={() => setShowDropdown(!showDropdown)}
            value={selectedSalesExec}
          />
          {salesExecOptions?.length > 0 && showDropdown && (
            <View style={styles.dropdown}>
              <FlatList
                data={salesExecOptions}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => (
                  <Pressable
                    style={[
                      styles.item,
                      {
                        borderBottomWidth:
                          index === salesExecOptions.length - 1 ? 0 : 1,
                      },
                    ]}
                    onPress={() => {
                      setShowDropdown(false);
                      setSelectedSalesExec(item);
                    }}>
                    <Text
                      hankenGroteskSemiBold={selectedSalesExec === item?.label}
                      size="small"
                      lineHeight="small">
                      {item?.label}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          )}
          <Spacing size="lg" />
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
  cardWrapper: {flexDirection: 'row', alignItems: 'center'},
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  deleteIcon: {
    height: 24,
    width: 24,
  },
  textWrapper: {flex: 1, marginHorizontal: 12},
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 2,
    maxHeight: 200,
    backgroundColor: '#fff',
  },
  item: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default Manage_Members_Component;
