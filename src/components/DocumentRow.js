import React from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {images, Pressable, Spacing, Text, theme} from '@caryaar/components';

const DocumentRow = ({
  label,
  actionLabel,
  isLink,
  showError,
  onPress,
  isLoading,
  disabled,
}) => {
  const actionColor = isLoading
    ? theme.colors.placeHolder
    : showError
    ? theme.colors.error
    : theme.colors.primary;

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text
          size="small"
          hankenGroteskMedium
          color={showError ? theme.colors.error : theme.colors.primaryBlack}>
          {label}
        </Text>
        {showError && (
          <Image source={images.infoStatus} style={styles.errorIcon} />
        )}
      </View>

      <View style={styles.right}>
        <Pressable onPress={onPress} disabled={isLoading || disabled}>
          <Text color={actionColor} type="helper-text" hankenGroteskSemiBold>
            {actionLabel}
          </Text>
        </Pressable>
        {isLoading && (
          <>
            <Spacing direction="y" />
            <ActivityIndicator size="small" />
          </>
        )}
      </View>
    </View>
  );
};

export default DocumentRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
  },
});
