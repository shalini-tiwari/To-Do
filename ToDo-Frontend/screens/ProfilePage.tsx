import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";

interface Props {
  navigation: any;
}

const ProfilePage: React.FC<Props> = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState<any>(false);
  const [name, setName] = useState<any>("John Doe");
  const [username, setUsername] = useState<any>("@johndoe");
  const [email, setEmail] = useState<any>("johndoe@example.com");

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.clear();
    Alert.alert(
      "Logged out successfully!, Restart your application to see changes"
    );
    navigation.navigate("Root", { screen: "Login" });
  };

  useEffect(() => {
    const getData = async () => {
      const name = await AsyncStorage.getItem("name");
      const username = await AsyncStorage.getItem("name");
      const email = await AsyncStorage.getItem("email");
      setName(name);
      setUsername(`@${username}`);
      setEmail(email);
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        style={styles.profileImage}
      />
      {isEditing ? (
        <TextInput style={styles.name} value={name} onChangeText={setName} />
      ) : (
        <Text style={styles.name}>{name}</Text>
      )}
      {isEditing ? (
        <TextInput
          style={styles.username}
          value={username}
          onChangeText={setUsername}
        />
      ) : (
        <Text style={styles.username}>{username}</Text>
      )}
      <Text style={styles.bio}>
        I'm a software engineer and I love to code!
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.infoValue}
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.infoValue}>{email}</Text>
        )}
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
          <Text style={styles.actionText}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.actionButton}>
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    marginTop: "35%",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    color: "gray",
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
    marginLeft: 10,
  },
  actionContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: "lightgray",
  },
  actionText: {
    fontSize: 16,
  },
});

export default ProfilePage;
