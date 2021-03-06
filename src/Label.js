import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native'
//import styled from 'styled-components/native'
import defaultTheme,{BoldTheme} from './Theme'

import PropTypes from 'prop-types';

// const LabelWrapper = styled.View`
//   flex: ${props => props.inlineLabel ? 0.5 : 1};
//   flex-direction: ${props => props.inlineLabel ? 'row' : 'column'};
//   flex-direction: column;
//   justify-content: center;
//   padding-left: ${Platform.OS === 'android' ? 5 : 0};
//   marginTop: ${props => props.inlineLabel ? 0 : 5};
// `
class LabelWrapper extends Component {
  render(){
    return (
      <View style={{
        flex:this.props.inlineLabel ? 0.5 : 1,
        flexDirection:this.props.inlineLabel ? 'row' : 'column',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: Platform.OS === 'android' ? 5 : 0,
        marginTop: this.props.inlineLabel ? 0 : 5
      }}>{ this.props.children }</View>
    )
  }
}

// const LabelText = styled.Text`
//   color: ${props => props.myTheme.Label.color};
//   margin-top: 5;
//   margin-bottom: 5;
//   font-size: ${props => props.myTheme.Label.fontSize};
//   fontWeight: ${props => props.myTheme.Label.fontWeight};
// `
class LabelText extends Component {
  render(){
    return (
      <Text style={{
        color: this.props.myTheme.Label.color,
        marginTop: 5,
        marginBottom: 5,
        fontSize: this.props.myTheme.Label.fontSize,
        fontWeight: this.props.myTheme.Label.fontWeight,
      }}>{ this.props.children }</Text>
    )
  }
}

LabelText.defaultProps = {
  myTheme: defaultTheme,
  componentName: 'Label',
}

const Label = props => {
  const { children, inlineLabel, theme } = props
  let textTheme = theme
  let children2=children
  if (typeof children == 'string'){
    if(children.slice(-1) == '*'){
      children2=children.slice(0,-1)
      textTheme=BoldTheme
    }
  }
  return (
    <LabelWrapper inlineLabel={inlineLabel} myTheme={theme}>
      <LabelText inlineLabel={inlineLabel} theme={textTheme} >{ children2 }</LabelText>
    </LabelWrapper>
  )
}

Label.propTypes = {
  children: PropTypes.string.isRequired
}

export default Label
