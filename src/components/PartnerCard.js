/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Card, InfoRow, Spacing, Text} from '.';
import {Image, View, StyleSheet} from 'react-native';
import theme from '../theme';
import images from '../assets/images';

/**
 * Reusable PartnerCard component to display partner details, status, contact info, errors, processing time, notes and a CTA.
 *
 * @component
 *
 * @param {Object} props - All props for the PartnerCard.
 * @param {string} props.name - Partner name to display in the header.
 * @param {string} [props.location] - Partner location text (optional).
 * @param {string} [props.phone] - Partner phone number (optional).
 * @param {function} [props.onPress] - Function to call when the card is pressed (optional).
 * @param {boolean} [props.showPersonalInfo=true] - If true, shows personal info (phone, location).
 * @param {string} [props.subtitle] - Optional subtitle text under the partner name.
 * @param {Object} [props.statusObject] - Optional status object.
 * @param {string} props.statusObject.text - Status label text.
 * @param {ImageSourcePropType} props.statusObject.icon - Status icon image.
 * @param {string} props.statusObject.color - Status text color.
 * @param {Array<{value: string}>} [props.documentError=[]] - List of document error objects with a `value` string.
 * @param {boolean} [props.isCTAShow=false] - If true, displays a CTA button at the bottom.
 * @param {string} [props.buttonLabel=''] - Label text for the CTA button.
 * @param {function} [props.callToAction] - Function called when the CTA button is pressed.
 * @param {string} [props.processingTime] - Optional text for displaying estimated processing time.
 * @param {Object} [props.cardStyle] - Optional custom style for the Card container.
 * @param {boolean} [props.noMargin=false] - If true, removes the default top margin.
 * @param {string} [props.wrapperColor] - Custom card background color (optional).
 * @param {string} [props.partnerColor] - Custom color for the partner name text.
 * @param {string} [props.suffixTextColor] - Custom color for the processing time value.
 * @param {boolean} [props.showRightArrow=true] - If true, shows the right arrow icon in the header.
 * @param {string} [props.textNote] - Optional small note text displayed at the bottom.
 *
 * @returns {React.ReactElement} The rendered PartnerCard component.
 *
 * @example
 * <PartnerCard
 *   name="Auto Hub"
 *   subtitle="Premium Partner"
 *   phone="+91 9876543210"
 *   location="Delhi"
 *   statusObject={{
 *     text: 'Active',
 *     icon: images.checkIcon,
 *     color: theme.colors.success
 *   }}
 *   documentError={[
 *     { value: 'Missing GST' },
 *     { value: 'Pending Bank Details' }
 *   ]}
 *   processingTime="24 hrs"
 *   isCTAShow
 *   buttonLabel="View Details"
 *   callToAction={() => console.log('CTA pressed')}
 *   textNote="Profile incomplete"
 * />
 */
const PartnerCard = ({
  name,
  location,
  phone,
  onPress,
  showPersonalInfo = true,
  subtitle,
  statusObject,
  documentError = [],
  isCTAShow = false,
  buttonLabel = '',
  callToAction,
  processingTime,
  cardStyle,
  noMargin = true,
  wrapperColor,
  partnerColor,
  suffixTextColor,
  showRightArrow = true,
  textNote,
}) => {
  return (
    <Card
      padding={16}
      onPress={onPress}
      cardContainerStyle={[
        styles.cardWrapper,
        cardStyle,
        {backgroundColor: wrapperColor ?? theme.colors.white},
        noMargin && {marginTop: 0},
      ]}>
      {/* Header */}
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text
            hankenGroteskMedium
            style={styles.partnerName}
            color={partnerColor ?? theme.colors.primaryBlack}>
            {name}
          </Text>
          {subtitle && (
            <>
              <Spacing size="xs" />
              <Text type="caption">{subtitle}</Text>
            </>
          )}
        </View>
        {showRightArrow && (
          <Image source={images.arrow_right} style={styles.arrowIcon} />
        )}
      </View>

      {/* Status */}
      {statusObject && (
        <>
          <Spacing size="smd" />
          <InfoRow
            text={statusObject.text}
            iconSource={statusObject.icon}
            textColor={statusObject.color}
          />
        </>
      )}

      {/* Document Errors */}
      {documentError.length > 0 && (
        <View style={styles.documentError}>
          {documentError.map((doc, index) => (
            <View key={index}>
              <InfoRow text={doc.value} iconSource={images.error_document} />
              {index !== documentError.length - 1 && <Spacing size="smd" />}
            </View>
          ))}
        </View>
      )}

      {/* Personal Info */}
      {showPersonalInfo && (
        <View style={styles.infoRowGroup}>
          <InfoRow
            text={phone}
            iconSource={images.callOutline}
            containerStyle={styles.phoneInfo}
          />
          <InfoRow
            text={location}
            iconSource={images.locationPin}
            containerStyle={styles.locationInfo}
          />
        </View>
      )}

      {/* Processing Time */}
      {processingTime && (
        <>
          <Spacing size="sm" />
          <InfoRow
            text="Processing Time : "
            iconSource={images.time}
            textColor={theme.colors.textLabel}
            suffixText={processingTime}
            suffixTextColor={suffixTextColor}
          />
        </>
      )}

      {/* Optional Note */}
      {textNote && (
        <>
          <Spacing size="sm" />
          <Text color={theme.colors.white} size="caption">
            {textNote}
          </Text>
        </>
      )}

      {/* CTA Button */}
      {isCTAShow && (
        <>
          <Spacing size="md" />
          <Button
            variant="link"
            size="small"
            label={buttonLabel}
            onPress={callToAction}
          />
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partnerName: {
    width: '90%',
  },
  arrowIcon: {
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  infoRowGroup: {
    flexDirection: 'row',
    marginTop: theme.sizes.spacing.smd,
  },
  phoneInfo: {
    flex: 0.4,
  },
  locationInfo: {
    flex: 0.6,
  },
  documentError: {
    marginTop: theme.sizes.spacing.sm,
    backgroundColor: '#B6000312',
    padding: theme.sizes.spacing.smd,
    borderRadius: theme.sizes.borderRadius.md,
  },
  cardWrapper: {
    marginTop: theme.sizes.spacing.md,
  },
});

export default React.memo(PartnerCard);
