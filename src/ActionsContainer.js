import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import defaultTheme from './Theme'

const ButtonGroup = styled.View`
  height: ${props => props.myTheme.Button.height};
`

ButtonGroup.defaultProps = {
  myTheme: defaultTheme,
  componentName: 'ButtonGroup'
}

export default ButtonGroup
