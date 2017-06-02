import {
  Platform,
} from 'react-native'
const Theme = {
  Button: {
    backgroundColor: '#4286dd',
    color: '#fff',
    fontSize: 14, //12
    fontWeight: 700,
    height: 45
  },
  ErrorMessage: {
    color: 'red',
    fontSize: 11, //10
    marginBottom: 15,
    textAlign: 'right'
  },
  TipsMessage: {
    color: '#338fce',
    fontSize: 11,
    marginTop: 15,
    textAlign: 'left',
    marginBottom: 0,
  },
  Fieldset: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    labelColor: '#909090',
    labelSize: 9,
    labelWeight: 700,
    labelHeight: 25,
    padding: '12 8'
  },
  FormGroup: {
    borderColor: '#ebebeb',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    errorBorderColor: 'red',
    height: Platform.OS === 'ios'?35:37,//35
    marginBottom: 10,
    padding: '0 10'
  },
  BaseInput: {
    placeholderColor: '#c9c9c9',
    fontSize: 12,
    lineHeight: 18
  },
  Input: {
    color: '#313131',
  },
  Label: {
    color: '#7d7f84', //'#bfc2c9',
    fontSize: 12,
    stackedHeight: 40,
    fontWeight: 'normal',
  },
  Select: {

  }
}

const BoldTheme = {
  Label: {
    color: '#333333', //'#bfc2c9',
    fontSize: 12,
    fontWeight: 'bold',
  },
}

export default Theme
export {BoldTheme}
