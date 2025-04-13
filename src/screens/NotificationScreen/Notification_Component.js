import {Header, NotificationCard, SafeAreaWrapper} from '@caryaar/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import images from '../../assets/images';
import theme from '../../theme';

const Notification_Component = ({
  dataList,
  onBackPress,
  onPressRightContent,
}) => {
  const statusIcons = {
    success: images.icApproved,
    pending: images.icPending,
    rejected: images.icRejected,
  };

  return (
    <SafeAreaWrapper>
      <Header
        title="Notifications"
        showRightContent={true}
        rightLabel={'Mark as all Read'}
        rightLabelColor={theme.colors.primary}
        onBackPress={onBackPress}
        onPressRightContent={onPressRightContent}
      />
      <FlatList
        data={dataList}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={({item}) => (
          <NotificationCard
            title={item?.description}
            isLatest={item?.isLatest}
            subTitle="All documents for AutoMax Motors have been verified successfully."
            imgSource={statusIcons[item.status]}
            timeline={item?.minutesAgo}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        removeClippedSubviews
        windowSize={10}
      />
    </SafeAreaWrapper>
  );
};
const styles = StyleSheet.create({
  listContent: {
    backgroundColor: theme.colors.background,
    padding: theme.sizes.padding,
    flexGrow: 1,
    // paddingBottom: 40,
  },
});

export default Notification_Component;
