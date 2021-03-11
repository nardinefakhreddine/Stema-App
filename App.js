import React, {Component} from 'react';
import { StyleSheet,Text,View,Dimensions, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class App extends Component{

  state = {
    showBarCodeScanner:false,
    CodeData:null,
   
  }
 


  barCodeScanned = ({ data }) => {
    //Access the Data
       this.setState({
        showBarCodeScanner:false,
         CodeData:data
       });
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
        <View style={styles.container}>
           <Button title="Bar Code Scanner" onPress={this.btnCameraClicked}/>

           <View>
             {this.state.showBarCodeScanner===true?
            <BarCodeScanner
            onBarCodeScanned = {this.barCodeScanned }
            style = {{
                height:  DEVICE_HEIGHT/1.1,
                width: DEVICE_WIDTH,
            }}
            >
            
            </BarCodeScanner>:
             <Text>{this.state.CodeData}</Text>
  
          }
           </View>



        </View> 


      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:Constants.statusBarHeight,

  },
});