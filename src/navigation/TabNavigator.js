// navigation/TabNavigator.js
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import {Text, images, theme} from '@caryaar/components';
import ScreenNames from '../constants/ScreenNames';
import {
  ApplicationsScreen,
  PartnersScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

const renderTabIcon = image => (
  <Image
    source={image}
    style={{height: 24, width: 24, marginBottom: 5}}
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

const TabNavigator = () => {
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
          top: 0,
          bottom: 0,
          margin: 0,
          // alignContent: 'center',
          // alignItems: 'center',
          // justifyContent: 'center',
        },
        tabBarItemStyle: {
          // padding: 0,
          // margin: 0,
        },
      }}>
      <Tab.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Home'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(focused ? images.homeSolid : images.homeOutline),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Partners}
        component={PartnersScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Partners'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(
              focused ? images.customersSolid : images.customersOutline,
            ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Applications}
        component={ApplicationsScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Applications'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(
              focused ? images.applicationSolid : images.applicationOutline,
            ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.Profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabLabel(focused, 'Profile'),
          tabBarIcon: ({focused}) =>
            renderTabIcon(
              focused ? images.customersSolid : images.customersOutline,
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
