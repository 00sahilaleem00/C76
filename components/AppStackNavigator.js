import React from "react";
import { Image } from "react-native";
import BookDonateScreen from "../screens/BookDonateScreen";
import ReceiverDetailsScreen from "../screens/ReceiverDetailsScreen";
import { createStackNavigator } from "react-navigation-stack";

export const AppStackNavigator = createStackNavigator(
  {
    BookDonateList: {
      screen: BookDonateScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReceiverDetails: {
      screen: ReceiverDetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  { initialRouteName: "BookDonateList" }
);
