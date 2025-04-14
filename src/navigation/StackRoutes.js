// navigation/StackRoutes.js
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import * as Screens from '../screens';
import ScreenNames from '../constants/ScreenNames';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  detachPreviousScreen: true,
  lazy: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 220},
    },
    close: {
      animation: 'timing',
      config: {duration: 200},
    },
  },
};

const StackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.HomeTab}
      screenOptions={screenOptions}>
      <Stack.Screen
        name={ScreenNames.Splash}
        component={Screens.SplashScreen}
      />
      <Stack.Screen name={ScreenNames.Login} component={Screens.LoginScreen} />
      <Stack.Screen
        name={ScreenNames.OTP}
        component={Screens.OTPVerification}
      />
      <Stack.Screen name={ScreenNames.HomeTab} component={TabNavigator} />
      <Stack.Screen
        name={ScreenNames.Notification}
        component={Screens.NotificationScreen}
      />
      <Stack.Screen
        name={ScreenNames.PartnerDetail}
        component={Screens.PartnerDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
