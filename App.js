import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Text, View,Image , SafeAreaView , StyleSheet} from 'react-native';
import  { useEffect, useState } from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Home} from "./Screens/Home";
import {Login} from "./Screens/Login";
import {Nado} from "./Screens/Nado";

import { BarCodeScanner } from 'expo-barcode-scanner';

function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});









function TitleImage(){
  return(
    <Image style={{width:200,height:50}} source={require('./assets/Stema-in-header.png')}/>
  );
}


function HomeScreen({navigation}){
return(
  

<SafeAreaView style={{flex:1 , justifyContent:"center",alignItems:'center'}}>
  <Text>Home Screen </Text>
  <Button title="Go to Scan" onPress={()=>navigation.navigate("Scan")}> </Button>
</SafeAreaView>

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
    <Button title="Update title" onPress={()=>navigation.setOptions({title:'hello world'})}> </Button>
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
      <Stack.Navigator  initialRouteName="Home" screenOptions={{
         
          headerStyle: {
           
            backgroundColor: 'orange',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
      <Stack.Screen name="Home" component={HomeScreen}  options={{
         headerTitle:props=><TitleImage {...props}/>
        }}/>
      <Stack.Screen name="Details" component={DetailScreen} options={({route})=>({title:route.params.ItemId})}/>
      <Stack.Screen name="Scan" component={Scan}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});*/