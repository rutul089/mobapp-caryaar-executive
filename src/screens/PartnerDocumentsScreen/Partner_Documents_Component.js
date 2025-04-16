import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Header,
  SafeAreaWrapper,
  Spacing,
  StepTracker,
  VehicleImageCard,
} from '../../components';
import theme from '../../theme';

const Partner_Documents_Component = ({
  onBackPress,
  documentGroups,
  handleNextPress,
}) => {
  const renderDocumentGroup = (title, documents) => (
    <View key={title}>
      <Text>{title}</Text>
      <View style={styles.rowSpaceBetween}>
        {documents.map((doc, index) => (
          <View key={`${title}-${doc.label}`} style={styles.halfWidth}>
            <VehicleImageCard
              label={doc.label}
              image={doc?.image?.uri}
              onDeletePress={doc.onDeletePress}
              viewImage={doc.viewImage}
              btnLabel={'Click to Upload\nImage or PDF'}
              uploadMedia={doc.uploadMedia}
            />
          </View>
        ))}
      </View>
      <Spacing size="lg" />
    </View>
  );

  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={onBackPress} />
      <StepTracker showImages={[1, 2, 3, 4]} errorSteps={[3]} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        {documentGroups &&
          documentGroups.map(group =>
            renderDocumentGroup(group.title, group.documents),
          )}
        <Button label={'Next'} onPress={handleNextPress} />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.background,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.smd,
  },
  halfWidth: {
    width: '47%',
    marginBottom: theme.sizes.spacing.smd,
  },
});

export default Partner_Documents_Component;
