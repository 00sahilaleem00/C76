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
import { Card } from "react-native-elements";

import db from "../config.js";
import firebase from "firebase";
import SantaAnimation from "../components/SantaAnimation";
import MyHeader from "../components/MyHeader";

export default class ReceiverDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      receiverID: this.props.navigation.getParam("details")["User_ID"],
      bookName: this.props.navigation.getParam("details")["Book_Name"],
      requestID: this.props.navigation.getParam("details")["Request_ID"],
      reasonToRequest: this.props.navigation.getParam("details")[
        "Reason_To_Request"
      ],
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      receiverRequestDocumentID: "",
    };
  }
  componentDidMount = () => {
    this.getReceiverDetails();
  };
  getReceiverDetails = () => {
    db.collection("users")
      .where("Username", "==", this.state.receiverID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().First_name,
            receiverContact: doc.data().Mobile_Number,
            receiverAddress: doc.data().Address,
          });
          console.log(doc.data());
        });
      });
    db.collection("request_books")
      .where("Request_ID", "==", this.state.requestID)
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          this.setState({
            receiverRequestDocumentID:docID ,
          });
        })
      );
  };

  updateBookStatus = () => {
    db.collection("all_donations").add({
      Book_Name: this.state.bookName,
      Request_ID: this.state.requestID,
      Requested_By: this.state.receiverName,
      Donor_ID: this.state.userID,
      Request_Status: "Donor Interested",
    });
  };

  addNotification = () => {
    var message =
      this.state.userID + " has shown interest in donating the book";
    db.collection("all_notifications").add({
      Target_User_ID: this.state.receiverID,
      Donor_ID: this.state.userID,
      Request_ID: this.state.requestID,
      Book_Name: this.state.bookName,
      Date: firebase.firestore.FieldValue.serverTimestamp(),
      Notification_Status: "Unread",
      Notification_Message: message,
    });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Card>
            <Text>ID of Receiver: {this.state.receiverID}</Text>
          </Card>
          <Card>
            <Text>Name of Book: {this.state.bookName}</Text>
          </Card>
          <Card>
            <Text>Reason to Request: {this.state.reasonToRequest}</Text>
          </Card>
          <Card>
            <Text>Name: {this.state.receiverName}</Text>
          </Card>
          <Card>
            <Text>Contact: {this.state.receiverContact}</Text>
          </Card>
          <Card>
            <Text>Address: {this.state.receiverAddress}</Text>
          </Card>
        </View>
        <View style={styles.container}>
          {this.state.receiverID !== this.state.userID ? (
            <TouchableOpacity
              style={{ margin: 100 }}
              onPress={() => {
                this.updateBookStatus();
                this.addNotification();
                this.props.navigation.navigate("MyDonations");
              }}
            >
              <Text>I want to Donate</Text>
            </TouchableOpacity>
          ) : null}
        </View>
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
