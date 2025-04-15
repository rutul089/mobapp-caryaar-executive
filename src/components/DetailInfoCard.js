/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Pressable, Spacing, Text} from './';
import theme from '../theme';
import {isLastRow} from '../utils/helper';

/**
 * A flexible, reusable information card to display labeled details in a grid layout,
 * with optional buttons and content slots.
 *
 * @component
 * @param {Object} props
 * @param {Array} [props.data=[]] - Array of info items. Each item: { label, value, isButton, onPress, full }.
 * @param {string} [props.label] - Optional header label above the card.
 * @param {boolean} [props.isSemiBold] - Apply semi-bold text style to the values if true.
 * @param {React.ReactNode} [props.children] - Additional content inside the card.
 * @param {boolean} [props.bottom=false] - If true, children are rendered after the info rows.
 *
 * @returns {React.ReactElement}
 *
 * @example
 * <DetailInfoCard
 *   label="Customer Info"
 *   data={[
 *     { label: 'Name', value: 'John Doe' },
 *     { label: 'Phone', value: '+91 9876543210', isButton: true, onPress: () => {} },
 *   ]}
 * />
 */
const DetailInfoCard = ({
  data = [],
  label,
  isSemiBold,
  children,
  bottom = false,
}) => {
  return (
    <>
      {!!label && (
        <>
          <Text>{label}</Text>
          <Spacing size="smd" />
        </>
      )}

      <Card padding={16}>
        {!bottom && children}

        {data && (
          <View style={styles.container}>
            {data.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.itemContainer,
                  {width: item?.full ? '100%' : '47%'},
                  isLastRow(index, data, item) && {marginBottom: 0},
                ]}>
                <Text type="helper-text" size="caption">
                  {item.label}
                </Text>

                <Pressable onPress={item?.onPress} disabled={!item?.isButton}>
                  <Text
                    hankenGroteskMedium={!isSemiBold && !item?.isButton}
                    hankenGroteskSemiBold={isSemiBold}
                    hankenGroteskBold={item?.isButton}
                    color={
                      item?.isButton
                        ? theme.colors.primary
                        : theme.colors.textPrimary
                    }
                    size="small"
                    lineHeight="small">
                    {item.value}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
        {bottom && children}
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginBottom: 12,
  },
});

export default React.memo(DetailInfoCard);
