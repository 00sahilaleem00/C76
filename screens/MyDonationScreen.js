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
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import MyHeader from "../components/MyHeader";

import db from "../config.js";
import firebase from "firebase";
import SantaAnimation from "../components/SantaAnimation";

export default class MyDonationScreen extends Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      allDonations: [],
    };
    this.requestRef = null;
  }
  getAllDonations = () => {
    this.requestRef = db
      .collection("all_donations")
      .where("Donor_ID", "==", this.state.userID)
      .onSnapshot((snapshot) => {
        var allDonationsArray = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation["Document_ID"] = doc.id;
          allDonationsArray.push(donation);
        });
        this.setState({
          allDonations: allDonationsArray,
        });
      });
  };
  componentDidMount = () => {
    this.getAllDonations();
  };
  componentWillUnmount = () => {
    this.requestRef();
  };

  sendNotification = (bookDetails, requestStatus) => {
    var requestID = bookDetails.Request_ID;
    var donorID = bookDetails.Donor_ID;
    db.collection("all_notifications")
      .where("Request_ID", "==", requestID)
      .where("Donor_ID", "==", donorID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = "";
          if (requestStatus === "Book Sent") {
            message = donorID + " sent you the book";
          } else {
            message = donorID + " has shown interest in donating the book";
          }
          db.collection("all_notifications").doc(doc.id).update({
            Notification_Message: message,
            Notification_Status: "Unread",
            Date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  sendBook = async (bookDetails) => {
    if (bookDetails.Request_Status === "Book Sent") {
      var docID;
      var requestStatus = "Donor Interested";
      await db
        .collection("all_donations")
        .where("Request_ID", "==", bookDetails.Request_ID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            docID = doc.id;
            console.log(docID);
          });
        });
      db.collection("all_donations").doc(docID).update({
        Request_Status: "Donor Interested",
      });
      this.sendNotification(bookDetails, requestStatus);
    } else {
      var docID;
      var requestStatus = "Book Sent";
      await db
        .collection("all_donations")
        .where("Request_ID", "==", bookDetails.Request_ID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            docID = doc.id;
            console.log(docID);
          });
        });
      db.collection("all_donations").doc(docID).update({
        Request_Status: "Book Sent",
      });
      this.sendNotification(bookDetails, requestStatus);
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem key={i} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.Book_Name}</ListItem.Title>
        <ListItem.Subtitle>
          {"Requested By:" +
            item.Requested_By +
            "\n Status: " +
            item.Request_Status}
        </ListItem.Subtitle>
        {/* <Icon name="book" type="font-awesome" color="#696969" /> */}
        <TouchableOpacity
          style={{
            backgroundColor:
              item.Request_Status === "Book Sent" ? "green" : "#ff5722",
          }}
          onPress={() => {
            this.sendBook(item);
          }}
        >
          <Text style={{ color: "#ffff" }}>
            {item.Request_Status === "Book Sent" ? "Book Sent" : "Send Book"}
          </Text>
        </TouchableOpacity>
      </ListItem.Content>
    </ListItem>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} title="My Donations" />
        <View style={{ flex: 1 }}>
          {this.state.allDonations.length === 0 ? (
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 20 }}>List of all Book Donations</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allDonations}
              renderItem={this.renderItem}
            />
          )}
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
