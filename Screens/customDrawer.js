import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import { Button, Container, Content, Footer, Header, Right,Icon, ListItem, Left, Thumbnail, Body,Text,H3,List } from 'native-base';
import { DrawerActions } from '@react-navigation/routers';
import { Switch } from 'react-native-gesture-handler';
function SideBar({ progress, ...props}){
    const translateX= Animated.interpolate(progress,{
        inputRange:[0,1],
        outputRange:[-100,0],
    }
    );
return(
   
    <Container style={{backgroundColor:'transparent'}}>
<Header style={{backgroundColor:'whitesmoke',borderBottomWidth:0}}>
    <Right>
        <Button transparent  onPress={()=>props.navigation.dispatch(DrawerActions.closeDrawer)}>
            <Icon name="menu" style={{fontSize:40,color:'blue'}}/>

        </Button>
    </Right>
    
</Header>
<Content contentContainerStyle={{flex:1}}>
    <ListItem thumbnail>
        <Left>
        <Thumbnail  source={require('../assets/logo-stema.png')} />
        </Left>
        <Body>
       <H3>For Good Health</H3>
        <Text note>Nutrition</Text>
    </Body>
    </ListItem>
  
<DrawerContentScrollView {...props}>
        <Animated.View  style={{ transform:[{translateX}] }}>

       
    <DrawerItemList {...props}/>
    
    <DrawerItem activeBackgroundColor="orange"
    label="Rate us"
    icon={
        ({color,size})=>(<Icon name="star" style={{fontSize:size,color:color}}/>)
    }
onPress={()=>props.navigation.navigate('Home')}

    />  

  
    </Animated.View>
</DrawerContentScrollView>

<List>
    <ListItem>
        <Body>
            <Text>Dark Mode</Text>
           
        </Body>
        <Right><Switch value={true}></Switch></Right>
    </ListItem>
</List>
    </Content>

<Footer style={{backgroundColor:'whitesmoke'}}/>
    


  
</Container>

)

}
export default SideBar;