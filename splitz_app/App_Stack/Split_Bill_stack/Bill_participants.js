import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { scale } from "react-native-size-matters";
import Screen from "../../../Components/Screen";
import Back_button from "../../../Components/Back_button";
import Colors from "../../../Config/Colors";
import Large_green_button from "../../../Components/Large_green_button";
import { useAxios } from "../../../Axios/axiosContext";
import Participants_list_item from "./Components/Participants_list_item";
import Profile_picture from "../../../Components/Profile_picture";

const Bill_participants = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { axiosInstance, userData } = useAxios();

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/user/get-friends");
        setUserList(response.data);
        setFilteredUserList(response.data);

        setParticipants([
          {
            id: userData.id,
            name: userData.name,
            username: userData.username,
            profile_picture_url: userData.profile_picture_url,
          },
        ]);

        setLoading(false);
      } catch (err) {
        console.log("Error: ", err);
        setLoading(false);
      }
    };

    fetchFriends();
  }, [axiosInstance, userData]);

  useEffect(() => {
    const filterUsers = () => {
      let combinedList = [];
      if (search.trim()) {
        combinedList.push({
          id: "temp",
          name: `Add "${search}" to your participant list`,
        });
      }
      const filtered = userList.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase())
      );
      combinedList = [...combinedList, ...filtered];
      setFilteredUserList(combinedList);
    };

    filterUsers();
  }, [search, userList]);

  const addParticipant = (user) => {
    let participantToAdd;
    if (typeof user === "string") {
      participantToAdd = {
        name: user,
        id: `temp-${Date.now()}`,
      };
    } else {
      participantToAdd = { ...user };
    }
    if (
      !participants.some(
        (participant) => participant.id === participantToAdd.id
      )
    ) {
      setParticipants([...participants, participantToAdd]);
      setSearch("");
    }
  };

  const navigateToNextScreen = () => {
    const participantsForNextScreen = participants.map((participant) => {
      if (
        typeof participant.id === "string" &&
        participant.id.startsWith("temp-")
      ) {
        return { name: participant.name };
      }
      return participant;
    });
    navigation.navigate("Upload_take_photo", {
      participants: participantsForNextScreen,
    });
  };

  const removeParticipant = (participantId) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== participantId
    );
    setParticipants(updatedParticipants);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>;
  }

  return (
    <Screen>
      <Back_button onPress={() => navigation.goBack()} title={"Back"} />
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.bottom_container}>
            <Text style={styles.title_text}>Bill Participants</Text>
            {participants.length > 0 && (
              <View style={styles.participantsContainer}>
                <FlatList
                  data={participants}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  snapToAlignment="center"
                  decelerationRate="fast"
                  keyExtractor={(item) => item.id.toString()}
                  onScrollBeginDrag={Keyboard.dismiss}
                  renderItem={({ item }) => (
                    <View style={styles.participantItemContainer}>
                      <View style={styles.participantCircle}>
                        <Profile_picture
                          image={item.profile_picture_url}
                          name={item.name}
                          sizing_style={styles.profile_pic}
                          text_sizing={{ fontSize: RFValue(20) }}
                        />
                        <TouchableOpacity
                          style={styles.removeParticipantBtn}
                          onPress={() => removeParticipant(item.id)}
                        >
                          <AntDesign
                            name="closecircle"
                            size={RFValue(14)}
                            color="red"
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={styles.participantName}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                    </View>
                  )}
                  style={styles.horizontalFlatList}
                />
              </View>
            )}
            <Text style={styles.subtitle_text}>
              Add everyone else's names below:
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter a full name or username..."
                placeholderTextColor={Colors.textgray}
                value={search}
                onChangeText={setSearch}
                autoFocus={true}
                keyboardType="default"
                autoCorrect={false}
                clearButtonMode="always"
              />
            </View>
            {search.trim().length > 0 && filteredUserList.length > 0 && (
              <FlatList
                data={filteredUserList}
                keyExtractor={(item) => item.id.toString()}
                onScrollBeginDrag={Keyboard.dismiss}
                renderItem={({ item }) => {
                  if (item.id === "temp") {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.addTemporaryUser}
                        onPress={() => addParticipant(search.trim())}
                      >
                        <Text style={styles.addTemporaryUserText}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <Participants_list_item
                        name={item.name}
                        username={item.username}
                        onPress={() => addParticipant(item)}
                        image={item.profile_picture_url}
                      />
                    );
                  }
                }}
              />
            )}
          </View>
          <Large_green_button
            title={"Next"}
            onPress={navigateToNextScreen}
            disabled={participants.length === 0}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  bottom_container: {
    marginHorizontal: "6%",
    marginTop: 20,
  },
  title_text: {
    fontSize: RFValue(18),
    fontFamily: "DMSans_700Bold",
  },
  subtitle_text: {
    fontSize: RFValue(14),
    fontFamily: "DMSans_500Medium",
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    borderColor: Colors.textInputGray,
    fontFamily: "DMSans_400Regular",
    fontSize: RFValue(12),
    padding: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addTemporaryUser: {
    padding: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  addTemporaryUserText: {
    fontSize: RFValue(12),
    color: Colors.primary,
  },
  participantsContainer: {
    marginTop: scale(10),
    paddingHorizontal: scale(5),
    height: scale(90),
  },
  participantItemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: scale(10),
    width: scale(65),
    minHeight: scale(70),
    justifyContent: "flex-start",
    display: "flex",
    flexGrow: 1,
  },
  participantCircle: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(25),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: scale(5),
    marginTop: scale(5),
  },
  participantName: {
    fontSize: RFValue(12),
    color: "black",
    textAlign: "center",
    width: "100%",
    paddingTop: scale(2),
  },
  removeParticipantBtn: {
    position: "absolute",
    top: scale(-8),
    right: scale(-8),
    backgroundColor: "white",
    borderRadius: scale(100),
    padding: scale(3),
  },
  profile_pic: {
    height: scale(55),
    width: scale(55),
  },
  horizontalFlatList: {
    overflow: "hidden", // Ensure the container doesn't overflow and hide the scrollbar
  },
});

export default Bill_participants;
