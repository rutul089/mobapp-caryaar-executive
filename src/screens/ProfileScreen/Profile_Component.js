import {
  Card,
  ImageHeader,
  images,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import ScreenNames from '../../constants/ScreenNames';

const Profile_Component = ({
  params,
  handleMenuPress = () => {},
  onEditProfilePress,
  onRightIconPress,
}) => {
  const profileCard = () => {
    return (
      <View style={styles.profileCard}>
        <Image source={images.placeholder_image} style={styles.profilePic} />
        <View style={styles.infoSection}>
          <Text
            size={'small'}
            hankenGroteskSemiBold={true}
            color={theme.colors.primary}>
            !XX0012
          </Text>
          <Text hankenGroteskExtraBold={true} color={theme.colors.white}>
            Ghanshyam Sinha
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image source={images.locationPin} style={styles.locationStyle} />
            <Text color={theme.colors.textSecondary}>Delhi</Text>
          </View>
        </View>
      </View>
    );
  };

  const detailsCard = () => {
    return (
      <View style={styles.detailsCard}>
        {[
          {
            icon: images.businessSuitcase,
            label: 'CarYaar Designation Name',
          },
          {icon: images.user, label: 'Dealer Type'},
          {icon: images.email, label: 'ghanshyam_sinha859@gmail.com'},
          {icon: images.callOutline, label: '91448 82901'},
        ].map((item, index) => (
          <View key={index} style={styles.detailRow}>
            <Image source={item.icon} style={styles.detailIcon} />
            <Text size={'small'} color={theme.colors.white}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaWrapper hideBottom>
      <ImageHeader
        hideSubHeader
        hideProfileIcon
        onRightIconPress={onRightIconPress}
      />
      <View style={styles.header}>
        <View style={styles.wrapper1}>
          <Text size={'h2'} color={'white'} hankenGroteskBold={true}>
            Profile
          </Text>
          <Pressable onPress={onEditProfilePress}>
            <Image source={images.edit_user} style={{height: 22, width: 22}} />
          </Pressable>
        </View>
        <Spacing size="md" />
        {/* Profile Card */}
        {profileCard()}
        {/* Details Card */}
        {detailsCard()}
      </View>
      <ScrollView contentContainerStyle={styles.wrapper}>
        {/* Action Menu */}
        <View>
          {[
            {
              label: 'Manage Members',
              icon: images.icon_users,
              screenName: ScreenNames.ManageMember,
            },
            {
              label: 'Change Password',
              icon: images.icon_access,
              screenName: ScreenNames.ChangePassword,
            },
            {
              label: 'FAQs',
              icon: images.icon_help,
              screenName: ScreenNames.FAQS,
            },
            {
              label: 'Contact Support',
              icon: images.icon_support,
              screenName: ScreenNames.ContactSupport,
            },
            {
              label: 'Logout',
              icon: images.icon_logout,
              themeColor: theme.colors.error,
              hideRightArrow: true,
              screenName: ScreenNames.Logout,
            },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <Card
                onPress={() => handleMenuPress(index, item)}
                padding={15}
                noShadow={true}
                cardContainerStyle={{flexDirection: 'row'}}>
                <Image
                  source={item.icon}
                  style={[styles.menuIcon, {tintColor: item?.themeColor}]}
                />
                <Text style={{flex: 1}} color={item?.themeColor}>
                  {item.label}
                </Text>
                {!item?.hideRightArrow && (
                  <Image source={images.arrow_right} style={styles.menuIcon} />
                )}
              </Card>
              <Spacing size="smd" />
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.padding,
    paddingTop: 10,
  },
  wrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileWrapper: {
    backgroundColor: theme.colors.primaryBlack,
    padding: theme.sizes.padding,
    paddingTop: theme.sizes.spacing.md,
  },
  profileCard: {
    backgroundColor: theme.colors.gray900,
    padding: theme.sizes.spacing.smd,
    borderRadius: theme.sizes.borderRadius.card,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: theme.sizes.borderRadius.md,
    marginRight: 5,
  },
  infoSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  locationStyle: {
    height: 20,
    width: 20,
    tintColor: theme.colors.textSecondary,
    marginRight: 3,
  },
  detailsCard: {
    backgroundColor: theme.colors.gray900,
    padding: theme.sizes.spacing.smd,
    borderRadius: theme.sizes.borderRadius.card,
    marginTop: 12,
    paddingBottom: 0,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.spacing.smd,
  },
  detailIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  wrapper: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
});
export default Profile_Component;
