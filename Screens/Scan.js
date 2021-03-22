import React, {Component} from 'react';
import { StyleSheet,Text,View,Dimensions, Button ,Image,TextInput,TouchableOpacity,FlatList, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Footer, Right,Left,Header,Content,Body, Title,Icon ,H3} from "native-base";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

 function getTextStyle(score) {
  if(score=='A'){
    return {color:'green',fontSize:15}
  }else if(score=='B'){
    return{color:'grey',fontSize:15}
  }else if(score=='C'){
    return {color:'yellow',fontSize:15}
  }else if(score=='D'){
    return {color:'orange',fontSize:15}
  }else if(score=='E'){
    return {color:'tomate',fontSize:15}
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
     <View style={{flex:1 , justifyContent:'center', alignItems:'center'}}><Text> <Image source={require('../assets/banana.jpg')} style={styles.Image} /></Text></View>
      <Text style={getTextStyle(score)}> Score:{score} : {scoreInfo}</Text>
      <Text>BareCode:{barecode}</Text>
      <Text> Name :{name}</Text>
      <Text> Brand :{brand}</Text>
      <Text> Description:{description}</Text>   
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
       axios.get(`http://192.168.1.77:8000/api/displayByBareCode/${data}`).then(
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
            onBarCodeScanned = {this.barCodeScanned}
            style = {{
                height:  DEVICE_HEIGHT/1.1,
                width: DEVICE_WIDTH,
            }}
            >        
            </BarCodeScanner>:
            <View>
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
        <TouchableOpacity transparent  onPress={()=>this.props.navigation.navigate('home')}>
        <Icon name="home" style={{fontSize:40,color:'white'}}/>

        </TouchableOpacity>
   </Left>
    <Body  style={{flex:1.5 ,alignItems:'center'}}><Image source={ require('../assets/Stema-in-header.png')}/></Body>
    <Right  style={{flex:1.5 }}><Image source={require('../assets/nutriotionst-image.png')}/></Right>
  </Header>
</LinearGradient>
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
   <H3 style={styles.titleInfo}>Nutri -Scales</H3>
   <FlatList
   data={this.state.nutri}
   renderItem={
({item})=>(
<Nutri  name={item.name}  scale={item.scale}/>
)}
   />
   <H3 style={styles.titleInfo}>Allergies</H3>
   <FlatList
   data={this.state.allergies}
   renderItem={
({item})=>(
<Allergy name={item.name}  />
)}
   />
    <H3 style={styles.titleInfo}>Additives</H3>
   <FlatList
   data={this.state.additives}
   renderItem={
({item})=>(
<Allergy name={item.name}  />
)}
   />
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
     
    },
    Image:{
    width:100,
    height:150,
   
   
    },
    titleInfo:{
      color:'tomato',
      fontStyle:'normal'
    }
  });
  
  
  
  