import React, {Component} from 'react'
import {TextInput, View,Platform,TouchableOpacity,StyleSheet} from 'react-native'
//import styled from 'styled-components/native'
import defaultTheme from './Theme'
import Icon from 'react-native-vector-icons/Ionicons';

import PropTypes from 'prop-types';


/**
 * Calculates the flex value based on the inlineLabel and numberOfLines
 * properties.
 *
 * @param {Object} props
 * @returns {string}
 */
const calculateFlexValue = (props) => {
  let flex = 1

  if (props.multiline && props.numberOfLines > 0) {
    flex = props.numberOfLines + 1
  }

  if (props.inlineLabel) {
    flex = 0.5
  }

  return (flex)
}

/**
 * Decide how the text should be aligned for the input. This decision is based upon
 * the field properties. A multiline input should start top and not centered.
 *
 * @param {Object} props
 * @returns {string}
 */
const determineTextOrientation = (props) => {
  let orientation = 'center'

  if (props.multiline && props.numberOfLines > 1) {
    orientation = 'top'
  }

  return (orientation)
}

// When doing stacked labels we want the input to be greedy
// const InputWrapper = styled.View`
//   flex: ${props => calculateFlexValue(props)};
//   justify-content: center;
// `
class InputWrapper extends Component {
  render(){
    return (
      <View style={{
        flex: calculateFlexValue(this.props),
        justifyContent: 'center'
      }}  {...this.props}>{ this.props.children }</View>
    )
  }
}

InputWrapper.defaultProps = {
  theme: defaultTheme
}

// Subtract the border of the form group to have a full height input
 // 2018-7-14, change padding-top/padding-bottom 4 to 0
// const StyledInput2 = styled.TextInput`
//   flex: 1;
//   color: ${props => props.myTheme.Input.color};
//   font-size: ${props => props.myTheme.BaseInput.fontSize};
//   line-height: ${props => props.myTheme.BaseInput.lineHeight};
//   padding-top: 0;
//   padding-bottom: 0;
//   text-align-vertical: ${props => determineTextOrientation(props)};
// `

class StyledInput2 extends Component {
  render(){
    return (
      <TextInput style={{
        flex: 1,
        color:this.props.myTheme.Input.color,
        fontSize:this.props.myTheme.BaseInput.fontSize,
        lineHeight:this.props.myTheme.BaseInput.lineHeight,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: determineTextOrientation(this.props),
      }}  {...this.props} />
    )
  }
}

StyledInput2.defaultProps = {
  myTheme: defaultTheme
}

  /*
class StyledInput extends Component {
  shouldComponentUpdate (nextProps){
      let ret=Platform.OS !== 'ios'
      || (this.props.value === nextProps.value && (nextProps.defaultValue == undefined || nextProps.defaultValue == '' ))
      || (this.props.defaultValue === nextProps.defaultValue && (nextProps.value == undefined || nextProps.value == '' ));
    //  console.log('ret',ret, 'this.props.value',this.props.value,'nextProps.value',nextProps.value,'nextProps.defaultValue',nextProps.defaultValue,'this.props.defaultValue',this.props.defaultValue)
      return ret
  }
  render() {
      return <StyledInput2 {...this.props} />;
  }
};
  */

class Input extends React.Component {
  constructor(props) {
          super(props);
          this.state = {
            text:this.props.defaultValue?this.props.defaultValue:(this.props.value?this.props.value:'')
          }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.text) {
 //     console.log('componentWillReceiveProps->onChangeText', text);
      this.onChangeText(nextProps.value)
    }
  }
  onChangeText(text) {
      setTimeout(() => {this.setState({ text: text })})
 //     console.log('onChangeText', text);
  }
  onChange(evt){
	//  console.log('onChange',evt.nativeEvent.text);
	  this.setState({ text: evt.nativeEvent.text })
  }
  onEndEditing(evt){
    this.setState({ text: evt.nativeEvent.text })
  //  console.log('onEndEditing',evt.nativeEvent.text);
    this.props.onChangeText( evt.nativeEvent.text )
  }
  onBarCodeRead(data){
    if(data!=''){
      this.setState({ text: data })
      this.props.onChangeText( data )
    }
  }
  render() {
    let {onBarCodeScannerClick} = this.props
    return (
      <InputWrapper
        inlineLabel={this.props.inlineLabel}
        multiline={this.props.multiline}
        numberOfLines={this.props.numberOfLines}>

          <View style={styles.container}>
            {
              Platform.OS === 'android'?(
                <StyledInput2
                  inlineLabel={this.props.inlineLabel}
                  placeholderTextColor={this.props.theme.BaseInput.placeholderColor}
                  underlineColorAndroid='transparent'
                  {...this.props}
                />
              ):(
                <StyledInput2
                  inlineLabel={this.props.inlineLabel}
                  placeholderTextColor={this.props.theme.BaseInput.placeholderColor}
                  underlineColorAndroid='transparent'
                  {...this.props}
                  value={this.state.text}
                  onChangeText={this.onChangeText.bind(this)}
             onChange={this.onChange.bind(this)}
                  onEndEditing={this.onEndEditing.bind(this)  
                  }
                />

              )
            }
            {
              onBarCodeScannerClick&&
              <TouchableOpacity
               onPress={()=>{onBarCodeScannerClick(this.onBarCodeRead.bind(this))}} >
                 <Icon name={ 'ios-qr-scanner' } size={25} color={'blue'} />
              </TouchableOpacity>
            }
          </View>
      </InputWrapper>
    )
  }
}

Input.propTypes = {
  ...TextInput.propTypes,
  inlineLabel: PropTypes.bool.isRequired
}

Input.defaultProps = {
  componentName: 'Input',
  inlineLabel: true,
  theme: defaultTheme
}
const styles =StyleSheet.create({
    container:{flexDirection:'row', flex:0.5, alignItems:'center'}
  })
export default Input
