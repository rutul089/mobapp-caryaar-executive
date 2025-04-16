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
import {getFileType} from '../../utils/helper';

const Partner_Documents_Component = ({
  onBackPress,
  documentGroups,
  handleNextPress,
}) => {
  const renderDocumentGroup = (title, documents) => (
    <View key={title} style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.rowWrap}>
        {documents.map(doc => {
          const fileUri = doc?.image?.uri;
          const fileType = getFileType(fileUri);

          return (
            <View key={`${title}-${doc.label}`} style={styles.itemWrapper}>
              <VehicleImageCard
                label={doc.label}
                image={fileUri}
                onDeletePress={doc.onDeletePress}
                viewImage={doc.viewImage}
                btnLabel={'Click to Upload\nImage or PDF'}
                uploadMedia={doc.uploadMedia}
                fileType={fileType}
                isDocument={fileType !== 'image'}
              />
            </View>
          );
        })}
      </View>
      <Spacing size="lg" />
    </View>
  );

  return (
    <SafeAreaWrapper>
      <Header title="Add New Partner" onBackPress={onBackPress} />
      <StepTracker showImages={[1, 2, 3, 4]} errorSteps={[3]} />
      <ScrollView contentContainerStyle={styles.wrapper}>
        {documentGroups?.map(group =>
          renderDocumentGroup(group.title, group.documents),
        )}
        <Button label="Next" onPress={handleNextPress} />
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
  groupContainer: {
    marginBottom: theme.sizes.spacing.md,
  },
  groupTitle: {
    fontSize: theme.typography.fontSizes.body,
    fontWeight: '600',
    marginBottom: theme.sizes.spacing.sm,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.smd,
  },
  itemWrapper: {
    width: '47%',
    marginBottom: theme.sizes.spacing.smd,
  },
});

export default Partner_Documents_Component;
