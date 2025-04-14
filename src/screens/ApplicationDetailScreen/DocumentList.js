import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import images from '../../assets/images';
import {Spacing, Text, Pressable} from '../../components';
import theme from '../../theme';

const DocumentList = () => {
  return (
    <>
      {/* KYC Documents */}
      <Text type={'helper-text'} hankenGroteskMedium={true}>
        KYC Documents
      </Text>
      <Spacing size="sm" />
      <DocumentRow label="PAN Card" actionLabel="View" />
      <Spacing size="smd" />

      <DocumentRow label="Aadhar Card Front" actionLabel="View" />
      <Spacing size="smd" />

      <DocumentRow label="Aadhar Card Back" actionLabel="View" />
      <Spacing size="smd" />

      <DocumentRow label="Address Proof" actionLabel="View" />

      <View style={styles.divider} />

      {/* Income Documents */}
      <Text type={'helper-text'} hankenGroteskMedium={true}>
        Income Documents
      </Text>
      <Spacing size="sm" />

      <DocumentRow label="Salary Slips" actionLabel="View" />
      <Spacing size="smd" />
      <DocumentRow
        label="Bank Statements"
        actionLabel="Request Documents"
        showError
      />
    </>
  );
};

const DocumentRow = ({label, actionLabel, isLink, showError, onPress}) => (
  <View style={styles.row}>
    <View style={styles.left}>
      <Text
        size={'small'}
        hankenGroteskMedium={true}
        color={showError ? theme.colors.error : theme.colors.primaryBlack}>
        {label}
      </Text>
      {showError && (
        <Image source={images.infoStatus} style={styles.errorIcon} />
      )}
    </View>
    <Pressable onPress={onPress}>
      <Text
        color={theme.colors.primary}
        type={'helper-text'}
        hankenGroteskSemiBold={true}>
        {actionLabel}
      </Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: theme.sizes.spacing.smd,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  errorIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
  },
});

export default DocumentList;
