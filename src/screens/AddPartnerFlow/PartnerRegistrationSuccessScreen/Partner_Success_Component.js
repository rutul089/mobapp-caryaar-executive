import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {
  Button,
  SafeAreaWrapper,
  Spacing,
  Text,
  theme,
  images,
} from '@caryaar/components';

const Partner_Success_Component = ({
  partnerId,
  onViewPartners,
  onBackToHome,
}) => {
  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.background}
      statusBarColor={theme.colors.background}
      barStyle="dark-content">
      <View style={styles.container}>
        <Image source={images.partner_success} style={styles.successIcon} />

        <Spacing size="md_lg" />
        <Text
          size="h2"
          hankenGroteskBold
          textAlign="center"
          style={styles.center}>
          Partner Registration{'\n'}Submitted Successfully
        </Text>

        <Spacing size="md_lg" />
        <Text type="helper-text" textAlign="center" style={styles.center}>
          Partner ID:{' '}
          <Text
            color={theme.colors.primary}
            hankenGroteskBold={true}
            style={styles.center}>
            {partnerId}
          </Text>
        </Text>

        <Spacing size="md_lg" />
        <Text type="helper-text" textAlign="center" style={styles.center}>
          You will receive a notification after document verification from OPS
        </Text>

        <Spacing size="xl" />
        <Button label="View Partners" onPress={onViewPartners} />

        <Spacing size="lg" />
        <Button label="Back To Home" onPress={onBackToHome} variant="link" />
        <Spacing size="xl" />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.sizes.padding,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  successIcon: {
    width: 115,
    height: 115,
    alignSelf: 'center',
  },
  center: {width: '80%', alignSelf: 'center'},
});

export default Partner_Success_Component;
