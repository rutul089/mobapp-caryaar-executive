import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import theme from '../theme';
import {Text} from './';

/**
 * A reusable information row with an icon and text, with custom styling options.
 *
 * @component
 * @param {Object} props
 * @param {ImageSourcePropType} props.iconSource - Image or icon source.
 * @param {string} props.text - Text to display beside the icon.
 * @param {Object} [props.containerStyle] - Custom style for the container view.
 * @param {Object} [props.iconStyle] - Custom style for the icon.
 * @param {Object} [props.textStyle] - Custom style for the text.
 * @param {Object} [props.textColor] - Custom color for the text.
 * @returns {React.ReactElement}
 *
 * @example
 * <InfoRow
 *   iconSource={images.locationPin}
 *   text="New Delhi, India"
 * />
 */
const InfoRow = ({
  iconSource,
  text,
  containerStyle,
  iconStyle,
  textStyle,
  textColor,
  suffixText,
  suffixTextColor,
}) => {
  return (
    <View style={[styles.infoRow, containerStyle]}>
      <Image source={iconSource} style={[styles.icon, iconStyle]} />
      <Text
        size="small"
        numberOfLines={2}
        ellipsizeMode="tail"
        color={textColor ?? theme.colors.textPrimary}
        style={[styles.text, textStyle]}>
        {text}
      </Text>
      {suffixText && (
        <Text
          size="small"
          hankenGroteskSemiBold={true}
          color={suffixTextColor ?? theme.colors.primaryBlack}>
          {suffixText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  text: {
    flexShrink: 1,
  },
});

export default React.memo(InfoRow);
