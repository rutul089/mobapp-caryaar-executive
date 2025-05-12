import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image as RNImage,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '@caryaar/components';

const defaultFallback = images.placeholder_image;
const defaultPlaceholder = images.placeholder_image;

const SmartImage = ({
  source,
  style,
  resizeMode = FastImage.resizeMode.cover,
  fallback = defaultFallback,
  placeholder = defaultPlaceholder,
  loadingSize = 'small',
  loadingColor = '#999',
  rounded = false,
  borderRadius = 9999,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getValidSource = () => {
    if (error) {
      return fallback;
    }

    // If it's a local file from gallery or camera
    if (typeof source === 'string') {
      if (
        source.startsWith('file://') ||
        source.startsWith('content://') ||
        source.startsWith('data:')
      ) {
        return {uri: source};
      }
      return {uri: source}; // remote URL
    }

    return source; // require() or already an object
  };

  return (
    <View style={[styles.container, rounded && {borderRadius}, style]}>
      {loading && !error && placeholder && (
        <FastImage
          source={placeholder}
          style={[StyleSheet.absoluteFill, rounded && {borderRadius}]}
          resizeMode={resizeMode}
        />
      )}

      {loading && !error && (
        <ActivityIndicator
          size={loadingSize}
          color={loadingColor}
          style={StyleSheet.absoluteFill}
        />
      )}

      <FastImage
        style={[StyleSheet.absoluteFill, rounded && {borderRadius}]}
        source={getValidSource()}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(SmartImage);
