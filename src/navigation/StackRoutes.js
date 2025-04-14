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
      <Stack.Screen
        name={ScreenNames.ApplicationDetail}
        component={Screens.ApplicationDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.ManageMember}
        component={Screens.ManageMembersScreen}
      />
      <Stack.Screen
        name={ScreenNames.ChangePassword}
        component={Screens.ChangePasswordScreen}
      />
      <Stack.Screen name={ScreenNames.FAQS} component={Screens.FAQScreen} />
      <Stack.Screen
        name={ScreenNames.ContactSupport}
        component={Screens.ContactSupportScreen}
      />
      <Stack.Screen
        name={ScreenNames.EditProfile}
        component={Screens.EditProfileScreen}
      />
      <Stack.Screen
        name={ScreenNames.PartnerBasicDetails}
        component={Screens.PartnerBasicDetailsScreen}
      />
      <Stack.Screen
        name={ScreenNames.BusinessLocation}
        component={Screens.BusinessLocationScreen}
      />
      <Stack.Screen
        name={ScreenNames.DocumentScreen}
        component={Screens.PartnerDocumentsScreen}
      />
      <Stack.Screen
        name={ScreenNames.PartnerBankDetails}
        component={Screens.PartnerBankDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
