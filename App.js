
import React from "react";
import { StyleSheet, View,Text,Image ,TouchableOpacity,TextInput} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Drawer } from "react-native-paper";
import { Container, Footer, Right,Left,Header,Content,Body, Button,Title,Icon ,H3} from "native-base";
import { Home } from "./Screens/Home";
import SideBar from "./Screens/customDrawer";
import { DrawerActions } from '@react-navigation/routers';
import { LinearGradient } from 'expo-linear-gradient';
function HomeScreen({navigation}){
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
    <Left style={{flex:1.5}}>
        <Button transparent  onPress={()=>navigation.dispatch(DrawerActions.openDrawer)}>
        <Icon name="menu" style={{fontSize:40,color:'white'}}/>

        </Button>
   </Left>
    <Body  style={{flex:1.5 ,alignItems:'center'}}><Image source={ require('./assets/Stema-in-header.png')}/></Body>
    <Right  style={{flex:1.5 }}><Image source={require('./assets/nutriotionst-image.png')}/></Right>
  </Header>
</LinearGradient>
  <Content>
  
 <Header style={{backgroundColor:'white'}}>
   <Left>
  <TextInput style = {styles.search}
               underlineColorAndroid = "red"
               placeholder="Search..."
              
             />
         </Left>
         <Body>
         </Body>
         <Right>
         <TouchableOpacity><Icon name="search"/></TouchableOpacity>
         <TouchableOpacity onPress={()=>{navigation.navigate('scan')}}><Image source={require('./assets/scan.png')}  style={styles.scan}/></TouchableOpacity></Right>
         </Header>  
         <Content>
           <Body>
             <H3 style={styles.title}>Nutrition Scores</H3>
             <Image source={require('./assets/Nutri-A.png')}/>
             <Image source={require('./assets/scores.png')}/>
           </Body>
           </Content>   
  </Content>

  <Footer style={{backgroundColor:'#FF4500'}}></Footer>

</Container>

  )
}
function ProductsScreen({navigation}){
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
    <Body  style={{flex:1 ,alignItems:'center'}}><Image source={ require('./assets/Stema-in-header.png')}/></Body>
    <Right  style={{flex:1}}></Right>
    </Header>
 </LinearGradient>
  <Content 
  contentContainerStyle={{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }}>
<Text>Products</Text>
  </Content>
  <Footer style={{backgroundColor:'#FF4500'}}></Footer>
</Container>

  )
}




export default function App() {

  const Drawr=createDrawerNavigator();

  const AppDrawer=()=>{
   return( <Drawr.Navigator drawerContent={props=><SideBar {...props}/>}>
      <Drawr.Screen name="Home" component={HomeScreen} 
      options={{
       drawerIcon:({color,size})=>(<Icon name="home" style={{fontSize:size,color:color}}/>)
      }}/>
      <Drawr.Screen name="Products" component={ProductsScreen}
      options={{
        drawerIcon:({color,size})=>(<Icon name="home" style={{fontSize:size,color:color}}/>)
       }}/>
    </Drawr.Navigator>
   )
  }

  return (
 
   <NavigationContainer>
     <AppDrawer/>
   </NavigationContainer>
  
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
   backgroundColor:'rgb(18, 137, 74)'
  }
});















