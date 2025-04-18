/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

import {
  CustomerCard,
  DetailInfoCard,
  Header,
  SafeAreaWrapper,
  Spacing,
  Text,
  images,
  theme,
} from '@caryaar/components';

const Partner_Detail_Component = ({
  onBackPress,
  partnerDetail,
  contactDetails,
  locationDetail,
  accountDetail,
  documents,
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
            brandName={'PVT Limited'}
            customerName={partnerDetail.name}
            infoRowDetails={[
              {
                value: partnerDetail.phone,
                icon: images.callOutline,
                color: 'white',
              },
              {
                value: partnerDetail.location,
                icon: images.locationPin,
                color: 'white',
              },
            ]}
            footerInfo={[
              {label: 'Years in Business', value: '60 Month'},
              {label: 'Monthly Car Sales', value: '75'},
            ]}
            noMargin
            noShadow
            wrapperColor={theme.colors.gray900}
            customerNameColor={theme.colors.white}
            infoWrapperColor={theme.colors.primaryBlack}
            infoValueColor={theme.colors.white}
            showButton
            buttonLabel="Edit Details"
            onButtonPress={() => {}}
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
            {documents.map((doc, index) => (
              <View
                key={index}
                style={[
                  styles.row,
                  {
                    marginBottom:
                      index !== documents.length - 1
                        ? theme.sizes.spacing.smd
                        : 0,
                  },
                ]}>
                <Text size="small" hankenGroteskMedium={true}>
                  {doc.label}
                </Text>
                <TouchableOpacity onPress={doc.onPress}>
                  <Text
                    hankenGroteskBold={true}
                    size="small"
                    color={theme.colors.primary}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
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
