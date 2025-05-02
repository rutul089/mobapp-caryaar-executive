/* eslint-disable react-native/no-inline-styles */
// navigation/TabNavigator.js
import React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, images, theme} from '@caryaar/components';
import ScreenNames from '../constants/ScreenNames';
import {
  ApplicationsScreen,
  PartnersScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

const renderTabIcon = (image, source) => (
  <Image
    source={source || image}
    style={{height: 24, width: 24, marginBottom: 5, borderRadius: 12}}
    resizeMode="contain"
  />
);

const renderTabLabel = (focused, label) => (
  <Text
    color={focused ? theme.colors.textPrimary : theme.colors.textLabel}
    size={theme.typography.fontSizes.caption}
    hankenGroteskBold={focused}>
    {label}
  </Text>
);

const createTabOptions = (label, activeIcon, inactiveIcon) => ({
  tabBarLabel: ({focused}) => renderTabLabel(focused, label),
  tabBarIcon: ({focused}) => renderTabIcon(focused ? activeIcon : inactiveIcon),
});

const TabNavigator = ({avatar}) => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.Home}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          borderTopWidth: 2,
          borderTopColor: 'rgba(0, 0, 0, 0.08)',
          backgroundColor: 'white',
          minHeight: 60,
          maxHeight: 90,
        },
        tabBarItemStyle: {},
      }}>
      <Tab.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={createTabOptions('Home', images.homeSolid, images.homeOutline)}
      />
      <Tab.Screen
        name={ScreenNames.Partners}
        component={PartnersScreen}
        options={createTabOptions(
          'Partners',
          images.customersSolid,
          images.customersOutline,
        )}
      />
      <Tab.Screen
        name={ScreenNames.Applications}
        component={ApplicationsScreen}
        options={createTabOptions(
          'Applications',
          images.applicationSolid,
          images.applicationOutline,
        )}
      />
      <Tab.Screen
        name={ScreenNames.Profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Profile'),
          tabBarIcon: ({focused}) =>
            avatar
              ? renderTabIcon(focused ? {uri: avatar} : {uri: avatar}, null)
              : renderTabIcon(
                  focused ? images.customersSolid : images.customersOutline,
                ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = ({user}) => ({
  avatar: user?.userProfile?.avatar,
});

export default connect(mapStateToProps)(TabNavigator);
