'use strict';

import { StyleSheet, Dimensions ,Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

let {height: originHeight, width: originWidth} = Dimensions.get('window');
const isTablet=DeviceInfo.isTablet()
const width= isTablet?(originHeight>originWidth?originHeight:originWidth):originWidth //可能 Screen 初始化太早，需要重新设定
const height= isTablet?(originHeight>originWidth?originWidth:originHeight):originHeight //可能 Screen 初始化太早，需要重新设定


const isIphoneX=(Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 ||height === 896  ))
const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';
const OPTION_CONTAINER_HEIGHT = height-(Platform.OS === 'ios'?(isIphoneX?170:140):140); //400;
const TOP=50;

console.log('OPTION_CONTAINER_HEIGHT', OPTION_CONTAINER_HEIGHT)

export default StyleSheet.create({

    overlayStyle: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },

    optionContainer: {
        borderRadius:BORDER_RADIUS,
        width:width*0.7,
        height:OPTION_CONTAINER_HEIGHT,
        backgroundColor:'rgba(255,255,255,0.8)',
        left:width*0.15,
        marginTop: TOP,
    //    top: TOP, // (height-OPTION_CONTAINER_HEIGHT)/2
    },

    cancelContainer: {
        left:width*0.1,
        marginTop:10,
    //    top: TOP+10, //(height-OPTION_CONTAINER_HEIGHT)/2 + 10
    },
    cancelComfirmContainer: {
        left:width*0.1,
        marginTop:10,
    //    top:TOP+10, //(height-OPTION_CONTAINER_HEIGHT)/2 + 10,
        width: width * 0.8,
      //  height: 35,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'stretch'
    },

    selectStyle: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        borderRadius: BORDER_RADIUS
    },

    selectTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE
    },

    cancelStyle: {
        borderRadius: BORDER_RADIUS,
        width: width * 0.8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: PADDING
    },
    cancelConfirmButtonStyle: {
        flex:1,
    },
    confirmButtonStyle: {
        borderRadius: BORDER_RADIUS,
        backgroundColor: 'rgba(0,118,255,0.9)',
        padding: PADDING,
        marginLeft:5,
        height:35,
    },
    cancelButtonStyle: {
        borderRadius: BORDER_RADIUS,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: PADDING,
        marginRight:5,
        height:35,
    },

    cancelTextStyle: {
        textAlign: 'center',
        color: '#333',
        fontSize: FONT_SIZE,
    },
    confirmTextStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: FONT_SIZE,
    },

    optionStyle: {
        padding: PADDING,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    optionWrapperStyle: {
        padding: PADDING,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    optionSwitchStyle:{

    },

    optionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE,
        color: HIGHLIGHT_COLOR
    },

    selectedOptionTextStyle: {
      color:'grey'
    },

    sectionStyle: {
        padding: PADDING * 2,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    sectionTextStyle: {
        textAlign: 'center',
        fontSize: FONT_SIZE
    },
    addItemButton: {
      height:34,
      width:34,
      borderRadius:17,
      backgroundColor:'transparent',
      borderColor:'white',
      borderWidth:2,
      alignItems:'center',
      justifyContent:'center',
    },
    addItemButtonWrap:{
        position: 'absolute',
        right: 0,
        top: 32,  //isIphoneX?32:20,
        padding:10
    }
});

export {OPTION_CONTAINER_HEIGHT, TOP}
