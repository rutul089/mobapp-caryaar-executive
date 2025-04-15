import React, {Component} from 'react';

import Edit_Profile_Component from './Edit_Profile_Component';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Ghanshyam Sinha',
      email: 'ghanshyam_sinha859@gmail.com',
      mobileNumber: '91448 82901',
    };
    this.handleSavePress = this.handleSavePress.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onFullNameChange = this.onFullNameChange.bind(this);
    this.onMobileChange = this.onMobileChange.bind(this);
  }

  componentDidMount() {}

  handleSavePress = () => {};

  onEmailChange = value => {
    this.setState({
      email: value,
    });
  };
  onFullNameChange = value => {
    this.setState({
      name: value,
    });
  };
  onMobileChange = value => {
    this.setState({
      mobileNumber: value,
    });
  };

  render() {
    return (
      <>
        <Edit_Profile_Component
          handleSavePress={this.handleSavePress}
          state={this.state}
          onEmailChange={this.onEmailChange}
          onFullNameChange={this.onFullNameChange}
          onMobileChange={this.onMobileChange}
        />
      </>
    );
  }
}

export default EditProfileScreen;
