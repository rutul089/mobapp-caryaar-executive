import React from 'react';
import ImageViewing from 'react-native-image-viewing';

const ImagePreviewModal = ({visible, onClose, imageUri}) => {
  if (!imageUri) {
    return null;
  }

  return (
    <ImageViewing
      images={[{uri: imageUri}]}
      imageIndex={0}
      visible={visible}
      onRequestClose={onClose}
      onSwipeDown={onClose}
      swipeToCloseEnabled
      doubleTapToZoomEnabled
    />
  );
};

export default ImagePreviewModal;
