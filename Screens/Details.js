import axios from 'axios';
import { View, Text,  TextInput,  FlatList, ListItem, H3, Container, Header ,Left,Right,Body,Icon, Content, Footer} from 'native-base';
import {  Alert,TouchableOpacity ,StyleSheet,Image , ScrollView} from "react-native";
import React from 'react';
import { useEffect } from 'react';
import { useState } from "react/cjs/react.development";
import { Button } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { Link } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import  { DrawerActions }  from '@react-navigation/routers';
// import Item from "../Components/ItemDetails";

export default function  Details({navigation,route}){
 const {ID}=route.params;
 const[data,setData]=useState([]);
 const [nutri,setNutri]=useState([]);
 const [allergy,setAllergy]=useState([]);
  const [additive, setAdditive] = useState([]);
  console.log(ID);
useEffect(
  ()=>{
    axios.get(`http://192.168.1.106:8000/api/display/${ID}`).then(
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

function ProductStyle(score){
  if(score==='A'){
    return {borderColor:'#006400' , borderStyle:'solid' , borderWidth:5 , width:300 , padding:10}
  }else if(score=='B'){
    return {borderColor:'#9ACD32' , borderStyle:'solid' , borderWidth:5 , width:300 , padding:10}
  }else if(score=='C'){
    return {borderColor:'#CCCC00' , borderStyle:'solid' , borderWidth:5 , width:300 , padding:10}
  }else if(score=='D'){
    return {borderColor:'orange' , borderStyle:'solid' , borderWidth:5 , width:300 , padding:10}
  }else if(score=='E'){
    return {borderColor:'red' , borderStyle:'solid' , borderWidth:5 , width:300 , padding:10}
  }
}
function NameStyle(score){
  if(score==='A'){
    return {textAlign:'center',fontWeight:'bold', color:'#006400'}
  }else if(score=='B'){
    return {textAlign:'center',fontWeight:'bold', color:'#9ACD32'}
  }else if(score=='C'){
    return {textAlign:'center',fontWeight:'bold', color:'#CCCC00'}
  }else if(score=='D'){
    return {textAlign:'center',fontWeight:'bold', color:'orange'}
  }else if(score=='E'){
    return {textAlign:'center',fontWeight:'bold', color:'red'}
  }
}


   


return(
  // <Text>{ID}</Text>
 


<Container>
<LinearGradient
    colors={['rgba(18, 137, 74, 1)', 'rgba(252, 220, 89, 1)', 'rgba(251, 180, 66, 1)' , 'rgba(232, 72, 27, 1)']}
    start={{x:0.0 , y:0.0}}
    end={{x:1.0,y:0.0}}
    useAngle={true}
    angle={90}
    angleCenter={{x:0.5,y:0.5}}
    style={styles.header}
    >
      <Header style={{backgroundColor:'transparent'}}>
      <Left style={{flex:1.5}}>
          <Button transparent  onPress={()=>navigation.dispatch(DrawerActions.openDrawer)}>
          <Icon name="menu" style={{fontSize:40,color:'white'}}/>
  
          </Button>
     </Left>
      <Body  style={{flex:1.5 ,alignItems:'center'}}><Image source={ require('../assets/Stema-in-header.png')}/></Body>
      <Right  style={{flex:1.5 }}><Image source={require('../assets/nutriotionst-image.png')}/></Right>
    </Header>
  </LinearGradient>

<Content>

  <ScrollView>


  {data.map(
    (item)=>(
      <ListItem>
        <View style={{flex:0, justifyContent:'center' , alignItems:'center'}}>
       <View style={ProductStyle(item.score)}>
            <View ><Text style={NameStyle(item.score)}>{item.name}</Text>
              
         
            
            </View>
            <View><Text style={NameStyle(item.score)}>Price : 4500 L.L</Text></View>
           
            
          </View>
        
  

        </View>
      
  </ListItem>    
    )
    )}

   <View style={{justifyContent: 'center', alignItems: 'center'}}><Image source={require('../assets/tuna.jpeg')} style={styles.Image} /></View>
    
     <H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>NutriScore Classification</H3>
  {data.map(
    (item)=>(
      <ListItem>
      
        <View><Text style={{fontWeight:'bold'}}> {item.score} - </Text></View>
         <View><Text style={{fontWeight:'bold'}}>{item.scoreInfo}</Text></View>
  
  
  </ListItem>    
    )
  )}

  <H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>Nutritional Scale</H3>
  {nutri.map(
    (item)=>(
  <ListItem>
        <View ><Text style={{ fontWeight:'bold'}}>{item.name}:</Text></View>
        <View><Text style={{fontStyle:'italic' , fontSize:12 , color:'grey'}}>  {item.scale}</Text></View>
  </ListItem>    
    )
  )}

  <H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>Allergic Contents</H3>
  {allergy.map(
    (item) => (
      
  <ListItem >
        <View ><TouchableOpacity onPress={() => {
           Alert.alert(
            "Description of "+item.name,
          item.desciption,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
        }}
          
          
          
      
        
        
        ><Text style={{ fontWeight: 'bold' }}>{item.name} :</Text></TouchableOpacity></View>
        <View><Text style={{fontStyle:'italic' , fontSize:12 , color:'grey'}} >   {item.desciption}</Text></View>
  </ListItem>
 
    )
  )}
<H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>Additives</H3>
{additive.map(
    (item)=>(
  <ListItem>
   <View><TouchableOpacity onPress={() => {
           Alert.alert(
            "Description of "+item.name,
          item.desciption,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
      }}><Text style={{ fontWeight: 'bold' }}>{item.name} :</Text></TouchableOpacity></View>
       <View><Text style={{fontStyle:'italic' , fontSize:12 , color:'grey'}} >   {item.desciption}</Text></View>
  </ListItem>    
    )
  )}
      </ScrollView>

    </Content>
    <TouchableOpacity onPress={()=>navigation.navigate('Products')}><Text style={{fontStyle:'italic', color:'red'}}> {'<<<'} back to products</Text></TouchableOpacity>
    <Footer style={{backgroundColor:'rgba(232, 72, 27, 1)'}}></Footer>
</Container>



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
   backgroundColor:'rgb(18, 137, 74)',
   padding:5
   
  },

  titleInfo:{
    color:'tomato',
    fontStyle:'normal'
  }
});
