import React, { Component } from 'react';

import Dialog from "react-native-dialog";

class Alert extends Component {
  render() {
    return (
      <Dialog.Container visible={this.props.isVisible}>
        <Dialog.Title>{this.props.errorMessage}</Dialog.Title>
        <Dialog.Button
          label="Close"
          onPress={this.props.closeAlert}
        />
      </Dialog.Container>
    );
  }
}

export default Alert;
