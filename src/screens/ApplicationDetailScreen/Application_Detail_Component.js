import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Header,
  SafeAreaWrapper,
  CardWrapper,
  PartnerCard,
  Button,
  DetailInfoCard,
  Spacing,
  Text,
  TextAreaInput,
} from '@caryaar/components';
import theme from '../../theme';

import {getGradientColors} from '../../utils/helper';
import DocumentList from './DocumentList';

const Application_Detail_Component = ({
  onBackPress,
  applicationDetail,
  vehicleDetail,
  customerDetail,
  loanDetail,
}) => {
  return (
    <SafeAreaWrapper backgroundColor={theme.colors.background}>
      <Header title="Application Details" onBackPress={onBackPress} />
      <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.wrapper}>
          <CardWrapper
            showLeftText
            leftText={'849363'}
            status={applicationDetail.status?.toUpperCase()}
            gradientColors={getGradientColors(applicationDetail.type)}>
            <PartnerCard
              noMargin
              showRightArrow={false}
              name={applicationDetail.name}
              subtitle={`Submitted on: ${applicationDetail.phone}`}
              buttonLabel="Track Application"
              processingTime={1 + ' Days'}
              textNote={'Last updated on 2 hours ago'}
              callToAction={() => {}}
              wrapperColor={theme.colors.gray900}
              partnerColor={theme.colors.white}
              suffixTextColor={theme.colors.white}
              showPersonalInfo={false}
              isCTAShow
            />
          </CardWrapper>
        </View>
        <View style={styles.secondWrapper}>
          <DetailInfoCard label="Vehicle Details" data={vehicleDetail} />
          <Spacing size="lg" />
          <DetailInfoCard label="Customer Details" data={customerDetail} />
          <Spacing size="lg" />
          <DetailInfoCard label={'Documents'} isSemiBold={false}>
            <DocumentList />
          </DetailInfoCard>
          <Spacing size="lg" />
          <DetailInfoCard label="Loan Details" data={loanDetail} />
          <Spacing size="lg" />
          <Text>Add Note</Text>
          <Spacing size="smd" />
          <TextAreaInput
            label=""
            editable={false}
            value={
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
            }
            textAreaStyle={{backgroundColor: 'white', marginTop: 0}}
          />
          <Spacing size="xl" />
          <View style={styles.buttonWrapper}>
            <View style={styles.halfFlex}>
              <Button label={'Contact Partner'} variant="link" />
            </View>
            <View style={styles.halfFlex}>
              <Button label={'Contact Customer'} variant="link" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.primaryBlack,
    paddingVertical: theme.sizes.spacing.md,
    paddingHorizontal: theme.sizes.padding,
  },
  secondWrapper: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },
  halfFlex: {
    flex: 0.5,
  },
});

export default Application_Detail_Component;
