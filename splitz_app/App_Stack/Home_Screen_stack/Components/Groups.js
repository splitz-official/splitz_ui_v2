import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../../Axios/axiosContext'

const Groups = () => {

    const { userData, axiosInstance } = useAxios();
    const [groupsData, setGroupsData] = useState(null);
    // console.log("User ID: " + userData.id)
    

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                console.log("From groups screen: getting rooms")
                const response = await axiosInstance.get(`/room/user/${userData.id}`);
                setGroupsData(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Failed to fetch groups:", err);
            }
        };
        if (userData && userData.id) {
            fetchGroups();
        }
    }, [userData]);

  return (
    <View>
      
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Groups
