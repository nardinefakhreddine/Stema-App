
import React from "react";
import { StyleSheet, View,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Drawer } from "react-native-paper";
import { Container, Footer, Right,Left,Header,Content,Body, Button,Title,Icon } from "native-base";
import { Home } from "./Screens/Home";
import SideBar from "./Screens/customDrawer";
import { DrawerActions } from '@react-navigation/routers';
function HomeScreen({navigation}){
  return (
<Container>
  <Header>
    <Left style={{flex:1}}>
        <Button transparent  onPress={()=>navigation.dispatch(DrawerActions.openDrawer)}>
        <Icon name="menu" style={{fontSize:40,color:'white'}}/>

        </Button>
   </Left>
    <Body  style={{flex:1 ,alignItems:'center'}}><Title>Stema</Title></Body>
    <Right  style={{flex:1}}></Right>
  </Header>
  <Content
  contentContainerStyle={{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }}
  >
<Text>Scores</Text>
  </Content>
  <Footer></Footer>
</Container>

  )
}
function ProductsScreen(){
  return (
<Container>
  <Header >
    <Left style={{flex:0.1}}></Left>
    <Body  style={{flex:1 ,alignItems:'center'}}><Title>Profile</Title></Body>
    <Right  style={{flex:0.1}}></Right>
  </Header>
  <Content 
  contentContainerStyle={{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }}>
<Text>Products</Text>
  </Content>
  <Footer></Footer>
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

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/














