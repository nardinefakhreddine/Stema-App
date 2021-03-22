import axios from 'axios';
import { StyleSheet, View,Text,Image ,TouchableOpacity,TextInput, Alert,FlatList, ListItem,H3} from 'native-base';
import React from 'react';
import { useEffect } from 'react';
import { useState } from "react/cjs/react.development";
import { Button } from 'react-native-paper';
// import Item from "../Components/ItemDetails";

export default function  Details({navigation,route}){
 const {ID}=route.params;
 const[data,setData]=useState([]);
 const [nutri,setNutri]=useState([]);
 const [allergy,setAllergy]=useState([]);
 const [additive,setAdditive]=useState([]);
useEffect(
  ()=>{
    axios.get(`http://192.168.1.77:8000/api/display/${ID}`).then(
      (response)=>{
       console.log(response.data);
       setData(response.data);
       setNutri(response.data[0].nutri);
       setAllergy(response.data[0].allergies);
       setAdditive(response.data[0].additives);
       
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    )
  }
,[])





return(
  // <Text>{ID}</Text>
 

<View>
  {data.map(
    (item)=>(
  <ListItem>
   <View><Text>Name:{item.name}</Text></View>
   <View><Text>Description:{item.description}</Text></View>
   <View><Text>Score:{item.score}</Text></View>
   <View><Text>InfoScore:{item.scoreInfo}</Text></View>
   <View><Text>InfoScore:{item.scoreInfo}</Text></View>
  </ListItem>    
    )
  )}

  <H3>Nutri Facts</H3>
  {nutri.map(
    (item)=>(
  <ListItem>
   <View><Text>Name:{item.name}</Text></View>
  </ListItem>    
    )
  )}

  <H3>Allergies</H3>
  {allergy.map(
    (item)=>(
  <ListItem>
   <View><Text>Name:{item.name}</Text></View>
  </ListItem>    
    )
  )}
<H3>Additives</H3>
{additive.map(
    (item)=>(
  <ListItem>
   <View><Text>Name:{item.name}</Text></View>
  </ListItem>    
    )
  )}
</View>




);
}