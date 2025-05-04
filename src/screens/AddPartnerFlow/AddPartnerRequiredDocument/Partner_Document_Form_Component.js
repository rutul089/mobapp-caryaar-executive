import {
  Button,
  FilePickerModal,
  Header,
  SafeAreaWrapper,
  Spacing,
  StepTracker,
  Text,
  theme,
  VehicleImageCard,
} from '@caryaar/components';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {goBack} from '../../../navigation/NavigationUtils';
import {getFileType} from '../../../utils/helper';

const Partner_Document_Form_Component = ({
  showImages,
  errorSteps,
  handleNextPress,
  businessDocuments,
  otherDocuments,
  bankDocuments,
  handleFile,
  showFilePicker,
  closeFilePicker,
  isNewPartner,
}) => {
  const renderDocumentGroup = (title, documents) => (
    <View key={title}>
      <Text>{title}</Text>
      <View style={styles.rowSpaceBetween}>
        {documents.map(doc => {
          const fileUri = doc?.docObject?.uri;
          const fileType = getFileType(fileUri);
          return (
            <View key={`${title}-${doc.label}`} style={styles.halfWidth}>
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
      <Header
        title={`${isNewPartner ? 'Add New Partner' : 'Partner Details'}`}
        onBackPress={goBack}
      />
      <StepTracker
        showImages={showImages}
        selectedId={3}
        errorSteps={errorSteps}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        {renderDocumentGroup('Business Documents', businessDocuments)}
        {renderDocumentGroup('Other Documents', otherDocuments)}
        {renderDocumentGroup('Bank Documents', bankDocuments)}
        <Button label={'Next'} onPress={handleNextPress} />
      </ScrollView>
      <FilePickerModal
        isVisible={showFilePicker}
        onSelect={handleFile}
        onClose={closeFilePicker}
        autoCloseOnSelect={false}
      />
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

export default Partner_Document_Form_Component;
