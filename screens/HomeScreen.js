import {FlatList, StyleSheet, TouchableOpacity, View, Text, SafeAreaView, Image} from "react-native";
import React, {useState} from "react";
import tw from "twrnc";
// import NavOptions from "../components/NavOptions";
import { TailwindProvider } from "tailwindcss-react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ModalScreen } from "../components/ModalScreen";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { FontAwesome5 } from '@expo/vector-icons';


const data = ([
  {
      id: "012",
      title: "Book Courier",
      image: require("../assets/courier.png"),
      // screen: "ModalScreen",
  },
  {
      id: "123",
      title: "Book Proxy",
      image: require("../assets/proxy.png"),
      // screen: "BookScreen",
  },
]);

const HomeScreen = ({navigation}) => {
  let popupRef = React.createRef()
  
  const onShowPopup = () => {
    popupRef.show()
  }
  const onClosePopup = () => {
    popupRef.close()
  }
  

  return (
    
    <TailwindProvider>
     <SafeAreaView style={tw`bg-white h-full self-auto pt-2`}>
      <View style={tw`p-7`}>
        <Image
            style={{ 
                width: 60, 
                height: 60,
                resizeMode: "contain"
            }}
            source={require('../assets/icon.png')}
        />
       
        <GooglePlacesAutocomplete
          placeholder="Where from"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
        
        />

        {/* <NavOptions /> */}
        {/* <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity 
        // onPress={() => navigation.navigate(item.screen)}
        onPress={onShowPopup}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
          <View style={tw`w-150 h-50`}>
            <Image
              style= {{ width: 80, height: 100, resizeMode: "contain" }}
              source={item.image}
            />
            <Text style={tw`mt-2 text-lg font-semibold pl-2`}>{item.title}</Text>
            <Icon 
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name= "arrowright" color="white" type="antdesign" />
          </View>
        </TouchableOpacity>
        )}
    /> */}


<TouchableOpacity 
        // onPress={() => navigation.navigate(item.screen)}
        onPress={onShowPopup}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
          <View style={tw`w-150 h-50`}>
            <Image
              style= {{ width: 80, height: 100, resizeMode: "contain" }}
              source={data[0].image}
            />
            <Text style={tw`mt-2 text-lg font-semibold pl-2`}>Book Courier</Text>
            <Icon 
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name= "arrowright" color="white" type="antdesign" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        // onPress={() => navigation.navigate(item.screen)}
        onPress={onShowPopup}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
          <View style={tw`w-150 h-50`}>
            <Image
              style= {{ width: 80, height: 100, resizeMode: "contain" }}
              source={data[1].image}
            />
            <Text style={tw`mt-2 text-lg font-semibold pl-2`}>{data[1].title}</Text>
            <Icon 
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name= "arrowright" color="white" type="antdesign" />
          </View>
        </TouchableOpacity>

      </View>
      
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginLeft: 200, marginTop: -400}}>
        <Text style={{fontSize: 20}}
        >Welcome Back Jane</Text>
      </View>

      <View
      style={tw`items-center bg-gray-200 w-15 justify-end p-2 rounded-l-lg ml-90`}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={24} color="black"  />
        </TouchableOpacity>
      </View>
      
      <ModalScreen
        title
        ref={(target) => popupRef = target}
        onTouchOutside={onClosePopup}
        onPress={onClosePopup}
        // data={popupList}
      />
    
      </SafeAreaView>
    </TailwindProvider>
  );
};


export default HomeScreen

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})