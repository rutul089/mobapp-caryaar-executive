import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Partner_Detail_Component from './Partner_Detail_Component';
import {getScreenParam, goBack} from '../../navigation/NavigationUtils';

export default class PartnerDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerDetail: {},
    };
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let partnerDetail = getScreenParam(route, 'params');
    this.setState(
      {
        partnerDetail,
      },
      () => {
        console.log({partnerDetail: this.state.partnerDetail});
      },
    );
  }

  onBackPress = () => {
    goBack();
  };

  render() {
    const {partnerDetail} = this.state;
    return (
      <>
        <Partner_Detail_Component
          onBackPress={this.onBackPress}
          partnerDetail={partnerDetail}
          contactDetails={[
            {label: 'Owner', value: 'Vijay Sharma'},
            {label: 'Mobile Number', value: '98653 90981'},
            {
              label: 'EmailAddress',
              value: 'aayushman_nayak85@gmail.com',
              full: true,
            },
          ]}
          locationDetail={[
            {
              label: 'Company Name',
              value: 'Automax Motors PVT Limited',
              full: true,
            },
            {
              label: 'Address',
              value:
                '603, One World Capital, 2 Center Street, Balaji Chowk, Hadapsar, Darjeeling, West Bengal 263982',
              full: true,
            },
          ]}
          accountDetail={[
            {label: 'Account Number', value: '5984075872581'},
            {label: 'Account Holder Name', value: 'Vijay Dugar'},
            {label: 'Bank Name', value: 'HDFC Bank'},
            {label: 'IFSC Code', value: 'HDFC0009842'},
            {label: 'Branch Name', value: 'Branch Name'},
            {label: 'Settlement Preference', value: 'NEFT'},
          ]}
          documents={[
            {
              label: 'GST Registration',
              onPress: () => console.log('GST clicked'),
            },
            {
              label: 'Shop License',
              onPress: () => console.log('Shop License clicked'),
            },
            {label: 'PAN Card', onPress: () => console.log('PAN Card clicked')},
            {
              label: 'Aadhar Card Front',
              onPress: () => console.log('Aadhar Front clicked'),
            },
            {
              label: 'Aadhar Card Back',
              onPress: () => console.log('Aadhar Back clicked'),
            },
            {
              label: 'Photograph',
              onPress: () => console.log('Photograph clicked'),
            },
            {
              label: 'Bank Statement',
              onPress: () => console.log('Bank Statement clicked'),
            },
            {
              label: 'Cancelled Cheque',
              onPress: () => console.log('Cancelled Cheque clicked'),
            },
          ]}
        />
      </>
    );
  }
}
