import React, { useState} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import axios from 'axios';

import SearchBar from '../../../../Components/SearchBar';

const Bills_Content = () => {

    const [receipts, setReceipts] = useState([])
    baseURL = "http://3.14.255.133"
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3IiOnsiaWQiOjMsInBob25lX251bWJlciI6IisxNjI2ODA4Njk1OSJ9LCJleHAiOjE3MDg3NTM0NjF9.lwuTFXk3vpU5kWhDj7EhSH-FxJtgKlnDyetQqGLRyd4"

    const get_receipts = ()=> {
        axios
          .get(`${baseURL}/receipts/receipts-list`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((response) => {
            // Checking if the name field exists
            setReceipts(response.data)
            console.log(response.data)
          })
          .catch((error) => {
            console.log("error here 1: ", error);
          });
    }   

    return (
      <View style={styles.container}>
        <SearchBar
            search_styles={{ marginBottom: 15, marginTop: 5 }}
            placeholder={"Group, bill name, person..."}
        />
        <Button title='click me' onPress={get_receipts}></Button>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex:1
    }
})

export default Bills_Content;