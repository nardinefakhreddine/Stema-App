import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import  { useEffect, useState } from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Home} from "./Screens/Home";
import {Login} from "./Screens/Login";
import {Nado} from "./Screens/Nado";

function HomeScreen({navigation}){
return(
  
<View style={{flex:1 , justifyContent:"center",alignItems:'center'}}>
  <Text>Home Screen </Text>
  <Button title="Go to Details" onPress={()=>navigation.navigate("Details",{
    ItemId:1,
    Message:"hello world"
  })}> </Button>
</View>
);
}


function DetailScreen({navigation, route}){
  const {ItemId,Message}=route.params;
  return(
  <View style={{flex:1 , justifyContent:"center",alignItems:'center'}}>
       <Text>ItemId:{JSON.stringify(ItemId)}</Text>
       <Text>Message:{JSON.stringify(Message)}</Text>
    <Text> Details</Text>
    <Button title="back Home" onPress={()=>navigation.goBack()}> </Button>
    <Button title="Go to Details....Again" onPress={()=>navigation.push("Details",{
      ItemId:Math.floor(Math.random()*100)
    })}> </Button>
  </View>
  );
  }

export default function App() {
  const Stack = createStackNavigator();
 
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{title:"Overview"}}/>
      <Stack.Screen name="Details" component={DetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});