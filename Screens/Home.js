import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
 export const Home=({navigation})=>{
    
    return (
      <View >
        <Text >Home Page</Text>
       <Button title="scan" onPress={()=>navigation.navigate("Scan")}/>
      </View>
    );
  }
 

  
  //https://expo.io/@/projects/stema-app.