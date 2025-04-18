import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {images, Pressable, Spacing, Text, theme} from '@caryaar/components';

const DocumentList = ({viewPanCard, isLoading}) => {
  return (
    <>
      {/* KYC Documents */}
      <Text type={'helper-text'} hankenGroteskMedium={true}>
        KYC Documents
      </Text>
      <Spacing size="sm" />
      <DocumentRow
        label="PAN Card"
        actionLabel="View"
        onPress={viewPanCard}
        isLoading={isLoading}
      />
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

const DocumentRow = ({
  label,
  actionLabel,
  isLink,
  showError,
  onPress,
  isLoading,
}) => (
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
    <View style={{flexDirection: 'row'}}>
      <Pressable onPress={onPress} disabled={isLoading}>
        <Text
          color={isLoading ? theme.colors.placeHolder : theme.colors.primary}
          type={'helper-text'}
          hankenGroteskSemiBold={true}>
          {actionLabel}
        </Text>
      </Pressable>
      {isLoading && (
        <>
          <Spacing direction={'y'} />
          <ActivityIndicator />
        </>
      )}
    </View>
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
