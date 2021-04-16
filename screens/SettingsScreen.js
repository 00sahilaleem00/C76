import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Header,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import db from "../config.js";
import firebase from "firebase";
import SantaAnimation from "../components/SantaAnimation";
import MyHeader from "../components/MyHeader";

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      contactNumber: "",
      address: "",
      docID: "",
    };
  }
  getUserDetails = () => {
    var user = firebase.auth().currentUser;
    var email = user.email;
    db.collection("users")
      .where("Username", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailID: data.Username,
            firstName: data.First_name,
            lastName: data.Last_name,
            contactNumber: data.Mobile_Number,
            address: data.Address,
            docID: doc.id,
          });
        });
      });
  };
  updateUserDetails = () => {
    db.collection("users")
      .doc(this.state.docID)
      .update({
        First_name: this.state.firstName,
        Last_name: this.state.lastName,
        Mobile_Number: this.state.contactNumber,
        Address: this.state.address,
      })
      .then(() => {
        Alert.alert("User details successfully updated");
      });
  };
  componentDidMount = () => {
    this.getUserDetails();
  };
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Settings" navigation={this.props.navigation} />
        <TextInput
          placeholder={"First Name"}
          onChangeText={(text) => {
            this.setState({
              firstName: text,
            });
          }}
          value={this.state.firstName}
        />
        <TextInput
          placeholder={"Last Name"}
          onChangeText={(text) => {
            this.setState({
              lastName: text,
            });
          }}
          value={this.state.lastName}
        />
        <TextInput
          placeholder={"contactNumber"}
          keyboardType={"numeric"}
          maxLength={10}
          onChangeText={(text) => {
            this.setState({
              contactNumber: text,
            });
          }}
          value={this.state.contactNumber}
        />
        <TextInput
          placeholder={"Address"}
          multiline={true}
          onChangeText={(text) => {
            this.setState({
              address: text,
            });
          }}
          value={this.state.address}
        />
        <TouchableOpacity
          onPress={() => {
            this.updateUserDetails();
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  inputBox: {
    margin: 10,
    borderWidth: 2,
  },
  modalContainer: {
    margin: 10,
  },
  keyboardAvoidingView: {
    margin: 10,
  },
  modalTitle: {
    backgroundColor: "red",
  },
});
