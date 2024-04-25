import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { scale } from 'react-native-size-matters';
import Screen from '../../../Components/Screen';
import Back_button from '../../../Components/Back_button';
import Colors from '../../../Config/Colors';
import Large_green_button from '../../../Components/Large_green_button';
import { useAxios } from '../../../Axios/axiosContext';
import Participants_list_item from './Components/Participants_list_item';



//TODO:
//ADD GRID LIST WHEN FRIENDS ARE ADDED
//ADD FILTERING OF LIST WHEN FRIENDS ARE ADDED
//Add user as default participant
//ADD QR FUNCTIONALITY WHEN AVAILABLE
//think about how to add friends. Need endpoint to add others to your room
//users: [{id: 1, name: "charles"}, {id: 2, name: "Ray"}] [{name: "Charles"}, {name: "Ray"}]


const Bill_participants = () => {

    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [userList, setUserList] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const {axiosInstance} = useAxios();

    const getRandomColor = () => {
        // Generate random numbers for RGB
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`; // Return RGB color string
    };

    useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/user/get-friends');
                setUserList(response.data);
                setFilteredUserList(response.data);
                setLoading(false);
            } catch (err) {
                console.log("Error: ", err)
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    useEffect(() => {
        const filterUsers = () => {
            let combinedList = [];
    
            if (search.trim()) {
                // Adding the "Add" option at the beginning of the list
                combinedList.push({ id: 'temp', name: `Add "${search}" to your participant list` });
            }
    
            const filtered = userList.filter(user => {
                return user.name.toLowerCase().includes(search.toLowerCase()) ||
                       user.username.toLowerCase().includes(search.toLowerCase());
            });
    
            combinedList = [...combinedList, ...filtered];
            setFilteredUserList(combinedList);
        };
    
        filterUsers();
    }, [search, userList]); // No need to depend on 'participants' unless it affects the filtering logic
    
    const addParticipant = (user) => {
        const participantToAdd = typeof user === 'string' ? 
            { name: user, id: `temp-${Math.random()}`, color: getRandomColor() } : 
            { ...user, color: getRandomColor() }; // Assign a random color here
    
        if (!participants.some(participant => participant.name === participantToAdd.name)) {
            setParticipants([...participants, participantToAdd]);
            setSearch(''); // Optionally clear the search input after adding
        }
    };

    const removeParticipant = (participantId) => {
        const updatedParticipants = participants.filter(participant => participant.id !== participantId);
        setParticipants(updatedParticipants);
    };

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} />;
    }
    

  return (
    <Screen>
        <Back_button 
        onPress={()=> navigation.goBack()}
        title={'Back'}
        />
        <KeyboardAvoidingView
        behavior='height'
        style={{flex: 1}}
        >
            {/*<TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss(); return true;}}>*/}
                <View style={{flex: 1}}>
                <View style={styles.bottom_container}>
                    <Text style={styles.title_text}>Bill Participants</Text>
                    {participants.length > 0 && (
    <View style={styles.participantsContainer}>
        <FlatList
            data={participants}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            keyExtractor={item => item.id.toString()}
            onScrollBeginDrag={Keyboard.dismiss}
            renderItem={({ item }) => (
                <View style={styles.participantItemContainer}>
                    <View style={[styles.participantCircle,  { backgroundColor: item.color }]}>
                        <TouchableOpacity
                            style={styles.removeParticipantBtn}
                            onPress={() => removeParticipant(item.id)}
                        >
                            <AntDesign name="closecircle" size={RFValue(14)} color="red" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.participantName} numberOfLines={2} ellipsizeMode='tail'>{item.name}</Text>
                </View>
            )}
        />
    </View>
)}

                    <Text style={styles.subtitle_text}>Add everyone's names below:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                        style={styles.textInput}
                        placeholder='Enter a full name or username...'
                        placeholderTextColor={Colors.textgray}
                        value={search}
                        onChangeText={setSearch}
                        autoFocus={true}
                        keyboardType='default'
                        autoCorrect={false}
                        clearButtonMode='always'
                        />
                        </View>
                        {search.trim().length > 0 && filteredUserList.length > 0 && 
                    <FlatList
                    data={filteredUserList}
                    keyExtractor={item => item.id.toString()}
                    onScrollBeginDrag={Keyboard.dismiss}
                    renderItem={({ item }) => {
                        if (item.id === 'temp') {
                            return (
                                <TouchableOpacity
                                    style={styles.addTemporaryUser}
                                    onPress={() => addParticipant(search.trim())}
                                >
                                    <Text style={styles.addTemporaryUserText}>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        } else {
                            return (
                                <Participants_list_item
                                    name={item.name}
                                    username={item.username}
                                    onPress={() => addParticipant(item)}
                                />
                            );
                        }
                    }}
                    />
                    }

                    {/*<TouchableOpacity style={styles.QR_Code} activeOpacity={.5} onPress={()=> console.log("QR PRESSED BUT NO FUNCTION :)")}>
                        <MaterialCommunityIcons name="qrcode-scan" size={RFValue(16)} color={Colors.primary} />
                        <Text style={styles.QR_text}> Scan QR Code</Text>
                    </TouchableOpacity>
                    }

                    <Text style={[styles.subtitle_text, {marginTop: 40}]}>Quick Add Participants</Text>
                    {/* {participants.length > 0 ? (
                        <FlatList 
                        data={participants}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({item, index}) => 
                            <View style={{flexDirection: 'row', marginVertical: scale(5), alignItems: 'center'}}>
                                <Text style={{fontFamily: 'DMSans_500Medium', fontSize: RFValue(14), marginRight: scale(5)}}>{item}</Text>
                                <TouchableOpacity activeOpacity={.5} onPress={() => removeParticipant(index)}>
                                    <AntDesign name="closecircle" size={scale(16)} color="gray" />
                                </TouchableOpacity>
                            </View>
                        }
                        style={styles.participants_list}
                        />
                    ): (
                        <Text style={{marginTop: 40, fontSize: RFValue(18)}}>You have no friends!</Text>
                    )} */}
                </View>
                {/* <Large_green_button 
                title={'Next'}
                onPress={()=> navigation.navigate('upload_or_take_photo', route.params)}
                /> */}
                <Large_green_button title={'Next'} onPress={()=>navigation.navigate('Upload_take_photo', {participants})} disabled={participants.length === 0}/>
                </View>
            {/*</TouchableWithoutFeedback>*/}
        </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    bottom_container: {
        marginHorizontal: '6%',
        marginTop: 20
    },
    title_text: {
        fontSize: RFValue(18),
        fontFamily: 'DMSans_700Bold',
    },
    subtitle_text: {
        fontSize: RFValue(14),
        fontFamily: 'DMSans_500Medium',
        marginTop: 20
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 15,
        borderColor: Colors.textInputGray,
        fontFamily: 'DMSans_400Regular',
        fontSize: RFValue(12),
        padding: 10,
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },  
    participants_list: {
        marginTop: scale(15),
        // borderWidth: 1,
    },
    QR_Code: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: scale(10),
        marginLeft: scale(5),
        // borderWidth: 2
    },
    QR_text: {
        fontSize: RFValue(12), 
        color: Colors.textgray
    },
    addTemporaryUser: {
        padding: scale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
      },
      addTemporaryUserText: {
        fontSize: RFValue(12),
        color: Colors.primary, // Use your app's theme color here
      },
      participantsContainer: {
        marginTop: scale(10),
        paddingHorizontal: scale(5),
        height: scale(90), // Adjust the height to accommodate both the circle and the name
    },
    participantItemContainer: {
        flexDirection: "column",
        alignItems: 'center', // Center align the items vertically
        marginRight: scale(10),
        width: scale(65),
        minHeight: scale(70),
        justifyContent: "flex-start", // Align items starting from the top
        display: 'flex',
        flexGrow: 1,
    },
    participantCircle: {
        width: scale(45),
        height: scale(45),
        borderRadius: scale(25),
        backgroundColor: "grey",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: scale(5), // Maintain a small gap between the circle and the name
        marginTop: scale(5),
    },
    participantName: {
        fontSize: RFValue(12),
        color: 'black',
        textAlign: 'center',
        width: "100%",
        paddingTop: scale(2), // Minimal padding to ensure text is close to the circle
    },
    removeParticipantBtn: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'white',
        borderRadius: scale(100),
        padding: scale(3),
    },
});

export default Bill_participants
