/**
 * Ionicons icon set component.
 * Usage: <Ionicons name="icon-name" size={20} color="#4F8EF7" />
 */

//import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Icon from 'react-native-ionicons'
 

export default ({name,size,color, style})=>{
  /*
  switch(name) {
    case 'ios-arrow-forward': {
      name='arrow-forward-outline';
       break;
    }
    case 'ios-search': {
      name='search-outline';
       break;
    }
    case 'ios-menu': {
      name='menu-outline';
       break;
    }
    case 'md-close': {
      name='close-outline';
       break;
    }
    case 'ios-qr-scanner': {
      name='scan-outline';
       break;
    }
    case 'ios-mail': {
      name='ios-mail';
       break;
    }
    case 'ios-shirt': {
      name='shirt';
       break;
    }
    default: {
      console.log('########## icon name', name);
       break;
    }
 }*/
  return <Icon name={ name } size={size} color={color} style={style}/>;
};

