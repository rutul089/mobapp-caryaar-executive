/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {
  CustomerCard,
  DetailInfoCard,
  Header,
  SafeAreaWrapper,
  Spacing,
  theme,
} from '@caryaar/components';
import {DocumentRow} from '../../components';

const Partner_Detail_Component = ({
  onBackPress,
  selectedPartner,
  contactDetails,
  locationDetail,
  accountDetail,
  documents,
  isFetchingDocument,
  businessType,
  infoRowDetails,
  footerInfo,
  onEditPartnerDetail,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Partner Details" onBackPress={onBackPress} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flexGrow: 1,
        }}>
        <View
          style={{
            backgroundColor: theme.colors.primaryBlack,
            padding: theme.sizes.padding,
            paddingTop: 12,
          }}>
          <CustomerCard
            hideLogo
            brandName={businessType}
            customerName={selectedPartner?.businessName}
            infoRowDetails={infoRowDetails}
            footerInfo={footerInfo}
            noMargin
            noShadow
            wrapperColor={theme.colors.gray900}
            customerNameColor={theme.colors.white}
            infoWrapperColor={theme.colors.primaryBlack}
            infoValueColor={theme.colors.white}
            showButton
            buttonLabel="Edit Details"
            onButtonPress={onEditPartnerDetail}
            customerNameProp={{
              hankenGroteskBold: true,
            }}
          />
        </View>
        <View style={{padding: theme.sizes.padding}}>
          <DetailInfoCard
            label={'Contact Details'}
            data={contactDetails}
            isSemiBold={false}
          />
          <Spacing size="lg" />
          <DetailInfoCard
            label={'Location Detail'}
            data={locationDetail}
            bottom
            isSemiBold={false}>
            <View
              style={{
                backgroundColor: '#FF5B5E70',
                height: 92,
                marginTop: 12,
                borderRadius: theme.sizes.borderRadius.card,
              }}
            />
          </DetailInfoCard>
          <Spacing size="lg" />
          <DetailInfoCard label={'Business Document'} isSemiBold={false}>
            {documents.map((doc, index) => {
              return (
                <>
                  <DocumentRow
                    key={`doc-${index}`}
                    label={doc.label}
                    actionLabel={
                      doc.isMissing || !doc.uploaded ? 'Required' : 'View'
                    }
                    showError={doc.isMissing || !doc.uploaded}
                    onPress={doc?.onPress}
                    disabled={doc.isMissing || !doc.uploaded}
                    isLoading={
                      isFetchingDocument.loading &&
                      isFetchingDocument.documentType === doc.documentType
                    }
                  />
                  <Spacing
                    size={
                      index !== documents.length - 1
                        ? theme.sizes.spacing.smd
                        : 0
                    }
                  />
                </>
              );
            })}
          </DetailInfoCard>
          <Spacing size="lg" />
          <DetailInfoCard
            label={'Account Detail'}
            data={accountDetail}
            isSemiBold={false}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Partner_Detail_Component;
