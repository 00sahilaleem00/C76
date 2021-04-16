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

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      address: "",
      mobile_number: "",
      isModalVisible: false,
    };
  }

  userLogin(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("DonateBooks");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  }

  userSignUp(email, password, confirmPassword) {
    if (password != confirmPassword) {
      Alert.alert("Passwords Must Match!");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection("users").add({
            Address: this.state.address,
            First_name: this.state.first_name,
            Last_name: this.state.last_name,
            Mobile_Number: this.state.mobile_number,
            Username: this.state.emailID,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => {
                this.setState({
                  isModalVisible: false,
                });
              },
            },
          ]);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  }

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}></View>
        <ScrollView style={{ width: "80%" }} />
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
          <Text style={styles.modalTitle}>REGISTRATION</Text>
          <TextInput
            style={styles.inputBox}
            placeholder={"emailID@example.com"}
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailID: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                confirmPassword: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"First Name"}
            onChangeText={(text) => {
              this.setState({
                first_name: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"Last Name"}
            onChangeText={(text) => {
              this.setState({
                last_name: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"Address"}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            placeholder={"contact number"}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(text) => {
              this.setState({
                mobile_number: text,
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.userSignUp(
                this.state.emailID,
                this.state.password,
                this.state.confirmPassword
              );
            }}
          >
            <Text>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>{this.showModal()}</View>
        <View style={styles.container}>
          <Text>BOOK SANTA</Text>
        </View>
        <View style={styles.container}>
          <SantaAnimation />
          <TextInput
            style={styles.inputBox}
            placeholder={"emailID@example.com"}
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailID: text,
              });
            }}
          />
          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            placeholder={"password"}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.userLogin(this.state.emailID, this.state.password);
            }}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
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
