import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./App/screens/home/home";
import { NewTodo } from "./App/screens/currentTodo/newTodo";
import { ViewTodo } from "./App/screens/completedTodo/viewTodo";
import ViewIcon from "./App/assets/icons/home.png";
import HomeDark from "./App/assets/icons/homeDark.png";
import Eye from "./App/assets/icons/view.png";
import DarkEye from "./App/assets/icons/eye.png";
import circle from "./App/assets/icons/circle.png";
import Dark from "./App/assets/icons/circleDark.png";
import { Image } from "react-native";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "AddTask") {
              iconName = focused ? HomeDark : ViewIcon;
            } else if (route.name === "Current Task") {
              iconName = focused ? DarkEye : Eye;
            } else if (route.name === "Completed Task") {
              iconName = focused ? Dark : circle;
            }
            return (
              <Image source={iconName} style={{ width: 24, height: 24 }} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="AddTask" component={Home} />
        <Tab.Screen name="Current Task" component={NewTodo} />
        <Tab.Screen name="Completed Task" component={ViewTodo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
