import React from 'react';
import {
  Card,
  Header,
  SafeAreaWrapper,
  Spacing,
  Switch,
  Text,
  theme,
} from '@caryaar/components';
import {goBack} from '../../../navigation/NavigationUtils';
import {ScrollView, View} from 'react-native';

const Privacy_Policy_Component = ({params}) => {
  return (
    <SafeAreaWrapper>
      <Header title="Privacy Policy" onBackPress={() => goBack()} />
      <ScrollView contentContainerStyle={{padding: 24}}>
        <Card>
          <Text size={'small'} type={'caption'}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default Privacy_Policy_Component;
