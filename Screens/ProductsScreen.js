
import React from 'react';
import axios from 'axios';
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Footer, Right,Left,Header,Content,Body, Button,Title,Icon ,H3, Row} from "native-base";
import { StyleSheet, View,Text,Image ,TouchableOpacity,TextInput, Alert,FlatList} from "react-native";
import Product from "../Components/Products";
import  { DrawerActions }  from '@react-navigation/routers';
export default function ProductsScreen({navigation}){
 
    let [data,setData]=useState([]);
    let [text,setText]=useState('');
    let [filteredArray,setFilteredArray]=useState([]);
    
    useEffect(
      ()=>{
        axios.get(`http://192.168.1.106:8000/api/getAll`).then(
          (response)=>{
          console.log(response.data.data);
          setData(response.data.data);
          setFilteredArray(response.data.data);
          }
        ).catch(
          (error)=>{
            console.log(error);
          }
        )
      }
    ,[]);
    
     function searchProduct(text){
     console.log(text);
    setFilteredArray(data.filter(
       i=>i.name.includes(text)
     )
     )
    
     }
    
    /**end flat list */
      return (
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
      <Left style={{flex:1}}>
            <Button transparent  onPress={()=>navigation.dispatch(DrawerActions.openDrawer)}>
            <Icon name="menu" style={{fontSize:40,color:'white'}}/>
    
            </Button>
       </Left>
        <Body  style={{flex:1 ,alignItems:'center'}}>
          <Image source={ require('../assets/Stema-in-header.png')}/>
          </Body>
        <Right  style={{flex:1}}>
          <Image source={require('../assets/nutriotionst-image.png')}/> 
          </Right>
        </Header>
     </LinearGradient>
      
    <Header style={{backgroundColor:'white'}}>
       <Left>
      <TextInput style = {styles.search}
                   underlineColorAndroid = "red"
                   placeholder="Search ..."
                   onChangeText={text=>{searchProduct(text)}}
                   defaultValue={text}
                 />
             </Left>
             <Body>
             </Body>
             <Right>
             <TouchableOpacity><Icon name="search" style={{margin:5}}/></TouchableOpacity>
            
           <TouchableOpacity onPress={()=>{navigation.navigate('scan')}}><Image source={require('../assets/scan.png')} style={styles.scan} /></TouchableOpacity></Right>
          
             </Header>  
             <Content 
      contentContainerStyle={{
        flex:1,
        alignItems:'center',
        marginTop:25
      }}>
        
        <H3 style={{color:'grey',fontWeight:'bold'}}>Products</H3>
    <FlatList
    data={filteredArray}
    renderItem={
      ({item})=>(
        <Product id={item.id} name={item.name} description={item.description} score={item.scores.name}/>
      )
    }
    />
    
    
    
      </Content>
      <Footer style={{backgroundColor:'rgba(232, 72, 27, 1)'}}></Footer>
       
    </Container>
    
      )
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
  