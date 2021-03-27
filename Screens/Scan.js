import React, {Component} from 'react';
import { StyleSheet,Text,View,Dimensions, Button ,Image,TextInput,TouchableOpacity,FlatList, Alert,ScrollView} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Footer, Right, Left, Header, Content, Body, Title, Icon, H3 } from "native-base";
import  { DrawerActions }  from '@react-navigation/routers';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

 function getTextStyle(score) {
  if(score=='A'){
    return {color:'#006400',fontSize:15}
  }else if(score=='B'){
    return{color:'#9ACD32',fontSize:15}
  }else if(score=='C'){
    return {color:'#CCCC00',fontSize:15}
  }else if(score=='D'){
    return {color:'orange',fontSize:15}
  }else if(score=='E'){
    return {color:'red',fontSize:15}
  }
 }
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



function Additive({name,description}){
  return (
    <View style={{padding:5}}>
    <Text><Text style={{ fontWeight: 'bold' }}> {name} : </Text><Text style={{fontStyle:'italic',color:'grey'}}>{description}</Text></Text>
     
    </View>
  )
}
function Allergy({name,description}){
  return (
    <View style={{padding:5}}>
    <Text><Text style={{ fontWeight: 'bold' }}> {name} : </Text><Text style={{fontStyle:'italic',color:'grey'}}>{description}</Text></Text>
     
    </View>
  )
}
function Nutri({name,scale}){
  return (
   <View style={{padding:5}}>
    <Text><Text style={{ fontWeight: 'bold' }}> {name} : </Text><Text style={{fontStyle:'italic',color:'grey'}}>{scale}</Text></Text>
     
    </View>
  )
}



function Item({barecode,name,score,scoreInfo,brand,description}){
  return (
    <View style={{ marginTop: 10 }}>
    
    <View style={{flex:0, justifyContent:'center' , alignItems:'center'}}>
        <View style={ProductStyle(score)}>
            <View ><Text style={NameStyle(score)}>{name}</Text></View>
            <View ><Text style={NameStyle(score)}>Price: 4500L.L</Text></View>
          </View>
          <Image source={require('../assets/tuna.jpeg')} style={{marginTop:10,marginBottom:10}} />
      </View>
      </View>
       
  )
}
function Score({ score, scoreInfo }) {
  return (
    <View  style={{ marginBottom:10 ,padding:5 }}>
  <View ><Text style={{ fontWeight: 'bold' }}>{score} - {scoreInfo}</Text></View>
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
       axios.get(`http://192.168.1.106:8000/api/displayByBareCode/${data}`).then(
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
    <TouchableOpacity transparent  onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer)}>
          <Icon name="menu" style={{fontSize:40,color:'white'}}/>
  
          </TouchableOpacity>
   </Left>
    <Body  style={{flex:1.5 ,alignItems:'center'}}><Image source={ require('../assets/Stema-in-header.png')}/></Body>
    <Right  style={{flex:1.5 }}><Image source={require('../assets/nutriotionst-image.png')}/></Right>
  </Header>
              </LinearGradient>
         

<Content>
     <ScrollView>
   <FlatList
    data={this.state.Data}
   renderItem={({item})=>(
     <Item    barecode={item.barecode}
      name={item.name}
       score={item.score}
        brand={item.brand}
      description={item.description}/>
   )
  }
                  />
                  
<H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>NutriScore Classification</H3>

<FlatList
    data={this.state.Data}
   renderItem={({item})=>(
     <Score    
       score={item.score}
      scoreInfo={item.scoreInfo}
       />
   )
  }
                  />
                
     <H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>Nutritional Scale</H3>
   <FlatList
   data={this.state.nutri}
   renderItem={
({item})=>(
<Nutri  name={item.name}  scale={item.scale}/>
)}
                />
                

   <H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>Allergic Contents</H3>
   <FlatList
   data={this.state.allergies}
   renderItem={
({item})=>(
<Allergy name={item.name} description={item.desciption} />
)}
                />
                

    <H3 style={{textAlign:'center', color:'tomato' , fontWeight:'bold'}}>Additives</H3>
   <FlatList
   data={this.state.additives}
   renderItem={
({item})=>(
<Additive name={item.name} description={item.desciption}  />
)}
                />
                </ScrollView>
                </Content>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('home')}><Text style={{fontStyle:'italic', color:'red'}}> {'<<<'} back to home</Text></TouchableOpacity>
              <Footer style={{backgroundColor:'rgba(232, 72, 27, 1)'}}></Footer>     
             
              </Container>    
              
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
    width:300,
    height:150,
   
   
    },
    titleInfo:{
      color:'tomato',
      fontStyle:'normal'
    }
  });
  
  
  
  