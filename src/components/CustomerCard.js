/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import images from '../assets/images';
import theme from '../theme';
import {Button, Card, Spacing, Text, RenderInfoBox, InfoRow} from '.';

/**
 * A flexible, reusable card component for displaying customer details, info rows, footer info, and optional actions.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.customerId] - Customer ID label.
 * @param {string} [props.customerName] - Customer name.
 * @param {string} [props.customerNote] - Additional customer note.
 * @param {string} [props.customerIdColor] - Custom color for customer ID.
 * @param {string} [props.customerNameColor] - Custom color for customer name.
 * @param {string} [props.customerNoteColor] - Custom color for customer note.
 * @param {ImageSourcePropType} [props.logo] - Image source for logo.
 * @param {Object} [props.cardStyle] - Custom style for the card container.
 * @param {function} [props.onItemPress] - Function to call when the card is pressed.
 * @param {ImageSourcePropType} [props.statusImg=images.arrow_right] - Right-side status icon.
 * @param {boolean} [props.noMargin=false] - Remove top margin if true.
 * @param {Array} [props.footerInfo=[]] - Footer info objects for RenderInfoBox.
 * @param {boolean} [props.showRightIcon=false] - Show right arrow icon if true.
 * @param {boolean} [props.showButton=false] - Show action button if true.
 * @param {string} [props.buttonLabel=''] - Label for the optional button.
 * @param {function} [props.onButtonPress] - Function to call on button press.
 * @param {string} [props.wrapperColor] - Background color for the card.
 * @param {string} [props.infoWrapperColor] - Background color for footer info box.
 * @param {string} [props.labelColor] - Color for footer labels.
 * @param {string} [props.infoValueColor] - Color for footer values.
 * @param {boolean} [props.noShadow] - Disable shadow if true.
 * @param {string} [props.brandName] - Optional brand name to show in header.
 * @param {boolean} [props.hideLogo] - Hide logo if true.
 * @param {Array} [props.infoRowDetails] - Array of info row objects { icon, value }.
 *
 * @returns {React.ReactElement}
 *
 * @example
 * <CustomerCard
 *   customerId="#CUST1001"
 *   customerName="John Doe"
 *   customerNote="VIP Customer"
 *   logo={images.user}
 *   showRightIcon
 *   infoRowDetails={[
 *     { icon: images.locationPin, value: 'Delhi, India' },
 *     { icon: images.phoneIcon, value: '+91 9876543210' },
 *   ]}
 * />
 */
const CustomerCard = ({
  customerId,
  customerName,
  customerNote,
  customerIdColor,
  customerNameColor,
  customerNoteColor,
  logo,
  cardStyle,
  onItemPress,
  statusImg = images.arrow_right,
  noMargin = false,
  footerInfo = [],
  showRightIcon = false,
  showButton = false,
  buttonLabel = '',
  onButtonPress,
  wrapperColor,
  infoWrapperColor,
  labelColor,
  infoValueColor,
  noShadow,
  brandName,
  hideLogo,
  infoRowDetails,
}) => {
  const renderHeader = () => (
    <View style={styles.header}>
      {!hideLogo && (
        <Image source={logo || images.placeholder_image} style={styles.logo} />
      )}
      <View style={styles.flex}>
        {brandName && (
          <Text
            hankenGroteskMedium
            size="small"
            lineHeight="small"
            color={theme.colors.primary}>
            {brandName}
          </Text>
        )}
        {customerId && (
          <Text
            hankenGroteskSemiBold
            size="small"
            lineHeight="small"
            color={customerIdColor ?? '#F8A902'}>
            {customerId}
          </Text>
        )}
        {customerName && (
          <Text
            hankenGroteskSemiBold
            size="small"
            lineHeight="small"
            color={customerNameColor ?? theme.colors.textPrimary}>
            {customerName}
          </Text>
        )}
        {customerNote && (
          <Text
            size="small"
            lineHeight="small"
            color={customerNoteColor ?? theme.colors.textSecondary}>
            {customerNote}
          </Text>
        )}
        {infoRowDetails && (
          <>
            <Spacing size="xs" />
            {renderInfoRow()}
          </>
        )}
      </View>
      {showRightIcon && <Image source={statusImg} style={styles.arrow} />}
    </View>
  );

  const renderInfoRow = () => {
    return (
      <>
        {infoRowDetails?.map((row, rowIndex) => (
          <InfoRow
            key={`row-${rowIndex}`}
            iconSource={row.icon}
            text={row.value}
            containerStyle={{marginTop: 5}}
            textColor={row?.color}
          />
        ))}
      </>
    );
  };

  return (
    <Card
      cardContainerStyle={[
        styles.cardWrapper,
        cardStyle,
        {backgroundColor: wrapperColor ?? theme.colors.white},
        noMargin && {marginTop: 0},
      ]}
      onPress={onItemPress}
      noShadow={noShadow}>
      {renderHeader()}

      <Spacing size="smd" />

      <RenderInfoBox
        labelColor={labelColor}
        infoValueColor={infoValueColor}
        infoWrapperColor={infoWrapperColor}
        footerInfo={footerInfo}
      />

      {showButton && (
        <>
          <Spacing size="smd" />
          <Button
            variant="link"
            size="small"
            onPress={onButtonPress}
            label={buttonLabel}
          />
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cardWrapper: {
    marginTop: theme.sizes.spacing.md,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  arrow: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
});

export default React.memo(CustomerCard);
