import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, doc, updateDoc} from 'firebase/firestore'
import db from '../src/firebase'
import { UserContext } from '../context/userContext'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native'


const InterCity = ({navigate}) => {
    const navigation = useNavigation();

    const [interCity, setInterCity] = useState(null)
    const [go, setGo] = useState(false)
    const {user} = useContext(UserContext)

    
    const getCity = async () => {

        const col = collection(db, `openBookings`)
        const q = query(col, where("status", "==", "open"), where("category", "==","Intercity"));
       
        onSnapshot(q, (snapshot) => {
            setInterCity(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            setGo(true)
        })
    }

    const handleChat = (client) => {
        // console.log("now:", client)
        navigation.navigate("Chat", {
            client: client
        })
    }

    const handleAccept = async (data) => {
        const col = collection(db, `openBookings`, data.id)
        
        await updateDoc(col, {
            status: "closed",
            proxy: user.uid
          });

        // navigation.navigate("Chat", {
        //     client: client
        // })
    }


    useEffect(() => {
        const colRef = collection(db, "proxy")
        const q = query(colRef, where("uid", "==", user.uid))
        // getUserProfile()

        onSnapshot(q, (snapshot) => {
            // console.log(snapshot.docs)
            if (snapshot.docs.length !== 0) {
                getCity()
            } else {
                console("No Permission")
            }
        })
        

    }, [])

  return (
    <View>
         {go ? (
         <>
          {interCity.map(({ id, data }) => (
                        <View key={id}>
                           <Text> to: {data.destination}</Text>
                           <Text>  Amount: {data.amount}</Text>
                           <Text>  desc: {data.desc}</Text>
                           
                           <TouchableOpacity  onPress={() => handleAccept(data)}  style={tw`h-10 w-80 rounded-md bg-black self-center mb-2`} > 
        <Text style={tw`text-white text-lg text-center pt-2.5`}>Accept Order</Text>
      </TouchableOpacity>

                           <TouchableOpacity  onPress={() => handleChat(data.user)}  style={tw`h-10 w-80 rounded-md bg-black self-center mb-2`} > 
        <Text style={tw`text-white text-lg text-center pt-2.5`}>chat with client</Text>
      </TouchableOpacity>
                        </View>
                    ))}
                </>
         )
          : (
            <Text>  Wahala </Text>                        
          )}
      
    </View>
  )
}

export default InterCity

const styles = StyleSheet.create({})