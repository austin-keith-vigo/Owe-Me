import React, { Component } from 'react';

import Dialog from "react-native-dialog";

const  Alert = (props) => {
  return (
    <Dialog.Container visible={props.isVisible}>
      <Dialog.Title>{props.errorMessage}</Dialog.Title>
      <Dialog.Button
        label="Close"
        onPress={props.closeAlert}
      />
    </Dialog.Container>
  );
};

export default Alert;
