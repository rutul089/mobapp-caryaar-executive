import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  CustomSwitch,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
} from '../../../components';
import theme from '../../../theme';

const Notification_Preference_Component = ({
  onBackPress,
  valueLoanStatusUpdate,
  valuePartnerOnboardingStatus,
  onLoanStatusUpdateChange,
  onPartnerOnboardingStatusChange,
}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Notification Preferences" onBackPress={onBackPress} />
      <View style={styles.wrapper}>
        <Card
          row
          padding={14}
          noShadow={true}
          cardContainerStyle={styles.cardWrapper}>
          <Text size={'small'} hankenGroteskMedium={true}>
            Loan Status Update
          </Text>
          <CustomSwitch
            initialValue={valueLoanStatusUpdate}
            onValueChange={onLoanStatusUpdateChange}
          />
        </Card>
        <Spacing size="md" />
        <Card
          row
          padding={14}
          noShadow={true}
          cardContainerStyle={styles.cardWrapper}>
          <Text size={'small'} hankenGroteskMedium={true}>
            Partner Onboarding Status
          </Text>
          <CustomSwitch
            initialValue={valuePartnerOnboardingStatus}
            onValueChange={onPartnerOnboardingStatusChange}
          />
        </Card>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Notification_Preference_Component;
