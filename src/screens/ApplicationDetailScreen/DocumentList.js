import {DocumentRow, Spacing, Text, theme} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

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

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: theme.sizes.spacing.smd,
  },
});

export default DocumentList;
