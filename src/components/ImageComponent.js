import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image as RNImage,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '@caryaar/components';

const ImageComponent = ({
  source,
  placeholder = images.placeholder_image,
  style,
  resizeMode = FastImage.resizeMode.cover,
  loaderSize = 'small',
  loaderColor = '#999',
  imageStyle,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isRemote =
    typeof source === 'string' &&
    (source.startsWith('http') || source.startsWith('https'));

  return (
    <View style={[styles.container, style]}>
      {loading && !error && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          size={loaderSize}
          color={loaderColor}
        />
      )}

      {isRemote ? (
        <FastImage
          style={StyleSheet.absoluteFill}
          source={{uri: source}}
          resizeMode={resizeMode}
          onLoadStart={() => {
            setLoading(true);
            setError(false);
          }}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      ) : (
        <RNImage
          style={style}
          source={source}
          resizeMode={resizeMode}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      )}

      {error && placeholder && (
        <RNImage style={style} source={placeholder} resizeMode={resizeMode} />
      )}
    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
