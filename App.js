
import React from "react";
import { StyleSheet, View,Text,Image ,TouchableOpacity,TextInput, Alert,FlatList} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Footer, Right,Left,Header,Content,Body, Button,Title,Icon ,H3, Row} from "native-base";
import SideBar from "./Screens/customDrawer";
import ScanCode from "./Screens/Scan";
import ProductsScreen from "./Screens/ProductsScreen";
import HomeScreen from "./Screens/HomeScreen";
import Details from './Screens/Details';

export default function App() {

  const Stack=createStackNavigator();

  createHomeStack=()=>{
    return(
<Stack.Navigator screenOptions={{
    headerShown: false
  }}>
  <Stack.Screen name="home" component={HomeScreen}/>
  <Stack.Screen name="scan" component={ScanCode}/> 
</Stack.Navigator>
    )
  }



const StackProd=createStackNavigator();

createProductStack=()=>{
  return(
  <StackProd.Navigator screenOptions={{ headerShown: false
 }}>
<StackProd.Screen name="Products" component={ProductsScreen}/>
<StackProd.Screen name="Details" component={Details}/>

  </StackProd.Navigator>
  )
}

  const Drawr=createDrawerNavigator();
  const AppDrawer=()=>{
   return( 
   <Drawr.Navigator drawerContent={props=><SideBar {...props}/>} drawerBackgroundColor="orange"  >
      <Drawr.Screen name="Home" children={createHomeStack}
      options={{
       drawerIcon:({color,size})=>(<Icon name="home" style={{fontSize:size,color:color}}/>)
      }}/>
      <Drawr.Screen name="Products" children={createProductStack}
    options={{
      drawerIcon:({color,size})=>(<Icon name="home" style={{fontSize:size,color:color}}/>)
        }}/> 
    </Drawr.Navigator>
   )
  }

  return (
   <NavigationContainer>
     <AppDrawer />
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
  search:{
    padding:20,
   width:250
  },
  scan:{
    width:50,
    height:30,
    resizeMode: 'stretch',
    marginLeft:10,
  },
  title:{
    marginTop:25,
    marginBottom:20,
    fontSize:25,
    color:'grey',
  },
  header:{
   backgroundColor:'rgb(18, 137, 74)'
  },
  
});








