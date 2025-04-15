/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Pressable, Card} from '.';
import theme from '../theme';
import images from '../assets/images';

const VehicleImageCard = ({
  label,
  image,
  viewImage,
  onDeletePress,
  cardWrapper,
  isView,
  btnLabel,
  uploadMedia,
}) => {
  return (
    <Card
      style={[styles.card, cardWrapper]}
      padding={0}
      cardContainerStyle={{
        paddingHorizontal: 8,
        paddingVertical: 12,
      }}>
      <Text size={'small'}>{label}</Text>
      <Pressable style={styles.imageContainer} onPress={viewImage}>
        {image ? (
          <>
            <Image
              source={{uri: image}}
              style={styles.image}
              defaultSource={images.placeholder_image}
            />
            {!isView && (
              <Pressable onPress={onDeletePress} style={styles.deleteIcon}>
                <Image source={images.icDelete} style={styles.deleteIcon} />
              </Pressable>
            )}
          </>
        ) : (
          <Pressable
            style={[styles.dashedWrapper, styles.uploadImage]}
            onPress={uploadMedia}>
            <Image source={images.icUpload} style={styles.icon} />
            <Text type="helper-text" size="caption" textAlign="center">
              {btnLabel}
            </Text>
          </Pressable>
          // <Image
          //   source={images.upload_image}
          //   resizeMode="contain"
          //   style={styles.uploadImage}
          // />
        )}
        {isView && <Image source={images.viewIcon} style={styles.viewIcon} />}
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // margin:6,
    marginHorizontal: 10,
    marginLeft: 0,
    marginBottom: 12,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    height: 115,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    padding: 6,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 28,
    width: 28,
  },
  uploadImage: {width: '100%', height: '100%'},
  viewIcon: {
    height: 28,
    width: 28,
    position: 'absolute',
  },
  uploadBox: {
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    padding: 7,
    marginTop: theme.sizes.spacing.sm,
  },
  dashedWrapper: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#5DB4F2',
    borderRadius: 12,
    backgroundColor: '#E9F4FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 8,
  },
});

export default VehicleImageCard;
