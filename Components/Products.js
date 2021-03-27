import React from 'react';
import { H3,H1,H2 } from 'native-base';
import { View,Text,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
/**useNavigation is a hook which gives access to navigation object.
 *  It's useful when you cannot pass the navigation prop into the component directly, 
 * or don't want to pass it in case of a deeply nested child.
useNavigation() returns the navigation prop of the screen it's inside. */
   export default  function Product({id,name,description,score}){
    const navigation = useNavigation();
    function getScoreStyle({score}){
        if(score==='A'){
          return {flexDirection:"row", backgroundColor:'white', padding:10,borderStyle:'solid',borderWidth:5 ,borderColor:'#006400' , margin:10 , width:300}
        }else if(score=='B'){
          return{flexDirection:"row", backgroundColor:'white', padding:10,borderStyle:'solid',borderWidth:5 ,borderColor:'#9ACD32' , margin:10 , width:300}
        }else if(score=='C'){
          return {flexDirection:"row", backgroundColor:'white', padding:10,borderStyle:'solid',borderWidth:5 ,borderColor:'#CCCC00' , margin:10 , width:300}
        }else if(score=='D'){
          return {flexDirection:"row", backgroundColor:'white', padding:10,borderStyle:'solid',borderWidth:5 ,borderColor:'orange' , margin:10 , width:300}
        }else if(score=='E'){
          return {flexDirection:"row", backgroundColor:'white', padding:10,borderStyle:'solid',borderWidth:5 ,borderColor:'red' , margin:10 , width:300}
        }
      }
      function ScoreStyle({score}){
        if(score==='A'){
          return {flex:1,alignItems:'flex-start',color:'#006400',fontWeight:'bold'}
        }else if(score=='B'){
          return{flex:1,alignItems:'flex-start',color:'#9ACD32',fontWeight:'bold'}
        }else if(score=='C'){
          return {flex:1,alignItems:'flex-start',color:'#CCCC00',fontWeight:'bold'}
        }else if(score=='D'){
          return {flex:1,alignItems:'flex-start',color:'orange',fontWeight:'bold'}
        }else if(score=='E'){
          return {flex:1,alignItems:'flex-start',color:'red',fontWeight:'bold'}
        }
      }




  return(
      
    <TouchableOpacity onPress={()=>navigation.navigate('Details',{ID:id})}>
    <View  style={getScoreStyle({score})}>
       <Text style={{flex:1,alignItems:'flex-start',color:'#006400',fontWeight:'bold'}} ><H1 style={ScoreStyle({score})}>{score} </H1></Text>
     <Text style={{ flex:1,alignItems:'center'}}>{name} </Text>
     <Text style={{ flex:1,alignItems:'flex-end'}}>{description}</Text>
      
    </View>
    </TouchableOpacity>
  )
  }