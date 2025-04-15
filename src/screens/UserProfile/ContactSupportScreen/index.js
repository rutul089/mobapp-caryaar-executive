import React, {Component} from 'react';

import Contact_Support_Component from './Contact_Support_Component';

class ContactSupportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCreateNewWallet = this.handleCreateNewWallet.bind(this);
    this.handleImportWallet = this.handleImportWallet.bind(this);
  }

  componentDidMount() {}

  handleCreateNewWallet = () => {};

  handleImportWallet = () => {};

  render() {
    return (
      <>
        <Contact_Support_Component
          button1Press={this.handleCreateNewWallet}
          button2Press={this.handleImportWallet}
        />
      </>
    );
  }
}

export default ContactSupportScreen;
