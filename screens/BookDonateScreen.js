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
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";
import db from "../config.js";
import firebase from "firebase";
import SantaAnimation from "../components/SantaAnimation";
import MyHeader from "../components/MyHeader";

export default class BookDonateScreen extends Component {
  constructor() {
    super();
    this.state = {
      allRequests: [],
    };
    this.requestRef = null;
  }

  getAllRequests = () => {
    this.requestRef = db.collection("request_books").onSnapshot((snapshot) => {
      var allRequestsArray = snapshot.docs.map((document) => document.data());
      this.setState({
        allRequests: allRequestsArray,
      });
    });
  };

  componentDidMount = () => {
    this.getAllRequests();
  };

  componentWillUnmount = () => {
    this.requestRef();
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    // <ListItem
    //   key={i}
    //   title={item.Book_Name}
    //   subtitle={item.Reason_To_Request}
    //   titleStyle={{ color: "black", fontWeight: "bold" }}
    //   rightElement={
    //     <TouchableOpacity style={styles.button}>
    //       <Text style={{ color: "#ffff" }}>Donate</Text>
    //     </TouchableOpacity>
    //   }
    //   bottomDivider
    // />

    <ListItem
      key={i}
      bottomDivider
      // rightElement={
      //   <TouchableOpacity style={styles.button}>
      //     <Text style={{ color: "#ffff" }}>Donate</Text>
      //   </TouchableOpacity>
      // }
    >
      <ListItem.Content>
        <ListItem.Title>{item.Book_Name}</ListItem.Title>
        <ListItem.Subtitle>{item.Reason_To_Request}</ListItem.Subtitle>
        {/* <ListItem.RightElement> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("ReceiverDetails", {
              details: item,
            });
          }}
        >
          <Text style={{ color: "#ffff" }}>Donate</Text>
        </TouchableOpacity>
        {/* </ListItem.RightElement> */}
      </ListItem.Content>
    </ListItem>

    // <ListItem
    //   title={item.Book_Name}
    //   subtitle={item.Reason_To_Request}
    //   bottomDivider
    // />
  );
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Donate Books" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.allRequests.length === 0 ? (
            <View
              style={{
                flex: 1,
                fontSize: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>List of all book requests</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allRequests}
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
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
