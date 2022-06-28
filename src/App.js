import React, {useState, useEffect, } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, 
  Image, TouchableOpacity, } from 'react-native';

import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import lightOn from './assets/icons/eco-light.png';
import lightOff from './assets/icons/eco-light-off.png';

import dioOn from './assets/icons/logo-dio.png';
import dioOff from './assets/icons/logo-dio-white.png';

const App = () => {

  const [toggle, setToggle] = useState(false);
  const[blink, setBlink] = useState(false);

  const hadleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  const hadleChangeBlink = estado => setBlink(estado);

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);


  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    return () => subscription.remove();
  }, [])


  useEffect(() => {

    setToggle(blink);

    console.log('Blink: ' + blink);
    console.log('Toggle: ' + toggle);

    Torch.switchState(blink);

  }, [blink]);


  return (
    <>
      <SafeAreaView style={toggle ? style.containerLight : style.container}>
        
        <StatusBar 
          style={toggle ? style.statusBar : style.statusBarLight }
        />

        <View>

          <TouchableOpacity 
            onPress={ hadleChangeToggle }  
            onLongPress={ () => hadleChangeBlink(true) }      
            onPressOut={ () => hadleChangeBlink(false) }  
          >

            <Image 
              style={toggle ? style.lightingOn : style.lightingOff}
              source={toggle ? lightOn : lightOff}
            />

            <Image 
              style={style.dioLogo}
              source={toggle ? dioOn : dioOff}
            />

          </TouchableOpacity>


        </View>

      </SafeAreaView>

    </>
  );

};

const style = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },

  containerLight:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },

  statusBar:{
    backgroundColor: 'dark',
    barStyle:'light-content',
  },

  statusBarLight:{
    backgroundColor: 'white',
    barStyle:'dark-content',
  },

  lightingOn:{
    resizeMode:'contain',
    alignSelf:'center',
    width:150,
    height:150,
  },

  lightingOff:{
    resizeMode:'contain',
    alignSelf:'center',
    width:150,
    height:150,

    tintColor:'white',
  },

  dioLogo:{
    resizeMode:'contain',
    alignSelf:'center',
    width:250,
    height:250,
  },

});

export default App;
