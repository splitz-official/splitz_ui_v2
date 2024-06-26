import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useAxios } from "../../../../Axios/axiosContext";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../../../../Config/Colors";
import Groups_list_item from "./Groups_list_item";

const Groups = ({ searchQuery }) => {
  const { userData, axiosInstance } = useAxios();
  const navigation = useNavigation();
  const [formattedData, setFormattedData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchGroups = useCallback(async () => {
    if (userData && userData.id) {
      setIsRefreshing(true);
      try {
        const response = await axiosInstance.get(`/room/user/${userData.id}`);
        setFormattedData(formatData(response.data, 3));
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
        }, 250);
        setDataFetched(true);
      }
    }
  }, [userData, axiosInstance]);

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [fetchGroups])
  );

  const formatData = (data, numColumns) => {
    const copy = [...data];
    if (!copy) return null;
    const numberOfFullRows = Math.floor(copy.length / numColumns);
    let numberOfElementsLastRow = copy.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      copy.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
    return copy;
  };

  const filteredData = formattedData.filter(
    (group) =>
      group.room_name &&
      group.room_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        onRefresh={fetchGroups}
        refreshing={isRefreshing}
        style={styles.groups_grid}
        data={formatData(filteredData, 3)}
        ListEmptyComponent={
          dataFetched && (
            <View style={{ alignItems: "center" }}>
              <LottieView
                source={require("../../../../assets/welcome_animation.json")}
                autoPlay={true}
                resizeMode="contain"
                style={{ width: "100%", height: verticalScale(300) }}
              >
                <Text style={styles.welcome_text}>
                  Create a group or split a bill to get started!
                </Text>
              </LottieView>
            </View>
          )
        }
        keyExtractor={(data) => (data.id ? data.id.toString() : data.key)}
        numColumns={3}
        renderItem={({ item }) => {
          if (item.empty === true) {
            return <View style={styles.empty} />;
          }
          return (
            <Groups_list_item
              title={item.room_name}
              image={item.room_picture_url}
              onPress={() => {
                navigation.navigate("Group_stack", {
                  screen: "Groups_details",
                  params: { room_code: item.room_code },
                }),
                  Haptics.selectionAsync();
              }}
              icon_text={item.room_code}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groups_grid: {
    paddingHorizontal: scale(10),
    flex: 1,
    marginBottom: "18%",
  },
  empty: {
    backgroundColor: "transparent",
    flex: 1,
    margin: 2,
  },
  welcome_text: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    bottom: "10%",
    fontFamily: "DMSans_500Medium",
    fontSize: RFValue(14),
    color: Colors.primary,
  },
});

export default Groups;
