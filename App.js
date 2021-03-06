import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log('test');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stema App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color:'green'
  },
  text:{
    color:'green',
    fontStyle:'italic',
    fontWeight:'bold',
    
  }
});

