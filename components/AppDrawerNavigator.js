import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import SideBarMenu from "./SideBarMenu";
import MyDonationScreen from "../screens/MyDonationScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SettingsScreen from "../screens/SettingsScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
    },
    MyDonations: {
      screen: MyDonationScreen,
    },
    Notifications: {
      screen: NotificationScreen,
    },
    Setting: {
      screen: SettingsScreen,
    },
  },
  {
    contentComponent: SideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
