import React from 'react'
import {TextInput, View,Platform,TouchableOpacity,StyleSheet} from 'react-native'
import styled from 'styled-components/native'
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
const InputWrapper = styled.View`
  flex: ${props => calculateFlexValue(props)};
  justify-content: center;
`

InputWrapper.defaultProps = {
  theme: defaultTheme
}

// Subtract the border of the form group to have a full height input
const StyledInput = styled.TextInput`
  flex: 1;
  color: ${props => props.theme.Input.color};
  font-size: ${props => props.theme.BaseInput.fontSize};
  line-height: ${props => props.theme.BaseInput.lineHeight};
  padding-top: 4;
  padding-bottom: 4;
  text-align-vertical: ${props => determineTextOrientation(props)};
`

StyledInput.defaultProps = {
  theme: defaultTheme
}

class Input extends React.Component {
  constructor(props) {
          super(props);
          this.state = {
            text:this.props.defaultValue?this.props.defaultValue:(this.props.value?this.props.value:'')
          }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.text) {
      this.onChangeText(nextProps.value)
    }
  }
  onChangeText(text) {
      setTimeout(() => {this.setState({ text: text })})
      //console.log(text);
  }
  onChange(evt){
    this.setState({ text: evt.nativeEvent.text })
    //console.log('onChange',evt.nativeEvent.text);
  }
  onEndEditing(evt){
    this.setState({ text: evt.nativeEvent.text })
    //console.log('onEndEditing',evt.nativeEvent.text);
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
                <StyledInput
                  inlineLabel={this.props.inlineLabel}
                  placeholderTextColor={this.props.theme.BaseInput.placeholderColor}
                  underlineColorAndroid='transparent'
                  {...this.props}
                />
              ):(
                <StyledInput
                  inlineLabel={this.props.inlineLabel}
                  placeholderTextColor={this.props.theme.BaseInput.placeholderColor}
                  underlineColorAndroid='transparent'
                  {...this.props}
                  value={this.state.text}
                  onChangeText={this.onChangeText.bind(this)}
                  onChange={this.onChange.bind(this)}
                  onEndEditing={this.onEndEditing.bind(this)  }
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
