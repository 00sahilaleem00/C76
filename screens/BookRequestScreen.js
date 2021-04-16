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

export default class BookRequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      bookName: "",
      reasonToRequest: "",
    };
  }
  createUniqueID() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = () => {
    var randomRequestID = this.createUniqueID();
    db.collection("request_books").add({
      User_ID: this.state.userID,
      Book_Name: this.state.bookName,
      Reason_To_Request: this.state.reasonToRequest,
      Request_ID: randomRequestID,
    });
    this.setState({
      bookName: "",
      reasonToRequest: "",
    });
    return Alert.alert("Book Requested Successfully");
  };
  render() {
    return (
      <View>
        <MyHeader title="Request Book" navigation={this.props.navigation} />
        <KeyboardAvoidingView style={styles.keyboardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter Book Name"
            value={this.state.bookName}
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Why do you want the book?"
            value={this.state.reasonToRequest}
            multiline
            numberOfLines={10}
            onChangeText={(text) => {
              this.setState({
                reasonToRequest: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest();
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 5,
    marginTop: 10,
    padding: 5,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "blue",
    shadowColor: "white",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 15,
    marginTop: 10,
  },
});
