import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import ToDoScreen from "./ToDoScreen";
import ProfilePage from "./ProfilePage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

//Screen names
const homeName = "Home";
const settingsName = "Profile";

const Tab = createBottomTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            // You can return any component that you like here!
            return <Icon name={iconName!} size={size} color={color} />;
          },
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        })}
      >
        <Tab.Screen name={homeName} component={ToDoScreen} />
        <Tab.Screen name={settingsName} component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;
