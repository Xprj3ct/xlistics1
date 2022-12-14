import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, View, Button, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, Pressable, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import tw from 'twrnc';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";
import db, { authentication } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
// import CheckBox from '@react-native-community/checkbox';

// import CheckBox from '@react-native-community/checkbox'

const deviceHeight = Dimensions.get("window").height
const SignUp2 = () => {
    const navigation = useNavigation();
    // const [toggleCheckBox, setToggleCheckBox] = useState(false)


    const [phone, setPhone] = useState("+234")

    const [otp, setOtp] = useState('')
    const [user, setUser] = useState("")

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                setUser(user.uid)
                console.log("Sign-in provider: " + user.providerId);


            } else {
                setUser("No user")
            }
        })
    }, [])



    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, authentication)
    }

    const handleOTP = async () => {
        if (phone.length >= 12) {
            generateRecaptha()
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phone, appVerifier)
                .then((confirmationResult) => {

                    window.confirmationResult = confirmationResult
                })
                .catch((error) => {
                    alert(error)
                })

        } else {
            alert("invalid phone number")
        }
    }

    const verifyOTP = async () => {
        if (otp.length === 6) {
            console.log(otp)
            let confirmationResult = window.confirmationResult

            confirmationResult.confirm(otp).then(async (result) => {
                // User signed in successfully.
                console.log(result.user);
                setUser(result.user.uid)
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        uid: result.user.uid,
                        name: "unnamed",
                        age: "",
                        location: ""
                    })

                } catch (error) {
                    alert(error)
                }

            }).catch((error) => {
                // User couldn't sign in (bad verification code?)

            });

        }
    }

    const logout = () => {
        signOut(authentication)
            .then(() => {
                console.log("user has signed out")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    
  return (
    <TailwindProvider> 
      <SafeAreaView style={tw`flex-1 w-full h-full self-center bg-white`}>
      <View style={tw` items-center pt-15`}>
        <Image source={require('../assets/png.png')}  style={tw`w-24 h-6 mb-10 `}/>
      </View>
        <Text style={tw`text-4xl w-100 pl-5 self-center`}>Sign up</Text>
        <View
      style={tw`w-10 h-.5 bg-black rounded-lg ml-16 mt-3 mb-4`}/> 
        <Text style={tw`text-center text-lg`}>Do your thing X</Text>
      
       <View style={tw`p-2 mt-10 w-90 border-b self-center`}>
       <TextInput style={tw`h-6 rounded bg-gray-10`} value={phone} onChangeText={setPhone} placeholder='   Phone no' />
       </View>
       
       <View>
      
         <Text style={tw` p-2 text-sm w-80 self-center`}>By signing up you agree to our term of services and privacy policy</Text>
       </View>
       <View style={tw`pt-5 ml-60 w-30 self-center`}>
     
       <TouchableOpacity onPress={() => navigation.navigate("OtpScreen")} style={tw`h-10 w-full rounded-3xl bg-black`}>
          
        <Text style={tw`text-white text-lg text-center pt-1.5`}>Next</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default SignUp2;