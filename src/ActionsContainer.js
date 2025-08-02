import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import defaultTheme from './Theme'
/*
const ButtonGroup = styled.View`
  height: ${props => props.myTheme.Button.height};
`
*/
class ButtonGroup extends Component {
  render(){
    let props=this.props;
    return (
      <View style={{
        height:  props.myTheme.Button.height
      }}  {...this.props}>{ this.props.children }</View>
    )
  }
}
ButtonGroup.defaultProps = {
  myTheme: defaultTheme,
  componentName: 'ButtonGroup'
}

export default ButtonGroup
