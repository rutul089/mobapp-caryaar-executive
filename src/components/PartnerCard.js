import React from 'react';
import {Button, Card, InfoRow, Spacing, Text} from '.';
import {Image, View, StyleSheet} from 'react-native';
import theme from '../theme';
import images from '../assets/images';
import colors from '../theme/colors';

/**
 * Reusable PartnerCard component to display partner details, status, contact info, errors, and CTA.
 *
 * @component
 * @param {Object} props
 * @param {string} props.name - Partner name.
 * @param {string} [props.location] - Partner location text.
 * @param {string} [props.phone] - Partner phone number.
 * @param {function} [props.onPress] - Function to call on card press.
 * @param {boolean} [props.showPersonalInfo=true] - Toggle personal info visibility.
 * @param {string} [props.subtitle] - Optional subtitle text under partner name.
 * @param {Object} [props.statusObject] - Optional status info { text, icon, color }.
 * @param {Array} [props.documentError] - Array of document error objects [{ value }].
 * @param {boolean} [props.isCTAShow] - Show CTA button if true.
 * @param {string} [props.buttonLabel] - Label for CTA button.
 * @param {function} [props.callToAction] - Function to call on CTA button press.
 * @returns {React.ReactElement}
 */
const PartnerCard = ({
  name,
  location,
  phone,
  onPress,
  showPersonalInfo = true,
  subtitle,
  statusObject,
  documentError,
  isCTAShow,
  buttonLabel,
  callToAction,
}) => {
  return (
    <>
      <Card padding={16} onPress={onPress}>
        {/* Header */}
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text hankenGroteskMedium style={styles.partnerName}>
              {name}
            </Text>
            {subtitle && (
              <>
                <Spacing size="xs" />
                <Text type="caption">{subtitle}</Text>
              </>
            )}
          </View>
          <Image source={images.arrow_right} style={styles.arrowIcon} />
        </View>

        {/* Status Row */}
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

        {/* Document Error List */}
        {documentError && documentError.length > 0 && (
          <View style={styles.documentError}>
            {documentError.map((doc, index) => (
              <View key={index}>
                <InfoRow text={doc.value} iconSource={images.error_document} />
                {index !== documentError.length - 1 && <Spacing size="smd" />}
              </View>
            ))}
          </View>
        )}

        {/* Personal Info (phone & location) */}
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
      <Spacing size="md" />
    </>
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
});

export default React.memo(PartnerCard);
