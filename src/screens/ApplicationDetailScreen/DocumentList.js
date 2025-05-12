import {DocumentRow, Spacing, Text, theme} from '@caryaar/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DOCUMENT_LABELS, KYC_LABELS} from '../../constants/enums';

const DocumentList = ({
  isLoading,
  loanDocuments,
  kycDocuments,
  onDocumentPress,
  documentType,
}) => {
  const safeKycDocs =
    kycDocuments && typeof kycDocuments === 'object' ? kycDocuments : {};
  const safeLoanDocs =
    loanDocuments && typeof loanDocuments === 'object' ? loanDocuments : {};

  return (
    <>
      {/* KYC Documents */}
      <Text type={'helper-text'} hankenGroteskMedium={true}>
        KYC Documents
      </Text>
      <Spacing size="sm" />
      {Object.entries(KYC_LABELS).map(([key, label]) => {
        const hasDocument = safeKycDocs?.[key];

        return (
          <React.Fragment key={key}>
            <DocumentRow
              label={label}
              actionLabel={hasDocument ? 'View' : 'Request Documents'}
              isLoading={isLoading && documentType === key}
              disabled={isLoading}
              onPress={() => {
                onDocumentPress?.(key, safeKycDocs[key], hasDocument);
              }}
              showError={!hasDocument}
            />
            <Spacing size="smd" />
          </React.Fragment>
        );
      })}

      <View style={styles.divider} />

      {/* Loan Documents */}
      <Text type={'helper-text'} hankenGroteskMedium={true}>
        Loan Documents
      </Text>
      <Spacing size="sm" />
      {Object.entries(DOCUMENT_LABELS).map(([key, label]) => {
        const hasDocument = safeLoanDocs[key];

        return (
          <React.Fragment key={key}>
            <DocumentRow
              label={label}
              actionLabel={hasDocument ? 'View' : 'Request Documents'}
              isLoading={isLoading && documentType === key}
              disabled={isLoading}
              onPress={() => {
                onDocumentPress?.(key, safeLoanDocs?.[key], hasDocument);
              }}
              showError={!hasDocument}
            />
            <Spacing size="smd" />
          </React.Fragment>
        );
      })}
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
