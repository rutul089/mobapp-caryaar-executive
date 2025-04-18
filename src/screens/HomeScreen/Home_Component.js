/* eslint-disable react-native/no-inline-styles */
import {
  Card,
  ImageHeader,
  images,
  InfoRow,
  Pressable,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
} from '@caryaar/components';
import React from 'react';
import {FlatList, Image, View} from 'react-native';
import {styles} from '../../styles/Home.style';
import {navigateToTab} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

const data = Array.from({length: 12}, (_, index) => ({
  id: index + 1,
  label: `Item ${index + 1}`,
}));

const Home_Component = ({onRightIconPress, onAddPartner}) => {
  const renderBox = (count, countColor, label, onPress) => {
    return (
      <Pressable style={styles.statBox} onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            lineHeight={'h2'}
            size={'h2'}
            style={{flex: 1}}
            hankenGroteskExtraBold={true}
            color={countColor}>
            {count}
          </Text>
          <Image
            source={images.arrow_right}
            style={{marginLeft: 6, height: 20, width: 20}}
          />
        </View>

        <Text
          size={'small'}
          lineHeight={'small'}
          hankenGroteskMedium={true}
          color={theme.colors.textLabel}>
          {label}
        </Text>
      </Pressable>
    );
  };

  const renderItem = ({item}) => {
    return (
      <Card
        row
        cardContainerStyle={{
          alignItems: 'center',
          marginBottom: 12,
          gap: 13,
        }}>
        <Image
          source={images.placeholder_image}
          style={{height: 42, width: 42, borderRadius: 20}}
        />
        <View style={{flex: 1}}>
          <Text hankenGroteskMedium={true}>Super Cars + {item.label} </Text>
          <Spacing size={3} />
          <Text type={'helper-text'}>12 application this month</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Image source={images.down_trend} style={{height: 20, width: 20}} />
          <Text
            lineHeight={'small'}
            size={'small'}
            hankenGroteskMedium={true}
            color={'#B60003'}>
            85%
          </Text>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaWrapper hideBottom>
      <View style={styles.wrapper}>
        <ImageHeader
          onRightIconPress={onRightIconPress}
          hideSubHeader={true}
          hideProfileIcon
        />
        <View style={styles.header}>
          {/* User data */}
          <View style={styles.profileRow}>
            <Text
              hankenGroteskBold={true}
              color={'white'}
              style={{width: '80%'}}>
              CarYaar Sales
            </Text>
            <Text
              style={{width: '20%'}}
              hankenGroteskBold={true}
              textAlign={'right'}
              color={theme.colors.textLabel}
              size={theme.typography.fontSizes.small}>
              XX0012
            </Text>
          </View>
          <View style={styles.statsContainer}>
            {renderBox(1211, '#F8A902', 'Active Partners', () =>
              navigateToTab(ScreenNames.Partners),
            )}
            {renderBox(3, '#6EEE87', 'Pending Approvals', () =>
              navigateToTab(ScreenNames.Applications),
            )}
            {renderBox(2, '#696EFF', 'Loan Approved', () =>
              navigateToTab(ScreenNames.Applications),
            )}
          </View>
        </View>
        <FlatList
          bounces={false}
          contentContainerStyle={styles.flatListStyle}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 16,
              }}>
              <Text type={'h4'} hankenGroteskSemiBold={true} lineHeight={24}>
                Partner Performance
              </Text>
              <Pressable onPress={onAddPartner}>
                <InfoRow
                  iconSource={images.plus_icon}
                  text="ADD NEW"
                  textColor={theme.colors.primary}
                  textStyle={{
                    ...theme.typography.fontStyles.hankenGroteskBold,
                  }}
                />
              </Pressable>
            </View>
          }
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaWrapper>
  );
};
export default Home_Component;
