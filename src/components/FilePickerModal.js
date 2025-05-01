import {
  CommonModal,
  InfoRow,
  Pressable,
  Spacing,
  images,
  theme,
} from '@caryaar/components';
import React from 'react';

const FilePickerModal = ({isVisible, onClose, onSelect}) => {
  const options = [
    {label: 'Camera', value: 'camera', icon: images.file_camera},
    {label: 'Photo Gallery', value: 'gallery', icon: images.file_gallery},
    {label: 'Documents', value: 'document', icon: images.file_documents},
  ];

  return (
    <CommonModal
      isVisible={isVisible}
      onModalHide={onClose}
      isScrollableContent={true}
      isPrimaryButtonVisible={false}
      isTextCenter={false}
      title="Choose Upload Method">
      <>
        {options.map(option => (
          <Pressable
            key={option.value}
            onPress={() => {
              onSelect?.(option.value);
            }}
            style={{
              height: 45,
              justifyContent: 'center',
            }}>
            <InfoRow
              iconSource={option.icon}
              text={option.label}
              iconStyle={{tintColor: theme.colors.primary}}
              textProp={{hankenGroteskSemiBold: true}}
            />
          </Pressable>
        ))}
        <Spacing />
      </>
    </CommonModal>
  );
};

export default FilePickerModal;
