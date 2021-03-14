import React, {Component} from 'react';
import { StyleSheet,Text,View,Dimensions, Button ,Image,TextInput,TouchableOpacity,FlatList} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from '@react-navigation/routers';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import { Container, Footer, Right,Left,Header,Content,Body, Title,Icon ,H3} from "native-base";



 function getTextStyle(score) {
  if(score=='A'){
    return {color:'green'}
  }else if(score=='B'){
    return{color:'grey'}
  }else if(score=='C'){
    return {color:'yellow'}
  }else if(score=='D'){
    return {color:'orange'}
  }else if(score=='E'){
    return {color:'tomate'}
  }
}



function Additive({name}){

  return (

   <View>
  
      <Text> Name :{name}</Text>
      
 
    </View>
    
  )
}
function Allergy({name}){

  return (

   <View>
  
      <Text> Name :{name}</Text>
      
 
    </View>
    
  )
}
function Nutri({name,scale}){

  return (

   <View>
  
      <Text> Name :{name}</Text>
      <Text>Scale:{scale}</Text>
 
    </View>
    
  )
}








function Item({barecode,name,score,scoreInfo,brand,description}){


  

  return (


    <View>
      <Text>BareCode:{barecode}</Text>
      <Text> Name :{name}</Text>
      <Text> Brand :{brand}</Text>
      <Text> Description:{description}</Text>

      <Text style={getTextStyle(score)}> Score:{score} : {scoreInfo}</Text>
      
    </View>
    
  )
}
export default class ScanCode extends Component{
  constructor(props) {
    super(props);
  this.state = {
    showBarCodeScanner:false,
    CodeData:null,
    Data:[],
    nutri:[],
    allergies:[],
    additives:[]
   
  }
}
 

  barCodeScanned = ({ data ,navigation}) => {
    //Access the Data
       this.setState({
        showBarCodeScanner:false,
         CodeData:data
       });
       axios.get(`http://192.168.1.106:8080/api/displayByBareCode/${data}`).then(
         (response)=>{
           
          this.setState({
            Data:response.data,
           nutri:response.data[0].nutri,
           allergies:response.data[0].allergies,
           additives:response.data[0].additives
          })
        
         }
       ).catch((e)=>{console.log(e)})
       
     

  }

  btnCameraClicked=()=>{
    const { status } = Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      showBarCodeScanner:true,
      CodeData:null,
    });
  }
   componentDidMount() {
    // Ask for camera permission
    this.btnCameraClicked();
  }

  render(){
   
    
      return(
        <>
             {this.state.showBarCodeScanner===true?
            <BarCodeScanner
            onBarCodeScanned = {this.barCodeScanned }
            style = {{
                height:  DEVICE_HEIGHT/1.1,
                width: DEVICE_WIDTH,
            }}
            >
            
            </BarCodeScanner>:
            <View>
   <FlatList
    data={this.state.Data}
   renderItem={({item})=>(
     <Item    barecode={item.barecode}
      name={item.name}
       score={item.score}
      scoreInfo={item.scoreInfo}
        brand={item.brand}
      description={item.description}/>

   )
  
  
  }
   />


   <H3>Nutri -Scales</H3>

   <FlatList
   data={this.state.nutri}
   renderItem={
({item})=>(
<Nutri  name={item.name}  scale={item.scale}/>

)

   }
   />
   <H3>Allergies</H3>
   <FlatList
   data={this.state.allergies}
   renderItem={
({item})=>(
<Allergy name={item.name}  />

)

   }
   />
     <H3>Additives</H3>
   <FlatList
   data={this.state.additives}
   renderItem={
({item})=>(
<Allergy name={item.name}  />

)

   }
   />
   <Button title="back to home" onPress={()=>this.props.navigation.navigate('home')}></Button>
    </View>
          }
           
       </>


      );
    }
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
     
    }
  });
  
  
  
  